'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerAction } from 'zsa';

import { UnauthenticatedError } from '@/src/entities/errors/auth';
import { Cookie } from '@/src/entities/models/cookie';
import { generateVerificationCodeInputSchema } from '@/src/entities/schemas/auth/generate-verification-code.schemas';
import { validateVerificationCodeInputSchema } from '@/src/entities/schemas/auth/validate-verification-code.schemas';
import { generateVerificationCodeController } from '@/src/interface-adapters/controllers/auth/generate-verification-code.controller';
import { getBlankSessionCookieController } from '@/src/interface-adapters/controllers/auth/get-blank-session-cookie';
import { signOutController } from '@/src/interface-adapters/controllers/auth/sign-out.controller';
import { validateVerificationCodeController } from '@/src/interface-adapters/controllers/auth/validate-verification-code.controller';

import { getCurrentSessionId } from '../_lib/session';

export const generateVerificationCodeAction = createServerAction()
  .input(generateVerificationCodeInputSchema)
  .handler(async ({ input }) => {
    await clearSession();

    const { verifyToken, email } =
      await generateVerificationCodeController(input);
    redirect(`?token=${verifyToken}&email=${email}`);
  });

export const validateVerificationCodeAction = createServerAction()
  .input(validateVerificationCodeInputSchema)
  .handler(async ({ input }) => {
    await clearSession();

    const cookie = await validateVerificationCodeController(input);
    cookies().set(cookie.name, cookie.value, cookie.attributes);

    const redirectTo = getRedirectTo();
    redirect(redirectTo);
  });

function getRedirectTo() {
  // TODO: When we need redirection links, we'll need to implement this with redirecting query params in generateVerificationCodeAction
  // const referer = headers().get('referer');

  // if (referer) {
  //   const refererUrl = new URL(referer);
  //   if (refererUrl.pathname !== '/login')
  //     return `${refererUrl.pathname}${refererUrl.search}`;
  // }

  return '/dashboard';
}

async function clearSession() {
  const sessionId = getCurrentSessionId();
  if (!sessionId) return;

  let blankCookie: Cookie;
  try {
    blankCookie = await signOutController(sessionId);
  } catch (err) {
    if (err instanceof UnauthenticatedError) {
      blankCookie = await getBlankSessionCookieController();

      cookies().set(
        blankCookie.name,
        blankCookie.value,
        blankCookie.attributes
      );
      return;
    }

    throw err;
  }

  cookies().set(blankCookie.name, blankCookie.value, blankCookie.attributes);
}
