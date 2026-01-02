export declare const findByCategoryName: (categoryName: string) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../models/App").IApp, {}, import("mongoose").DefaultSchemaOptions> & import("../models/App").IApp & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
})[], import("mongoose").Document<unknown, {}, import("../models/App").IApp, {}, import("mongoose").DefaultSchemaOptions> & import("../models/App").IApp & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, {}, import("../models/App").IApp, "find", {}>;
export declare const create: (data: {
    name: string;
    englishName?: string;
    description?: string;
    url?: string;
    keywords?: string[];
    icon_background_color?: string | null;
    icon?: {
        url?: string;
    };
    category?: string;
}) => Promise<import("mongoose").Document<unknown, {}, import("../models/App").IApp, {}, import("mongoose").DefaultSchemaOptions> & import("../models/App").IApp & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const updateById: (id: number, data: Partial<{
    name: string;
    englishName?: string;
    description?: string;
    url?: string;
    keywords?: string[];
    icon_background_color?: string | null;
    icon?: {
        url?: string;
    };
    category?: string;
    updatedAt: Date;
}>) => import("mongoose").Query<import("mongoose").Document<unknown, {}, import("../models/App").IApp, {}, import("mongoose").DefaultSchemaOptions> & import("../models/App").IApp & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, import("mongoose").Document<unknown, {}, import("../models/App").IApp, {}, import("mongoose").DefaultSchemaOptions> & import("../models/App").IApp & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, {}, import("../models/App").IApp, "findOneAndUpdate", {}>;
export declare const deleteById: (id: number) => import("mongoose").Query<import("mongoose").Document<unknown, {}, import("../models/App").IApp, {}, import("mongoose").DefaultSchemaOptions> & import("../models/App").IApp & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, import("mongoose").Document<unknown, {}, import("../models/App").IApp, {}, import("mongoose").DefaultSchemaOptions> & import("../models/App").IApp & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, {}, import("../models/App").IApp, "findOneAndDelete", {}>;
//# sourceMappingURL=appRepository.d.ts.map