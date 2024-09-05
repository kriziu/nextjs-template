import { Cookie } from '@/src/entities/models/cookie';
import { Session } from '@/src/entities/models/session';
import { User } from '@/src/entities/models/user';

export interface IAuthenticationService {
  getAllSessions(): Promise<Session[]>; // Used for testing
  validateSession(
    sessionId: Session['id'] | undefined
  ): Promise<{ user: User; session: Session }>;
  createSession(user: User): Promise<{ session: Session; cookie: Cookie }>;
  invalidateSession(sessionId: Session['id']): Promise<{ blankCookie: Cookie }>;
  getBlankSessionCookie(): Promise<Cookie>;
}
