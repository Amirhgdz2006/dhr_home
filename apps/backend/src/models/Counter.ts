import mongoose from 'mongoose';

interface ICounter extends mongoose.Document {
  name: string;
  seq: number;
}

const counterSchema = new mongoose.Schema<ICounter>({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 }
});

export default mongoose.model<ICounter>('Counter', counterSchema);

