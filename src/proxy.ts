import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "ta"];
const defaultLocale = "en";

function getLocale(): string {
  // Always default to 'en' as requested, ignoring browser accept-language
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already starts with a supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    return;
  }

  // Redirect to localized path
  const locale = getLocale();
  const redirectUrl = new URL(`/${locale}${pathname}${request.nextUrl.search}`, request.url);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next), API routes, and static assets
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.ico|.*\\.txt|.*\\.json).*)",
  ],
};
