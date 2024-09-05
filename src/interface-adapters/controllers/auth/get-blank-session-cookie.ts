import { container } from '@/di';
import { Cookie } from '@/src/entities/models/cookie';

export async function getBlankSessionCookieController(): Promise<Cookie> {
  const authenticationService = container.get('AuthenticationService');

  return authenticationService.getBlankSessionCookie();
}
