import mongoose from 'mongoose';
interface ICounter extends mongoose.Document {
    name: string;
    seq: number;
}
declare const _default: mongoose.Model<ICounter, {}, {}, {}, mongoose.Document<unknown, {}, ICounter, {}, mongoose.DefaultSchemaOptions> & ICounter & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, ICounter>;
export default _default;
//# sourceMappingURL=Counter.d.ts.map