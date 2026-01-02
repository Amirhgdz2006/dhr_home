export declare const getData: () => Promise<{
    id: number;
    documentId: string;
    name: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    apps: {
        id: number;
        documentId: string;
        name: string;
        englishName: string;
        description: string;
        url: string;
        keywords: string[];
        icon_background_color: string;
        icon: {
            url: string;
        };
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date;
    }[];
}[]>;
export declare const createApp: (data: {
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
export declare const updateApp: (id: number, data: Partial<{
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
}>) => import("mongoose").Query<import("mongoose").Document<unknown, {}, import("../models/App").IApp, {}, import("mongoose").DefaultSchemaOptions> & import("../models/App").IApp & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, import("mongoose").Document<unknown, {}, import("../models/App").IApp, {}, import("mongoose").DefaultSchemaOptions> & import("../models/App").IApp & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, {}, import("../models/App").IApp, "findOneAndUpdate", {}>;
export declare const deleteApp: (id: number) => import("mongoose").Query<import("mongoose").Document<unknown, {}, import("../models/App").IApp, {}, import("mongoose").DefaultSchemaOptions> & import("../models/App").IApp & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, import("mongoose").Document<unknown, {}, import("../models/App").IApp, {}, import("mongoose").DefaultSchemaOptions> & import("../models/App").IApp & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, {}, import("../models/App").IApp, "findOneAndDelete", {}>;
//# sourceMappingURL=appService.d.ts.map