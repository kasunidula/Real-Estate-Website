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
import logger from './utils/logger.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import itemRoutes from './routes/items.js';
import propertyRoutes from './routes/propertyRoutes.js'; // ✅ Added Property Routes
import { connectDB } from './config/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));

// ✅ Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/properties', propertyRoutes); // ✅ Added Property API Route

// Root Endpoint
app.get('/', (req, res) => {
    res.send('Backend is running with advanced features');
});

// ✅ WebSockets
const httpServer = createServer(app);
const io = socketHandler(httpServer);

// ✅ Start the Server
httpServer.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT}`);
});
