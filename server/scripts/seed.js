import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Property from '../models/Property.js';
import Inquiry from '../models/Inquiry.js';
import { sampleProperties, sampleInquiries } from '../data/sampleData.js';

dotenv.config();

const seedDatabase = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sadu_real_estate';

  console.log(`[Seed Script] Attempting connection to MongoDB at: ${uri}`);

  try {
    await mongoose.connect(uri);
    console.log('[Seed Script] Connected to MongoDB.');

    // Clear existing
    console.log('[Seed Script] Clearing previous properties and inquiries...');
    await Property.deleteMany({});
    await Inquiry.deleteMany({});

    // Insert sample properties
    console.log(`[Seed Script] Inserting ${sampleProperties.length} curated properties...`);
    const insertedProperties = await Property.insertMany(sampleProperties);
    console.log(`[Seed Script] Successfully seeded ${insertedProperties.length} properties.`);

    // Insert sample inquiries
    console.log(`[Seed Script] Inserting ${sampleInquiries.length} sample inquiries...`);
    const insertedInquiries = await Inquiry.insertMany(sampleInquiries);
    console.log(`[Seed Script] Successfully seeded ${insertedInquiries.length} inquiries.`);

    console.log('\n[Seed Script] Database seeding complete! Ready for MERN production or local development.');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Script Error] Database seeding failed:', error.message);
    console.log('\nNOTE: If MongoDB is not running locally, the MIRĀS web app automatically runs using the built-in in-memory sample dataset with zero configuration required.');
    process.exit(1);
  }
};

seedDatabase();
