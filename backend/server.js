import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import socketHandler from './websockets/socketHandler.js';
import logger from './utils/logger.js'; // Ensure logger exists, otherwise fallback to console.log
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import itemRoutes from './routes/items.js';
import propertyRoutes from './routes/propertyRoutes.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
(async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit process with failure
  }
})();

// ✅ Middleware
app.use(express.json()); // Allows JSON body parsing
app.use(express.urlencoded({ extended: true })); // Supports URL-encoded data
app.use(cors({ origin: process.env.FRONTEND_URL || '*' })); // Allow frontend requests
app.use(helmet()); // Security headers
app.use(compression()); // Gzip compression for performance
app.use(morgan('combined')); // Logs HTTP requests

// ✅ Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: '❌ Too many requests. Please try again later.',
});
app.use(limiter);

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/properties', propertyRoutes);


// ✅ Health Check
app.get('/', (req, res) => {
  res.send('🚀 Backend is running with MongoDB Atlas and production-ready config!');
});

// ✅ Handle Undefined Routes (404)
app.use((req, res) => {
  res.status(404).json({ message: "❌ Route Not Found" });
});

// ✅ WebSockets Setup
const httpServer = createServer(app);
socketHandler(httpServer); // Initialize WebSocket handling

// ✅ Start Server
httpServer.listen(PORT, () => {
  (logger?.info || console.log)(`🚀 Server running on port ${PORT}`);
});