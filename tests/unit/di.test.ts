import { expect, it } from 'vitest';

import { container } from '@/di';
import { MockUsersRepository } from '@/src/infrastructure/repositories/users.repository.mock';
import { MockVerificationCodesRepository } from '@/src/infrastructure/repositories/verification-codes.repository.mock';
import { MockAuthenticationService } from '@/src/infrastructure/services/authentication.service.mock';
import { MockEmailService } from '@/src/infrastructure/services/email.service.mock';

it('should use Mock versions of repos and services', async () => {
  const authenticationService = container.get('AuthenticationService');
  expect(authenticationService).toBeInstanceOf(MockAuthenticationService);

  const emailService = container.get('EmailService');
  expect(emailService).toBeInstanceOf(MockEmailService);

  const usersRepository = container.get('UsersRepository');
  expect(usersRepository).toBeInstanceOf(MockUsersRepository);

  const verificationCodesRepository = container.get(
    'VerificationCodesRepository'
  );
  expect(verificationCodesRepository).toBeInstanceOf(
    MockVerificationCodesRepository
  );
});

// TODO: Add unit tests for controllers
