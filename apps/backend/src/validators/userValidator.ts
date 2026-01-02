import { z } from 'zod';

// User
export const registerSchema = z.object({
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9]+$/),
  password: z.string().min(6)
});

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

