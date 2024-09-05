import { z } from 'zod';

import { container } from '@/di';
import { generateVerificationCodeUseCase } from '@/src/application/use-cases/auth/generate-verification-code.use-case';
import { sendEmailUseCase } from '@/src/application/use-cases/email/send-email.use-case';
import { createUserUseCase } from '@/src/application/use-cases/users/create-user.use-case';
import { InputParseError } from '@/src/entities/errors/common';
import { generateVerificationCodeInputSchema } from '@/src/entities/schemas/auth/generate-verification-code.schemas';
import { verificationCodeEmailTemplate } from '@/src/entities/templates/emails/verification-code-email.template';

export async function generateVerificationCodeController(
  input: Partial<z.infer<typeof generateVerificationCodeInputSchema>>
): Promise<{ verifyToken: string; email: string }> {
  const usersRepository = container.get('UsersRepository');

  const { data, error: inputParseError } =
    generateVerificationCodeInputSchema.safeParse(input);
  if (inputParseError) {
    throw new InputParseError('Invalid data', { cause: inputParseError });
  }

  let user = await usersRepository.getUserByEmail(data.email);
  if (!user) {
    user = await createUserUseCase(data.email);
  }

  const { verifyToken, code } = await generateVerificationCodeUseCase(user.id);

  await sendEmailUseCase({
    ...verificationCodeEmailTemplate(code),
    to: data.email,
  });

  return { verifyToken, email: data.email };
}
