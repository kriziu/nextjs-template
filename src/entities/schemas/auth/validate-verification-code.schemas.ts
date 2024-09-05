import { z } from 'zod';

import { verificationCodeRegex } from '@/src/entities/models/verification-code';

export const validateVerificationCodeInputSchema = z.object({
  email: z.string().email(),
  code: z.string().regex(verificationCodeRegex, 'Invalid code'),
  verifyToken: z.string(),
});
