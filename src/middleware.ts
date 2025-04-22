import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')?.value
    || request.cookies.get('__Secure-next-auth.session-token')?.value;

  const isSetupPage = request.nextUrl.pathname === '/setup';
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');

  if (!token || isApiRoute || isSetupPage) {
    return NextResponse.next();
  }

  const profileCheck = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/check-profile`,
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
     */
    '/((?!api|_next|static|favicon.ico|setup).*)',
  ],
};
