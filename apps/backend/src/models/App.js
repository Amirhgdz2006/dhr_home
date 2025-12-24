const mongoose = require('mongoose');
const Counter = require('./Counter');

const appSchema = new mongoose.Schema({ 
  id: { type: Number },
    name: { type: String, required: true },
    englishName: { type: String },
    description: { type: String },
    url: { type: String },
    keywords: [String],
    icon_background_color: { type: String, default: null },
    icon: {
    url: String,
    },
    category : {type: String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    publishedAt: { type: Date, default: Date.now }
});

appSchema.pre('save', async function () {
  if (this.id) return;

  const counter = await Counter.findOneAndUpdate(
    { name: 'app' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  this.id = counter.seq;
});


module.exports = mongoose.model('App', appSchema);

