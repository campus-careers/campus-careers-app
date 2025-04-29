import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')?.value
    || request.cookies.get('__Secure-next-auth.session-token')?.value;

  const { pathname } = request.nextUrl;

  // Pages that should NOT require authentication
  const publicPaths = ['/', '/filter', '/company', '/setup', '/auth', '/favicon.ico'];

  const isPublic = publicPaths.some((path) => pathname.startsWith(path))
    || pathname.startsWith('/_next')
    || pathname.startsWith('/static');

  if (isPublic) {
    return NextResponse.next();
  }

  if (!token) {
    // If the page is protected but no token, redirect to login
    return NextResponse.redirect(new URL('/auth/signin', request.url));
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
    // Allow if profile check fails
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api).*)'], // ✅ Only match non-api routes
};
