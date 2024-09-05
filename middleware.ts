import { verifyRequestOrigin } from 'lucia';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { SESSION_COOKIE } from './config';

const homePath = '/';
const unauthenticatedPaths = ['/login', '/verify-code'];

export default function middleware(req: NextRequest) {
  const originHeader = req.headers.get('Origin');
  const hostHeader = req.headers.get('Host');
  if (
    req.method !== 'GET' &&
    (!originHeader ||
      !hostHeader ||
      !verifyRequestOrigin(originHeader, [hostHeader]))
  ) {
    return new NextResponse(null, {
      status: 403,
    });
  }

  // We only do an optimistic check for the session cookie here. The actual one is done in DAL.
  const sessionId = cookies().get(SESSION_COOKIE)?.value ?? null;

  const isAuthenticatedPath =
    unauthenticatedPaths.every(
      path => !req.nextUrl.pathname.startsWith(path)
    ) && req.nextUrl.pathname !== homePath;

  // Used when validateCurrentSession detected an invalid session
  const isUnauthenticatedForced =
    (unauthenticatedPaths.some(path => req.nextUrl.pathname.startsWith(path)) ||
      req.nextUrl.pathname === homePath) &&
    req.nextUrl.searchParams.has('invalidSession');

  if (!sessionId && isAuthenticatedPath) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (sessionId && !isAuthenticatedPath && !isUnauthenticatedForced) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
