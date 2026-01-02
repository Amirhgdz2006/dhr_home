"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategorySchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
// Category
exports.createCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    order: zod_1.z.number().int().nonnegative().optional().nullable()
});
exports.updateCategorySchema = exports.createCategorySchema.partial().refine(data => Object.keys(data).length > 0, { message: 'At least one field must be provided for update' });
//# sourceMappingURL=categoryValidator.js.map