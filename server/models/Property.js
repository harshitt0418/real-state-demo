import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    title: {
      type: String,
      required: [true, 'Property title is required'],
      trim: true
    },
    subtitle: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      required: true,
      enum: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dubai', 'Other'],
      index: true
    },
    district: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      required: true,
      enum: ['Apartment', 'Villa', 'Commercial', 'Penthouse', 'Retail'],
      index: true
    },
    category: {
      type: String,
      enum: ['Residential', 'Commercial', 'Waterfront', 'Off-Plan', 'Sanctuary'],
      default: 'Residential'
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      index: true
    },
    priceLabel: {
      type: String,
      required: true
    },
    pricePerSqm: {
      type: Number
    },
    beds: {
      type: Number,
      default: null
    },
    baths: {
      type: Number,
      default: 1
    },
    area: {
      type: Number,
      required: true
    },
    parkingSpaces: {
      type: Number,
      default: 1
    },
    completionYear: {
      type: Number
    },
    status: {
      type: String,
      enum: ['Available', 'Reserved', 'Under Due Diligence', 'Sold'],
      default: 'Available'
    },
    featured: {
      type: Boolean,
      default: false,
      index: true
    },
    image: {
      type: String,
      required: true
    },
    gallery: {
      type: [String],
      default: []
    },
    blurb: {
      type: String,
      required: true
    },
    overview: {
      type: String
    },
    architecturalHighlights: {
      type: [String],
      default: []
    },
    financialMetrics: {
      estimatedYield: String,
      capitalAppreciation: String,
      occupancyProfile: String,
      serviceCharge: String
    },
    location: {
      address: String,
      coordinates: {
        lat: Number,
        lng: Number
      },
      districtCode: String,
      nearby: [
        {
          label: String,
          distance: String
        }
      ]
    },
    developerTier: {
      type: String,
      default: 'Sadu Development Prime Channel'
    },
    handoverStatus: {
      type: String,
      default: 'Immediate Handover'
    },
    zoning: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);

export default Property;
