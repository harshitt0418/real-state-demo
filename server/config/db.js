import mongoose from 'mongoose';

let isMongoConnected = false;
let mongoConnectionError = null;

export const connectDB = async () => {
  // If already connected (cached across serverless invocations), reuse connection
  if (mongoose.connection.readyState >= 1) {
    isMongoConnected = true;
    return true;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sadu_real_estate';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
      connectTimeoutMS: 2500,
    });

    isMongoConnected = true;
    mongoConnectionError = null;
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    return true;
  } catch (error) {
    isMongoConnected = false;
    mongoConnectionError = error.message;
    console.warn(`[MongoDB Notice] Live database not reachable at ${uri}`);
    console.log(`[Demo Mode Active] Seamlessly operating with in-memory sample dataset.`);
    return false;
  }
};

export const getDBStatus = () => ({
  connected: isMongoConnected || mongoose.connection.readyState >= 1,
  mode: (isMongoConnected || mongoose.connection.readyState >= 1) 
    ? 'MongoDB Live Connection' 
    : 'In-Memory Fallback Store (Demo Mode)',
  uri: (isMongoConnected || mongoose.connection.readyState >= 1) 
    ? (process.env.MONGODB_URI ? 'MongoDB Atlas / Configured URI' : 'Connected') 
    : 'Not connected (using realistic sample data)',
  error: mongoConnectionError
});
