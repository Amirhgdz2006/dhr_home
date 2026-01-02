import { z } from 'zod';
export declare const createCategorySchema: z.ZodObject<{
    name: z.ZodString;
    order: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    order?: number;
}, {
    name?: string;
    order?: number;
}>;
export declare const updateCategorySchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    order: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    order?: number;
}, {
    name?: string;
    order?: number;
}>, {
    name?: string;
    order?: number;
}, {
    name?: string;
    order?: number;
}>;
//# sourceMappingURL=categoryValidator.d.ts.map