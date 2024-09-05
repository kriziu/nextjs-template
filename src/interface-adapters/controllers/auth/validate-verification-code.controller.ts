import { z } from 'zod';

import { container } from '@/di';
import { validateVerificationCodeUseCase } from '@/src/application/use-cases/auth/validate-verification-code.use-case';
import { AuthenticationError } from '@/src/entities/errors/auth';
import { InputParseError } from '@/src/entities/errors/common';
import { Cookie } from '@/src/entities/models/cookie';
import { validateVerificationCodeInputSchema } from '@/src/entities/schemas/auth/validate-verification-code.schemas';

export async function validateVerificationCodeController(
  input: Partial<z.infer<typeof validateVerificationCodeInputSchema>>
): Promise<Cookie> {
  const authenticationService = container.get('AuthenticationService');
  const verificationCodesRepository = container.get(
    'VerificationCodesRepository'
  );
  const usersRepository = container.get('UsersRepository');

  const { data, error: inputParseError } =
    validateVerificationCodeInputSchema.safeParse(input);
  if (inputParseError) {
    throw new InputParseError('Invalid data', { cause: inputParseError });
  }

  const user = await usersRepository.getUserByEmail(data.email);
  if (!user) {
    throw new AuthenticationError('User with this email not found.');
  }

  await validateVerificationCodeUseCase(user.id, data.code, data.verifyToken);
  await verificationCodesRepository.deleteAllVerificationCodesByUserId(user.id);

  await usersRepository.editUser(user.id, { emailVerified: true });

  const { cookie } = await authenticationService.createSession(user);

  return cookie;
}
