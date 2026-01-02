import mongoose from 'mongoose';
import Counter from './Counter';

export interface IUser extends mongoose.Document {
  id: number;
  username: string;
  password: string;
  createdAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
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

export default mongoose.model<IUser>('User', userSchema);

