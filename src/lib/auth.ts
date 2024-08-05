import { cache } from 'react';

import { Lucia } from 'lucia';
import type { Session, User } from 'lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { authAdapter } from '@/db';
import { UnauthorizedError } from '@/errors/unauthorized-error';

import { luciaSessionCookieName } from './auth.config';

export const lucia = new Lucia(authAdapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
    name: luciaSessionCookieName,
  },
  getUserAttributes: (attributes) => ({
    id: attributes.id,
    name: attributes.name,
    email: attributes.email,
  }),
});

interface DatabaseUserAttributes {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

async function validateRequestUncached(): Promise<
  { user: User; session: Session } | { user: null; session: null }
> {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);
  // next.js throws when you attempt to set cookie when rendering page
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    // eslint-disable-next-line no-empty
  } catch {}

  return result;
}

export const validateRequest = cache(validateRequestUncached);

export const protectPage = cache(async () => {
  const { user } = await validateRequest();

  if (!user) {
    redirect('/login?unauthenticated');
  }
});

export async function validateDataAccessAuth() {
  const { user } = await validateRequestUncached();

  if (!user) {
    throw UnauthorizedError;
  }

  return user;
}
