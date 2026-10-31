import express from 'express';
import Property from '../models/Property.js';
import { sampleProperties } from '../data/sampleData.js';
import { getDBStatus } from '../config/db.js';

const router = express.Router();

// In-memory working copy for demo mode (supports dynamic additions)
let inMemoryProperties = [...sampleProperties];

/**
 * Filter and sort an array of properties in-memory
 */
function filterInMemory(props, query) {
  let result = [...props];

  const { city, type, category, minPrice, maxPrice, beds, featured, search, sort } = query;

  if (city && city !== 'all') {
    result = result.filter(p => p.city.toLowerCase() === city.toLowerCase());
  }

  if (type && type !== 'all') {
    result = result.filter(p => p.type.toLowerCase() === type.toLowerCase());
  }

  if (category && category !== 'all') {
    result = result.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());
  }

  if (minPrice) {
    const min = Number(minPrice);
    if (!isNaN(min)) {
      result = result.filter(p => p.price >= min);
    }
  }

  if (maxPrice) {
    const max = Number(maxPrice);
    if (!isNaN(max)) {
      result = result.filter(p => p.price <= max);
    }
  }

  if (beds && beds !== 'all') {
    const b = Number(beds);
    if (!isNaN(b)) {
      result = result.filter(p => p.beds >= b);
    }
  }

  if (featured === 'true') {
    result = result.filter(p => p.featured === true);
  }

  if (search) {
    const term = search.toLowerCase().trim();
    result = result.filter(p => 
      p.title.toLowerCase().includes(term) ||
      p.district.toLowerCase().includes(term) ||
      p.city.toLowerCase().includes(term) ||
      p.blurb.toLowerCase().includes(term) ||
      p.type.toLowerCase().includes(term)
    );
  }

  // Sorting
  if (sort === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === 'area-desc') {
    result.sort((a, b) => b.area - a.area);
  } else {
    // Default: featured first, then price descending
    result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return result;
}

/**
 * GET /api/properties
 * Returns filtered list of properties with meta stats
 */
router.get('/', async (req, res) => {
  try {
    const dbStatus = getDBStatus();

    if (dbStatus.connected) {
      // Build MongoDB query
      const query = {};
      const { city, type, category, minPrice, maxPrice, beds, featured, search, sort } = req.query;

      if (city && city !== 'all') {
        query.city = new RegExp(`^${city}$`, 'i');
      }
      if (type && type !== 'all') {
        query.type = new RegExp(`^${type}$`, 'i');
      }
      if (category && category !== 'all') {
        query.category = new RegExp(`^${category}$`, 'i');
      }
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }
      if (beds && beds !== 'all') {
        query.beds = { $gte: Number(beds) };
      }
      if (featured === 'true') {
        query.featured = true;
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { district: { $regex: search, $options: 'i' } },
          { city: { $regex: search, $options: 'i' } },
          { blurb: { $regex: search, $options: 'i' } }
        ];
      }

      let sortOptions = { featured: -1, price: -1 };
      if (sort === 'price-asc') sortOptions = { price: 1 };
      if (sort === 'price-desc') sortOptions = { price: -1 };
      if (sort === 'area-desc') sortOptions = { area: -1 };

      const properties = await Property.find(query).sort(sortOptions);

      return res.json({
        success: true,
        count: properties.length,
        dataSource: 'MongoDB Live',
        data: properties
      });
    }

    // Fallback: In-memory store
    const filtered = filterInMemory(inMemoryProperties, req.query);
    return res.json({
      success: true,
      count: filtered.length,
      dataSource: 'In-Memory Fallback (Demo Mode)',
      notice: 'Demo mode active. Data served from curated realistic dataset.',
      data: filtered
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve properties',
      error: error.message
    });
  }
});

/**
 * GET /api/properties/:id
 * Retrieve a single property by its ID/slug
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();

    if (dbStatus.connected) {
      let property = await Property.findOne({ id });
      if (!property && id.match(/^[0-9a-fA-F]{24}$/)) {
        property = await Property.findById(id);
      }

      if (!property) {
        return res.status(404).json({
          success: false,
          message: `Property '${id}' not found`
        });
      }

      return res.json({
        success: true,
        dataSource: 'MongoDB Live',
        data: property
      });
    }

    // In-memory fallback
    const property = inMemoryProperties.find(p => p.id === id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: `Property '${id}' not found in sample catalogue`
      });
    }

    return res.json({
      success: true,
      dataSource: 'In-Memory Fallback (Demo Mode)',
      data: property
    });
  } catch (error) {
    console.error(`Error retrieving property ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving property',
      error: error.message
    });
  }
});

/**
 * POST /api/properties
 * Add a new property (Admin / Seeding endpoint)
 */
router.post('/', async (req, res) => {
  try {
    const propertyData = req.body;
    if (!propertyData.title || !propertyData.price || !propertyData.city) {
      return res.status(400).json({
        success: false,
        message: 'Missing required property fields (title, price, city)'
      });
    }

    if (!propertyData.id) {
      propertyData.id = `${propertyData.city.toLowerCase()}-${propertyData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    }

    const dbStatus = getDBStatus();
    if (dbStatus.connected) {
      const created = await Property.create(propertyData);
      return res.status(201).json({
        success: true,
        dataSource: 'MongoDB Live',
        data: created
      });
    }

    // In-memory fallback
    inMemoryProperties.unshift(propertyData);
    return res.status(201).json({
      success: true,
      dataSource: 'In-Memory Fallback (Demo Mode)',
      data: propertyData
    });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create property',
      error: error.message
    });
  }
});

export default router;
