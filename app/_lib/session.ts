import { cookies } from 'next/headers';

import { SESSION_COOKIE } from '@/config';

export function getCurrentSessionId() {
  return cookies().get(SESSION_COOKIE)?.value;
}
