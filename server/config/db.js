import mongoose from 'mongoose';

let isMongoConnected = false;
let mongoConnectionError = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/miras_real_estate';

  try {
    // Attempt connection with short serverSelectionTimeoutMS so server doesn't hang
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
      connectTimeoutMS: 2500,
    });

    isMongoConnected = true;
    mongoConnectionError = null;
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    console.log(`[MongoDB] Database Name: ${conn.connection.name}`);
    return true;
  } catch (error) {
    isMongoConnected = false;
    mongoConnectionError = error.message;
    console.warn(`[MongoDB Notice] Live database not reachable at ${uri}`);
    console.warn(`[MongoDB Notice] Error details: ${error.message}`);
    console.log(`[Demo Mode Active] Seamlessly operating with in-memory sample dataset. All read and write APIs remain fully functional.`);
    console.log(`[Demo Mode Active] To use live MongoDB: install MongoDB locally or provide MONGODB_URI in server/.env`);
    return false;
  }
};

export const getDBStatus = () => ({
  connected: isMongoConnected,
  mode: isMongoConnected ? 'MongoDB Live Connection' : 'In-Memory Fallback Store (Demo Mode)',
  uri: isMongoConnected ? process.env.MONGODB_URI : 'Not connected (using realistic sample data)',
  error: mongoConnectionError
});
