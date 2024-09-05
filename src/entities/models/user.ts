import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean().default(false),
});

export type User = z.infer<typeof userSchema>;

export const insertUserSchema = userSchema.pick({
  email: true,
  emailVerified: true,
});

export type UserInsert = z.infer<typeof insertUserSchema>;
