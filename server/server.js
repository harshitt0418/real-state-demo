import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB, getDBStatus } from './config/db.js';
import propertyRoutes from './routes/propertyRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

// Resolve directory paths in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
let PORT = Number(process.env.PORT) || 5001;

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin or matching allowed
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production' || process.env.VERCEL) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive for preview deployments
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan('dev'));

// Ensure DB is connected
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    await connectDB();
  }
  next();
});

// Static assets (images, badges)
app.use('/assets', express.static(path.join(__dirname, '../client/public/assets')));

// API Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/stats', statsRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = getDBStatus();
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'MIRĀS Real Estate Advisory API (Node.js & Express)',
    environment: process.env.VERCEL ? 'Vercel Multi-Service' : 'Node.js Runtime',
    database: dbStatus,
    endpoints: {
      properties: '/api/properties',
      inquiries: '/api/inquiries',
      stats: '/api/stats',
      health: '/api/health'
    }
  });
});

// Production client serving (fallback when running as standalone Node server)
const clientBuildPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientBuildPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(clientBuildPath, 'index.html');
  res.sendFile(indexPath, err => {
    if (err) {
      const dbStatus = getDBStatus();
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head><title>MIRĀS Real Estate Advisory API</title></head>
          <body style="font-family: system-ui, sans-serif; padding: 40px; background: #0f1216; color: #f3efea; line-height: 1.6;">
            <h1 style="color: #c5a265;">MIRĀS Real Estate Advisory — Backend API</h1>
            <p>The Express.js server is running actively on port ${PORT}.</p>
            <p>Database Status: <strong>${dbStatus ? dbStatus.mode : 'Initialized'}</strong></p>
            <p>To view the React client, start Vite via <code>npm run client</code> or run <code>npm run dev</code> from the root folder.</p>
            <p>API Health Check: <a href="/api/health" style="color: #c5a265;">/api/health</a> | Properties: <a href="/api/properties" style="color: #c5a265;">/api/properties</a></p>
          </body>
        </html>
      `);
    }
  });
});

// Start HTTP server with port resilience
const startServer = async () => {
  await connectDB();

  const listen = (portToTry) => {
    const server = app.listen(portToTry, () => {
      PORT = portToTry;
      console.log(`====================================================`);
      console.log(`[MIRĀS API] Server running on http://localhost:${PORT}`);
      console.log(`[MIRĀS API] Health: http://localhost:${PORT}/api/health`);
      console.log(`[MIRĀS API] Properties: http://localhost:${PORT}/api/properties`);
      console.log(`[MIRĀS API] Database Status: ${getDBStatus().mode}`);
      console.log(`====================================================`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`[MIRĀS API] Port ${portToTry} in use, trying port ${portToTry + 1}...`);
        listen(portToTry + 1);
      } else {
        console.error('[MIRĀS API Error]', err);
      }
    });
  };

  listen(PORT);
};

if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  startServer();
}

export default app;
