require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const apiRoutes = require('./routers/api');
const authRoutes = require('./routers/auth');
const path = require('path');
const cors = require('cors');

const app = express();

// CORS configuration
const allowedOrigin = process.env.FRONTEND_URL;
app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

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

const PORT = process.env.PORT || 1338;

// Connect to DB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Failed to connect to DB', err));
