'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerAction } from 'zsa';

import { loginUserSchema } from '@/entities/user';
import { lucia } from '@/lib/auth';
import { loginUser } from '@/use-cases/users';

export const loginUserAction = createServerAction()
  .input(loginUserSchema)
  .handler(async ({ input }) => {
    clearSessionCookie();

    const user = await loginUser(input);
    await createAndSetUserCookie(user.id);

    const redirectTo = getRedirectTo();
    redirect(redirectTo);
  });

function getRedirectTo() {
  const referer = headers().get('referer');

  if (referer) {
    const refererUrl = new URL(referer);
    if (refererUrl.pathname !== '/login')
      return `${refererUrl.pathname}${refererUrl.search}`;
  }

  return '/';
}

async function createAndSetUserCookie(userId: string) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

function clearSessionCookie() {
  const session = lucia.createBlankSessionCookie();
  cookies().set(session.name, session.value, session.attributes);
}
