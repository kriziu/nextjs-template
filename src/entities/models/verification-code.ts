import { z } from 'zod';

export const verificationCodeRegex = /^\d{8}$/;

export const verificationCodeSchema = z.object({
  code: z.string().regex(verificationCodeRegex, 'Invalid code'),
  verifyTokenHash: z.string(),
  userId: z.string(),
  expiresAt: z.date(),
});

export type VerificationCode = z.infer<typeof verificationCodeSchema>;

export const insertVerificationCodeSchema = verificationCodeSchema.pick({
  code: true,
  verifyTokenHash: true,
  userId: true,
  expiresAt: true,
});

export type VerificationCodeInsert = z.infer<
  typeof insertVerificationCodeSchema
>;
