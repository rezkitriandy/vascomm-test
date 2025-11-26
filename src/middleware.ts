import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/dashboard')) {
    const userCookie = request.cookies.get('currentUser');

    if (!userCookie) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
      const user = JSON.parse(userCookie.value);

      if (!user.isAdmin) {
        return NextResponse.redirect(new URL('/403', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
