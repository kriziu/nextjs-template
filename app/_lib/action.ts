import { redirect } from 'next/navigation';
import { createServerActionProcedure } from 'zsa';

import { getCurrentSessionId } from './session';

export const withSessionProcesure = createServerActionProcedure().handler(
  async () => {
    const sessionId = getCurrentSessionId();
    if (!sessionId) {
      redirect('/login');
    }

    return { sessionId };
  }
);
