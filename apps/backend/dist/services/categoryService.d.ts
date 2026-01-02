export declare const createCategory: (data: {
    name: string;
    order?: number | null;
}) => Promise<import("mongoose").Document<unknown, {}, import("../models/Category").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Category").ICategory & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const updateCategory: (id: number, data: Partial<{
    name: string;
    order?: number | null;
}>) => import("mongoose").Query<import("mongoose").Document<unknown, {}, import("../models/Category").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Category").ICategory & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, import("mongoose").Document<unknown, {}, import("../models/Category").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Category").ICategory & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, {}, import("../models/Category").ICategory, "findOneAndUpdate", {}>;
export declare const deleteCategory: (id: number) => import("mongoose").Query<import("mongoose").Document<unknown, {}, import("../models/Category").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Category").ICategory & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, import("mongoose").Document<unknown, {}, import("../models/Category").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Category").ICategory & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, {}, import("../models/Category").ICategory, "findOneAndDelete", {}>;
//# sourceMappingURL=categoryService.d.ts.map