import 'dotenv/config';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';
import apiRoutes from './routes/api';
import authRoutes from './routes/auth';
import path from 'path';
import cors from 'cors';
import errorHandler from './middleware/errorHandler';
const hpp: any = require('hpp');
import helmet from 'helmet';
import mongoose from 'mongoose';
import fs from 'fs';

const app = express();

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false,
}));
app.use(hpp());

// CORS configuration
const allowedOrigins: string[] =
  process.env.FRONTEND_URLS?.split(',').map(url => url.trim()) || 
  (process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []);

console.log('Allowed CORS Origins:', allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      console.warn('Blocked CORS request from:', origin);
      callback(new Error('Origin not allowed by CORS'));
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  const dbState = mongoose.connection.readyState;
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (dbState === 1) {
    res.status(200).json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString(),
      mongodb_uri: process.env.MONGODB_URI?.split('@')[1] || 'N/A'
    });
  } else {
    res.status(503).json({
      status: 'error',
      database: 'disconnected',
      readyState: dbState,
      timestamp: new Date().toISOString(),
    });
  }
});

// Routers
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// Serve all static files from the uploads folder
const uploadsPath = path.resolve(process.cwd(), 'uploads');

if (!fs.existsSync(uploadsPath)) {
  console.error('Uploads folder not found:', uploadsPath);
} else {
  console.log('Uploads folder loaded from:', uploadsPath);
}

app.use('/uploads', express.static(uploadsPath));

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
  });
});

// Global Error Handler (must be last)
app.use(errorHandler);

const PORT: number = parseInt(process.env.PORT || '1338', 10);

// Connect to DB and start server
connectDB()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log('Server running on port', PORT);
      console.log('MongoDB URI:', process.env.MONGODB_URI);
      console.log('Allowed Origins:', allowedOrigins);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to DB:', err);
    process.exit(1);
  });