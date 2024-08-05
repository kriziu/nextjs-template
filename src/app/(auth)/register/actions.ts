'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerAction } from 'zsa';

import { registerUserSchema } from '@/entities/user';
import { lucia } from '@/lib/auth';
import { registerUser } from '@/use-cases/users';

export const registerUserAction = createServerAction()
  .input(registerUserSchema)
  .handler(async ({ input }) => {
    clearSessionCookie();

    await registerUser(input);
    redirect('/login?registered');
  });

function clearSessionCookie() {
  const session = lucia.createBlankSessionCookie();
  cookies().set(session.name, session.value, session.attributes);
}
