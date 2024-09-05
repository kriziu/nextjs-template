import { cache } from 'react';

import { redirect } from 'next/navigation';

import { UnauthenticatedError } from '@/src/entities/errors/auth';
import { validateSessionController } from '@/src/interface-adapters/controllers/auth/validate-session.controller';

import { getCurrentSessionId } from '../_lib/session';

export const validateCurrentSession = cache(async () => {
  const sessionId = getCurrentSessionId();
  if (!sessionId) {
    return redirect('/login');
  }

  try {
    const { user, session } = await validateSessionController(sessionId);

    return { user, session };
  } catch (err) {
    if (err instanceof UnauthenticatedError) {
      return redirect('/login?invalidSession');
    }

    throw err;
  }
});
