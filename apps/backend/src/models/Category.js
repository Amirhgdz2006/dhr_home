const mongoose = require('mongoose');
const Counter = require('./Counter');

const categorySchema = new mongoose.Schema({
  id: { type: Number },   
  name: { type: String, required: true },
  order: { type: Number},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  publishedAt: { type: Date, default: Date.now }
});

categorySchema.pre('save', async function () {
  if (this.id) return;

  const counter = await Counter.findOneAndUpdate(
    { name: 'category' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  this.id = counter.seq;
});

module.exports = mongoose.model('Category', categorySchema);
