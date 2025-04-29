import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')?.value
    || request.cookies.get('__Secure-next-auth.session-token')?.value;

  const { pathname } = request.nextUrl;

  const isSetupPage = pathname === '/setup';
  const isApiRoute = pathname.startsWith('/api');
  const isAuthRoute = pathname.startsWith('/auth'); // ✅ Allow auth pages

  if (!token || isApiRoute || isSetupPage || isAuthRoute) {
    return NextResponse.next();
  }

  const baseUrl = request.nextUrl.origin;

  try {
    const profileCheck = await fetch(
      `${baseUrl}/api/user/check-profile`,
      {
        headers: {
          cookie: request.headers.get('cookie') || '',
        },
      },
    );

    if (!profileCheck.ok) {
      throw new Error('Failed to fetch profile check');
    }

    const { hasProfile } = await profileCheck.json();

    if (!hasProfile) {
      return NextResponse.redirect(new URL('/setup', request.url));
    }
  } catch (error) {
    console.error('Middleware error (profile check):', error);
    // Continue normally if error happens
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next|static|favicon.ico|setup|auth).*)',
  ],
};
