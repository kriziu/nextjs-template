import { hash } from '@node-rs/argon2';
import { createDate, TimeSpan } from 'oslo';
import { alphabet, generateRandomString } from 'oslo/crypto';

import { hashOptions } from '@/config';
import { container } from '@/di';

export async function generateVerificationCodeUseCase(userId: string): Promise<{
  code: string;
  verifyToken: string;
}> {
  const verificationCodesRepository = container.get(
    'VerificationCodesRepository'
  );

  const code = generateRandomString(8, alphabet('0-9'));

  const verifyToken = generateRandomString(8, alphabet('0-9', 'A-Z'));
  const verifyTokenHash = await hash(verifyToken, hashOptions);

  await verificationCodesRepository.deleteAllVerificationCodesByUserId(userId);
  await verificationCodesRepository.createVerificationCode({
    userId,
    verifyTokenHash,
    code,
    expiresAt: createDate(new TimeSpan(15, 'm')),
  });

  return { code, verifyToken };
}
