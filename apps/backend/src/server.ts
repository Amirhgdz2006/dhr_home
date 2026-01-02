import 'dotenv/config';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';
import apiRoutes from './routes/api';
import authRoutes from './routes/auth';
import path from 'path';
import cors from 'cors';
import errorHandler from './middleware/errorHandler';

const app = express();

// CORS configuration
const allowedOrigins: string[] =
  process.env.FRONTEND_URLS?.split(',') || (process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error('Origin not allowed by CORS'));
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routers
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// Static files
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/background', express.static(path.join(__dirname, '..', 'background')));

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
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error('Failed to connect to DB:', err);
    process.exit(1);
  });
