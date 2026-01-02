import { z } from 'zod';

// Category
export const createCategorySchema = z.object({
  name: z.string().min(1),
  order: z.number().int().nonnegative().optional().nullable()
});

export const updateCategorySchema = createCategorySchema.partial().refine(
  data => Object.keys(data).length > 0,
  { message: 'At least one field must be provided for update' }
);

