/** @format */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { getCurrentUser, getVerifiedStatus } from "./services/authService";

const SIGN_IN_URL = "/sign-in";

export async function middleware(request: NextRequest) {
  const token = await getCurrentUser();

  // Allow access to auth pages without token
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/sign-in") ||
    request.nextUrl.pathname.startsWith("/sign-up") ||
    request.nextUrl.pathname.startsWith("/forget-pass") ||
    request.nextUrl.pathname.startsWith("/reset-pass") ||
    request.nextUrl.pathname.startsWith("/verify-method") ||
    request.nextUrl.pathname.startsWith("/verify-otp");

  const isAccountSetupPage =
    request.nextUrl.pathname.startsWith("/account-setup");

  if (isAuthPage) {
    // If user is already logged in and tries to access auth pages, redirect to home
    if (token) {
      try {
        jwtDecode(token); // Verify token is valid
        return NextResponse.redirect(new URL("/", request.url));
      } catch {
        // Invalid token, allow access to auth page
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL(SIGN_IN_URL, request.url));
  }

  try {
    const decoded: any = jwtDecode(token);
    const isVerified = await getVerifiedStatus();

    // If user is not verified and not on account-setup page, redirect to account-setup
    if (!isVerified && !isAccountSetupPage) {
      return NextResponse.redirect(new URL("/account-setup", request.url));
    }

    // If user is verified and on account-setup page, redirect to dashboard
    if (isVerified && isAccountSetupPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL(SIGN_IN_URL, request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
