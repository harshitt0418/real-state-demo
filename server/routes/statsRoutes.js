import express from 'express';
import { sampleProperties, companyMetrics, sampleInquiries } from '../data/sampleData.js';
import Property from '../models/Property.js';
import Inquiry from '../models/Inquiry.js';
import { getDBStatus } from '../config/db.js';

const router = express.Router();

/**
 * GET /api/stats
 * Aggregate dashboard statistics and health status
 */
router.get('/', async (req, res) => {
  try {
    const dbStatus = getDBStatus();

    let propertiesCount = sampleProperties.length;
    let inquiriesCount = sampleInquiries.length;
    let citiesCount = 3;

    if (dbStatus.connected) {
      propertiesCount = await Property.countDocuments();
      inquiriesCount = await Inquiry.countDocuments();
    }

    return res.json({
      success: true,
      system: {
        serverTime: new Date().toISOString(),
        database: dbStatus,
        version: '1.0.0-mern'
      },
      portfolio: {
        totalListings: propertiesCount,
        totalInquiriesRegistered: inquiriesCount,
        representedDevelopersCount: companyMetrics.tier1DevelopersRepresented,
        portfolioValue: companyMetrics.curatedPortfolioValue,
        averageGrossYield: companyMetrics.averageYieldUnderAdvisory,
        corridors: companyMetrics.cities
      }
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve stats',
      error: error.message
    });
  }
});

export default router;
