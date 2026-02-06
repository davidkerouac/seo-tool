import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n/config';

function getLocale(request: NextRequest): string {
  // Check if locale is in cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale as typeof locales[number])) {
    return cookieLocale;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim().substring(0, 2))
      .find((lang) => locales.includes(lang as typeof locales[number]));

    if (preferredLocale) {
      return preferredLocale;
    }
  }

  return defaultLocale;
}

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

  // Redirect /en to / (canonical - avoid duplicate content)
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const newPathname = pathname === '/en' ? '/' : pathname.replace(/^\/en/, '');
    const newUrl = new URL(newPathname || '/', request.url);
    return NextResponse.redirect(newUrl, { status: 301 });
  }

  // Only redirect the homepage to a locale-prefixed path.
  if (pathname !== '/') {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}`, request.url);

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!_next|api|static|.*\\..*).*)',
  ],
};
