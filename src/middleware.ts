import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files, API routes, and _next
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') // files with extensions
  ) {
    return NextResponse.next();
  }

  // Redirect /en and /en/* to canonical URLs (/ is the English version)
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const newPathname = pathname === '/en' ? '/' : pathname.replace(/^\/en/, '');
    const newUrl = new URL(newPathname || '/', request.url);
    return NextResponse.redirect(newUrl, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!_next|api|static|.*\\..*).*)',
  ],
};
