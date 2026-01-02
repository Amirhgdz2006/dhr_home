import mongoose from 'mongoose';
export interface ICategory extends mongoose.Document {
    id: number;
    name: string;
    order?: number;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
}
declare const _default: mongoose.Model<ICategory, {}, {}, {}, mongoose.Document<unknown, {}, ICategory, {}, mongoose.DefaultSchemaOptions> & ICategory & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, ICategory>;
export default _default;
//# sourceMappingURL=Category.d.ts.map