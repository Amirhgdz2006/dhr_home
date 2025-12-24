const mongoose = require('mongoose');

const connectDB = async function(){
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dhr';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
