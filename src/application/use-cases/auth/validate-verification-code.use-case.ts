import { verify } from '@node-rs/argon2';
import { isWithinExpirationDate } from 'oslo';

import { hashOptions } from '@/config';
import { container } from '@/di';
import { AuthenticationError } from '@/src/entities/errors/auth';

export async function validateVerificationCodeUseCase(
  userId: string,
  code: string,
  verifyToken: string
): Promise<void> {
  const verificationCodesRepository = container.get(
    'VerificationCodesRepository'
  );

  const dbCode = await verificationCodesRepository.getVerificationCode(code);
  if (!dbCode || dbCode.userId !== userId) {
    throw new AuthenticationError('Invalid code.');
  }

  if (!isWithinExpirationDate(dbCode.expiresAt)) {
    throw new AuthenticationError('Code expired.');
  }

  const isValidVerifyToken = await verify(
    dbCode.verifyTokenHash,
    verifyToken,
    hashOptions
  );
  if (!isValidVerifyToken) {
    throw new AuthenticationError('Invalid code.');
  }

  await verificationCodesRepository.deleteAllVerificationCodesByUserId(userId);
}
