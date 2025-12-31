const { z } = require('zod');

// App
const createAppSchema = z.object({
  name: z.string().min(1),
  englishName: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  url: z.string().url().optional().nullable(),
  keywords: z.array(z.string()).optional().default([]),
  icon_background_color: z
    .string()
    .regex(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .optional()
    .nullable(),
  icon: z
    .object({ url: z.string().url().optional().nullable() })
    .optional()
    .nullable(),
  category: z.string().optional().nullable()
});

const updateAppSchema = createAppSchema.partial().refine(
  data => Object.keys(data).length > 0,
  { message: 'At least one field must be provided for update' }
);

module.exports = {createAppSchema, updateAppSchema}