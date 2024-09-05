import { container } from '@/di';
import { Session } from '@/src/entities/models/session';
import { User } from '@/src/entities/models/user';

export async function validateSessionController(
  sessionId: string | undefined
): Promise<{ user: User; session: Session }> {
  const authenticationService = container.get('AuthenticationService');
  const { user, session } =
    await authenticationService.validateSession(sessionId);

  return { user, session };
}
