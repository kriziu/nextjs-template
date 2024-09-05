import { container } from '@/di';
import { Cookie } from '@/src/entities/models/cookie';

export function signOutUseCase(
  sessionId: string
): Promise<{ blankCookie: Cookie }> {
  const authenticationService = container.get('AuthenticationService');

  return authenticationService.invalidateSession(sessionId);
}
