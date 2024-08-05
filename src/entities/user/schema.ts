import { z } from 'zod';

export const registerUserSchema = z.object({
  name: z.string().min(1, 'Name must be at least 1 character long.'),
  email: z.string().email('Invalid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
});

export const loginUserSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z.string().min(1, 'Invalid password.'),
});
