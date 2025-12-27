const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Counter = require('./Counter');

const userSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function () {
  if (this.id) return;

  const counter = await Counter.findOneAndUpdate(
    { name: 'user' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  this.id = counter.seq;
});

module.exports = mongoose.model('User', userSchema);
