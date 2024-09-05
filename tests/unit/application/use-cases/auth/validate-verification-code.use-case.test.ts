import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import { container, destroyContainer, initializeContainer } from '@/di';
import { generateVerificationCodeUseCase } from '@/src/application/use-cases/auth/generate-verification-code.use-case';
import { validateVerificationCodeUseCase } from '@/src/application/use-cases/auth/validate-verification-code.use-case';
import { AuthenticationError } from '@/src/entities/errors/auth';

beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

it('validates a valid verification code', async () => {
  const { code, verifyToken } = await generateVerificationCodeUseCase('1');

  expect(
    validateVerificationCodeUseCase('1', code, verifyToken)
  ).resolves.not.toThrow();
});

it('deletes user verification codes after validation', async () => {
  const verificationCodesRepository = container.get(
    'VerificationCodesRepository'
  );

  const { code, verifyToken } = await generateVerificationCodeUseCase('1');

  expect(
    verificationCodesRepository.getAllVerificationCodes()
  ).resolves.toHaveLength(1);
  await validateVerificationCodeUseCase('1', code, verifyToken);
  expect(
    verificationCodesRepository.getAllVerificationCodes()
  ).resolves.toHaveLength(0);
});

it("throws an error if code doesn't exist", async () => {
  await generateVerificationCodeUseCase('1');

  await expect(
    validateVerificationCodeUseCase('1', 'invalid_code', 'doesnt matter')
  ).rejects.toThrow(AuthenticationError);
});

it('throws an error if code is not for the user', async () => {
  const { code, verifyToken } = await generateVerificationCodeUseCase('1');

  await expect(
    validateVerificationCodeUseCase('2', code, verifyToken)
  ).rejects.toThrow(AuthenticationError);
});

it('throws an error if code is expired', async () => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  vi.setSystemTime(oneHourAgo);

  const { code, verifyToken } = await generateVerificationCodeUseCase('1');

  vi.useRealTimers();

  await expect(
    validateVerificationCodeUseCase('1', code, verifyToken)
  ).rejects.toThrow(AuthenticationError);
});

it('throws an error if verify token is invalid', async () => {
  const { code } = await generateVerificationCodeUseCase('1');

  await expect(
    validateVerificationCodeUseCase('1', code, 'invalid_token')
  ).rejects.toThrow(AuthenticationError);
});
