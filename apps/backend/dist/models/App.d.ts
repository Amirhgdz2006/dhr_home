import mongoose from 'mongoose';
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
declare const _default: mongoose.Model<IApp, {}, {}, {}, mongoose.Document<unknown, {}, IApp, {}, mongoose.DefaultSchemaOptions> & IApp & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IApp>;
export default _default;
//# sourceMappingURL=App.d.ts.map