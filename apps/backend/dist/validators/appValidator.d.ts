import { z } from 'zod';
export declare const createAppSchema: z.ZodObject<{
    name: z.ZodString;
    englishName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    url: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    keywords: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    icon_background_color: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    icon: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        url: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        url?: string;
    }, {
        url?: string;
    }>>>;
    category: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    description?: string;
    category?: string;
    englishName?: string;
    url?: string;
    keywords?: string[];
    icon_background_color?: string;
    icon?: {
        url?: string;
    };
}, {
    name?: string;
    description?: string;
    category?: string;
    englishName?: string;
    url?: string;
    keywords?: string[];
    icon_background_color?: string;
    icon?: {
        url?: string;
    };
}>;
export declare const updateAppSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    englishName: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    url: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    keywords: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>>;
    icon_background_color: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    icon: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodObject<{
        url: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        url?: string;
    }, {
        url?: string;
    }>>>>;
    category: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    description?: string;
    category?: string;
    englishName?: string;
    url?: string;
    keywords?: string[];
    icon_background_color?: string;
    icon?: {
        url?: string;
    };
}, {
    name?: string;
    description?: string;
    category?: string;
    englishName?: string;
    url?: string;
    keywords?: string[];
    icon_background_color?: string;
    icon?: {
        url?: string;
    };
}>, {
    name?: string;
    description?: string;
    category?: string;
    englishName?: string;
    url?: string;
    keywords?: string[];
    icon_background_color?: string;
    icon?: {
        url?: string;
    };
}, {
    name?: string;
    description?: string;
    category?: string;
    englishName?: string;
    url?: string;
    keywords?: string[];
    icon_background_color?: string;
    icon?: {
        url?: string;
    };
}>;
//# sourceMappingURL=appValidator.d.ts.map