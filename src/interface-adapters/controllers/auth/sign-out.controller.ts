import { container } from '@/di';
import { signOutUseCase } from '@/src/application/use-cases/auth/sign-out.use-case';
import { InputParseError } from '@/src/entities/errors/common';
import { Cookie } from '@/src/entities/models/cookie';

export async function signOutController(
  sessionId: string | undefined
): Promise<Cookie> {
  if (!sessionId) {
    throw new InputParseError('Must provide a session ID.');
  }

  const authenticationService = container.get('AuthenticationService');
  const { session } = await authenticationService.validateSession(sessionId);

  const { blankCookie } = await signOutUseCase(session.id);
  return blankCookie;
}
