import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')?.value
    || request.cookies.get('__Secure-next-auth.session-token')?.value;

  const { pathname } = request.nextUrl;

  const isSetupPage = pathname === '/setup';
  const isApiRoute = pathname.startsWith('/api');
  const isAuthRoute = pathname.startsWith('/auth'); // ✅ NEW: allow /auth paths

  if (!token || isApiRoute || isSetupPage || isAuthRoute) {
    return NextResponse.next();
  }

  const baseUrl = request.nextUrl.origin;

  const profileCheck = await fetch(
    `${baseUrl}/api/user/check-profile`,
    {
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    },
  );

  const { hasProfile } = await profileCheck.json();

  if (!hasProfile) {
    return NextResponse.redirect(new URL('/setup', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - /api (API routes)
     * - /_next (Next.js internals)
     * - /static
     * - /favicon.ico
     * - /setup (the profile form)
     * - /auth (login and logout)
     */
    '/((?!api|_next|static|favicon.ico|setup|auth).*)',
  ],
};
