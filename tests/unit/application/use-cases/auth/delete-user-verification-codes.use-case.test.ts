import { afterEach, beforeEach, expect, it } from 'vitest';

import { container, destroyContainer, initializeContainer } from '@/di';
import { deleteUserVerificationCodesUseCase } from '@/src/application/use-cases/auth/delete-user-verification-codes.use-case';

beforeEach(() => {
  initializeContainer();
});

afterEach(() => {
  destroyContainer();
});

it('deletes all user verification codes', async () => {
  const verificationCodesRepository = container.get(
    'VerificationCodesRepository'
  );

  expect(
    verificationCodesRepository.getAllVerificationCodes()
  ).resolves.toHaveLength(2);
  await deleteUserVerificationCodesUseCase('1');
  expect(
    verificationCodesRepository.getAllVerificationCodes()
  ).resolves.toHaveLength(0);
});
