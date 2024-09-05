import { z } from 'zod';

export const generateVerificationCodeInputSchema = z.object({
  email: z.string().email(),
});
