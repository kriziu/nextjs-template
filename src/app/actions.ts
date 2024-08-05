'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerAction } from 'zsa';

import { lucia, validateRequest } from '@/lib/auth';

export const logoutAction = createServerAction().handler(async () => {
  const { session } = await validateRequest();
  if (!session) {
    clearCookies();
    redirect('/login');
  }

  await lucia.invalidateSession(session.id);

  clearCookies();
  redirect('/');
});

function clearCookies() {
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}
