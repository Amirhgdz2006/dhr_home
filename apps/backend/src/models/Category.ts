import mongoose from 'mongoose';
import Counter from './Counter';

export interface ICategory extends mongoose.Document {
  id: number;
  name: string;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

const categorySchema = new mongoose.Schema<ICategory>({
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

export default mongoose.model<ICategory>('Category', categorySchema);

