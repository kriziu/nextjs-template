import { SESSION_COOKIE } from '@/config';
import { type IUsersRepository } from '@/src/application/repositories/users.repository.interface';
import { IAuthenticationService } from '@/src/application/services/authentication.service.interface';
import { UnauthenticatedError } from '@/src/entities/errors/auth';
import { Cookie } from '@/src/entities/models/cookie';
import { Session, sessionSchema } from '@/src/entities/models/session';
import { User } from '@/src/entities/models/user';

export class MockAuthenticationService implements IAuthenticationService {
  private _sessions: Record<string, { session: Session; user: User }>;

  constructor(private _usersRepository: IUsersRepository) {
    this._sessions = {
      '1': {
        session: {
          id: '1',
          userId: '1',
          expiresAt: new Date(new Date().getTime() + 86400000 * 7), // 7 days
        },
        user: {
          id: '1',
          email: 'one@example.com',
          emailVerified: true,
        },
      },
    };
  }

  async getAllSessions(): Promise<Session[]> {
    return Object.values(this._sessions).map(session => session.session);
  }

  async validateSession(
    sessionId: string | undefined
  ): Promise<{ user: User; session: Session }> {
    if (!sessionId) {
      throw new UnauthenticatedError('No session.');
    }

    const result = this._sessions[sessionId] ?? { user: null, session: null };

    if (!result.user || !result.session) {
      throw new UnauthenticatedError('Unauthenticated.');
    }

    const user = await this._usersRepository.getUser(result.user.id);

    if (!user) {
      throw new UnauthenticatedError("User doesn't exist.");
    }
    if (!user.emailVerified) {
      throw new UnauthenticatedError('Email not verified.');
    }

    return { user, session: result.session };
  }

  async createSession(
    user: User
  ): Promise<{ session: Session; cookie: Cookie }> {
    const luciaSession: Session = {
      id: 'random_session_id',
      userId: user.id,
      expiresAt: new Date(new Date().getTime() + 86400000 * 7), // 7 days
    };
    const session = sessionSchema.parse(luciaSession);
    const cookie: Cookie = {
      name: SESSION_COOKIE,
      value: session.id + '_' + user.id,
      attributes: {},
    };

    this._sessions[session.id] = { session, user };

    return { session, cookie };
  }

  async invalidateSession(sessionId: string): Promise<{ blankCookie: Cookie }> {
    delete this._sessions[sessionId];
    const blankCookie: Cookie = {
      name: SESSION_COOKIE,
      value: '',
      attributes: {},
    };
    return Promise.resolve({ blankCookie });
  }

  async getBlankSessionCookie(): Promise<Cookie> {
    return {
      name: SESSION_COOKIE,
      value: '',
      attributes: {},
    };
  }
}
