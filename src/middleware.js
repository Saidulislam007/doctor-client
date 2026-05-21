import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // 1. Identify Private and Auth-specific paths
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAppointmentsRoute = pathname.startsWith("/appointments");
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");

  // 2. Safely grab session cookies handled by Better Auth
  // Better Auth defaults to "better-auth.session_token" or "__Secure-better-auth.session_token"
  const sessionCookie = 
    request.cookies.get("better-auth.session_token") || 
    request.cookies.get("__Secure-better-auth.session_token");

  // 3. User is attempting to access guarded components
  if (isDashboardRoute || isAppointmentsRoute) {
    if (!sessionCookie) {
      // Missing auth cookie entirely: Redirect straight to login page safely
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    // Cookie is present; proceed. This prevents user ejecting on hard refreshes.
    return NextResponse.next();
  }

  // 4. Authenticated user trying to access login/register pages
  if (isAuthRoute && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/appointments/:path*",
    "/login",
    "/register"
  ],
};