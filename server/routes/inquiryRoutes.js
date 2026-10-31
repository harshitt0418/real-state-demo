import express from 'express';
import Inquiry from '../models/Inquiry.js';
import { sampleInquiries } from '../data/sampleData.js';
import { getDBStatus } from '../config/db.js';

const router = express.Router();

// In-memory inquiries store for demo mode
let inMemoryInquiries = [...sampleInquiries];

/**
 * GET /api/inquiries
 * Retrieve all registered inquiries (with optional status/city filters)
 */
router.get('/', async (req, res) => {
  try {
    const dbStatus = getDBStatus();
    const { status, city } = req.query;

    if (dbStatus.connected) {
      const query = {};
      if (status && status !== 'all') query.status = status;
      if (city && city !== 'all') query.cityOfInterest = city;

      const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });
      return res.json({
        success: true,
        count: inquiries.length,
        dataSource: 'MongoDB Live',
        data: inquiries
      });
    }

    // In-memory fallback
    let filtered = [...inMemoryInquiries];
    if (status && status !== 'all') {
      filtered = filtered.filter(inq => inq.status.toLowerCase() === status.toLowerCase());
    }
    if (city && city !== 'all') {
      filtered = filtered.filter(inq => inq.cityOfInterest.toLowerCase() === city.toLowerCase());
    }

    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.json({
      success: true,
      count: filtered.length,
      dataSource: 'In-Memory Fallback (Demo Mode)',
      notice: 'Inquiries preserved in memory session. Plug in MongoDB URI for persistent storage.',
      data: filtered
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve inquiries',
      error: error.message
    });
  }
});

/**
 * POST /api/inquiries
 * Submit a new consultation or property inquiry
 */
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      cityOfInterest,
      inquiryType,
      propertyId,
      propertyTitle,
      budgetRange,
      timeframe,
      message,
      channel
    } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.'
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    const inquiryPayload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      cityOfInterest: cityOfInterest || 'Riyadh',
      inquiryType: inquiryType || 'Private Acquisition',
      propertyId: propertyId || null,
      propertyTitle: propertyTitle || null,
      budgetRange: budgetRange || 'Not Specified',
      timeframe: timeframe || 'Flexible',
      message: message.trim(),
      channel: channel || 'Website Form',
      status: 'New',
      createdAt: new Date().toISOString()
    };

    const dbStatus = getDBStatus();

    if (dbStatus.connected) {
      const createdInquiry = await Inquiry.create(inquiryPayload);
      console.log(`[MongoDB] New inquiry registered from ${createdInquiry.name} (${createdInquiry.email})`);
      return res.status(201).json({
        success: true,
        message: 'Your advisory inquiry has been received. A senior advisor will contact you shortly.',
        dataSource: 'MongoDB Live',
        data: createdInquiry
      });
    }

    // In-memory fallback
    const mockCreated = {
      id: `inq-${Date.now()}`,
      ...inquiryPayload
    };
    inMemoryInquiries.unshift(mockCreated);
    console.log(`[In-Memory Store] New inquiry registered from ${mockCreated.name} (${mockCreated.email})`);

    return res.status(201).json({
      success: true,
      message: 'Your advisory inquiry has been received. A senior advisor will contact you shortly.',
      dataSource: 'In-Memory Fallback (Demo Mode)',
      data: mockCreated
    });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process inquiry submission.',
      error: error.message
    });
  }
});

/**
 * PATCH /api/inquiries/:id/status
 * Update status of an inquiry (for the admin dashboard)
 */
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['New', 'Under Review', 'Advisory Scheduled', 'In Progress', 'Completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Valid options are: ${validStatuses.join(', ')}`
      });
    }

    const dbStatus = getDBStatus();

    if (dbStatus.connected) {
      const updated = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Inquiry not found' });
      }
      return res.json({ success: true, data: updated });
    }

    // In-memory fallback
    const target = inMemoryInquiries.find(inq => inq.id === id || inq._id === id);
    if (!target) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    target.status = status;

    return res.json({ success: true, data: target });
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
