'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { UnauthenticatedError } from '@/src/entities/errors/auth';
import { Cookie } from '@/src/entities/models/cookie';
import { getBlankSessionCookieController } from '@/src/interface-adapters/controllers/auth/get-blank-session-cookie';
import { signOutController } from '@/src/interface-adapters/controllers/auth/sign-out.controller';

import { withSessionProcesure } from '../_lib/action';

export const logoutAction = withSessionProcesure
  .createServerAction()
  .handler(async ({ ctx }) => {
    let blankCookie: Cookie;
    try {
      blankCookie = await signOutController(ctx.sessionId);
    } catch (err) {
      if (err instanceof UnauthenticatedError) {
        blankCookie = await getBlankSessionCookieController();

        cookies().set(
          blankCookie.name,
          blankCookie.value,
          blankCookie.attributes
        );
        redirect('/login');
      }

      throw err;
    }

    cookies().set(blankCookie.name, blankCookie.value, blankCookie.attributes);
    redirect('/login');
  });
