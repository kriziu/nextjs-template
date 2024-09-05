import { Lucia } from 'lucia';

import { SESSION_COOKIE } from '@/config';
import { authAdapter } from '@/drizzle';
import { env } from '@/env';
import { IUsersRepository } from '@/src/application/repositories/users.repository.interface';
import { IAuthenticationService } from '@/src/application/services/authentication.service.interface';
import { UnauthenticatedError } from '@/src/entities/errors/auth';
import { Cookie } from '@/src/entities/models/cookie';
import { Session, sessionSchema } from '@/src/entities/models/session';
import { User } from '@/src/entities/models/user';

export class AuthenticationService implements IAuthenticationService {
  private _lucia: Lucia;

  constructor(private _usersRepository: IUsersRepository) {
    this._lucia = new Lucia(authAdapter, {
      sessionCookie: {
        name: SESSION_COOKIE,
        expires: false,
        attributes: {
          secure: env.NODE_ENV === 'production',
        },
      },
      getUserAttributes: attributes => ({
        id: attributes.id,
        name: attributes.name,
        email: attributes.email,
        emailVerified: attributes.emailVerified,
      }),
    });
  }

  async getAllSessions(): Promise<Session[]> {
    return [];
  }

  async validateSession(
    sessionId: string | undefined
  ): Promise<{ user: User; session: Session }> {
    if (!sessionId) {
      throw new UnauthenticatedError('No session.');
    }

    const result = await this._lucia.validateSession(sessionId);

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
    const luciaSession = await this._lucia.createSession(user.id, {});

    const session = sessionSchema.parse(luciaSession);
    const cookie = this._lucia.createSessionCookie(session.id);

    return { session, cookie };
  }

  async invalidateSession(sessionId: string): Promise<{ blankCookie: Cookie }> {
    await this._lucia.invalidateSession(sessionId);

    const blankCookie = this._lucia.createBlankSessionCookie();

    return { blankCookie };
  }

  async getBlankSessionCookie(): Promise<Cookie> {
    return this._lucia.createBlankSessionCookie();
  }
}

interface DatabaseUserAttributes {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
}

declare module 'lucia' {
  interface Register {
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}
