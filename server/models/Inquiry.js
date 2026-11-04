import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true
    },
    mobile: {
      type: String,
      trim: true
    },
    lookingFor: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: ''
    },
    phone: {
      type: String,
      trim: true
    },
    cityOfInterest: {
      type: String,
      default: 'Riyadh'
    },
    inquiryType: {
      type: String,
      enum: [
        'Private Acquisition',
        'Commercial Investment',
        'Family Office Allocation',
        'Developer Channel',
        'General Consultation'
      ],
      default: 'Private Acquisition'
    },
    propertyId: {
      type: String,
      default: null
    },
    propertyTitle: {
      type: String,
      default: null
    },
    budgetRange: {
      type: String,
      default: 'Not Specified'
    },
    timeframe: {
      type: String,
      default: 'Flexible'
    },
    message: {
      type: String,
      default: '',
      trim: true
    },
    channel: {
      type: String,
      default: 'Website Form'
    },
    status: {
      type: String,
      enum: ['New', 'Under Review', 'Advisory Scheduled', 'In Progress', 'Completed'],
      default: 'New'
    }
  },
  {
    timestamps: true
  }
);

const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);

export default Inquiry;
