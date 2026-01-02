export declare const findAllSorted: () => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../models/Category").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Category").ICategory & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
})[], import("mongoose").Document<unknown, {}, import("../models/Category").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Category").ICategory & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, {}, import("../models/Category").ICategory, "find", {}>;
export declare const create: (data: {
    name: string;
    order?: number | null;
}) => Promise<import("mongoose").Document<unknown, {}, import("../models/Category").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Category").ICategory & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const updateById: (id: number, data: Partial<{
    name: string;
    order?: number | null;
    updatedAt: Date;
}>) => import("mongoose").Query<import("mongoose").Document<unknown, {}, import("../models/Category").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Category").ICategory & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, import("mongoose").Document<unknown, {}, import("../models/Category").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Category").ICategory & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, {}, import("../models/Category").ICategory, "findOneAndUpdate", {}>;
export declare const deleteById: (id: number) => import("mongoose").Query<import("mongoose").Document<unknown, {}, import("../models/Category").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Category").ICategory & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, import("mongoose").Document<unknown, {}, import("../models/Category").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Category").ICategory & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, {}, import("../models/Category").ICategory, "findOneAndDelete", {}>;
//# sourceMappingURL=categoryRepository.d.ts.map