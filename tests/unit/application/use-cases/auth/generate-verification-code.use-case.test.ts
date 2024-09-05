import { createDate, TimeSpan } from 'oslo';
import { afterEach, beforeEach, expect, it } from 'vitest';

import { container, destroyContainer, initializeContainer } from '@/di';
import { generateVerificationCodeUseCase } from '@/src/application/use-cases/auth/generate-verification-code.use-case';

beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

it('generates a valid verification code', async () => {
  const { verifyToken, code } = await generateVerificationCodeUseCase('1');

  expect(verifyToken).toBeDefined();
  expect(code).toHaveLength(8);
  expect(Number(code)).not.toBeNaN();
});

it('sets verification code expiration to 15 minutes', async () => {
  const verificationCodesRepository = container.get(
    'VerificationCodesRepository'
  );

  await generateVerificationCodeUseCase('1');

  const verificationCode = (
    await verificationCodesRepository.getAllVerificationCodes()
  )[0];

  expect(verificationCode.expiresAt.getTime()).toBeLessThanOrEqual(
    createDate(new TimeSpan(15, 'm')).getTime()
  );
});

it('deletes existing user verification codes', async () => {
  const verificationCodesRepository = container.get(
    'VerificationCodesRepository'
  );

  await generateVerificationCodeUseCase('1');

  expect(
    verificationCodesRepository.getAllVerificationCodes()
  ).resolves.toHaveLength(1);
});
