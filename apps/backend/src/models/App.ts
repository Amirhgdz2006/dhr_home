import mongoose from 'mongoose';
import Counter from './Counter';

export interface IApp extends mongoose.Document {
  id: number;
  name: string;
  englishName?: string;
  description?: string;
  url?: string;
  keywords: string[];
  icon_background_color?: string | null;
  icon?: {
    url?: string;
  };
  category?: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

const appSchema = new mongoose.Schema<IApp>({ 
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

export default mongoose.model<IApp>('App', appSchema);

