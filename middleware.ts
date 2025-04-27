// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Extract locale from the path
  const pathSegments = pathname.split("/").filter(Boolean);
  const locale = pathSegments[0] || "ro";

  // Define your supported locales
  const supportedLocales = ["ro", "ru", "en"]; // Add all your supported locales

  // Check if the extracted locale is valid
  const isValidLocale = supportedLocales.includes(locale);

  // Set headers to pass locale information
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  requestHeaders.set("x-locale", isValidLocale ? locale : "ro");

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    // Skip all API routes
    // Skip all static files
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
