"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAppSchema = exports.createAppSchema = void 0;
const zod_1 = require("zod");
// App
exports.createAppSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    englishName: zod_1.z.string().optional().nullable(),
    description: zod_1.z.string().optional().nullable(),
    url: zod_1.z.string().url().optional().nullable(),
    keywords: zod_1.z.array(zod_1.z.string()).optional().default([]),
    icon_background_color: zod_1.z
        .string()
        .regex(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        .optional()
        .nullable(),
    icon: zod_1.z
        .object({ url: zod_1.z.string().url().optional().nullable() })
        .optional()
        .nullable(),
    category: zod_1.z.string().optional().nullable()
});
exports.updateAppSchema = exports.createAppSchema.partial().refine(data => Object.keys(data).length > 0, { message: 'At least one field must be provided for update' });
//# sourceMappingURL=appValidator.js.map