/** @format */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { getCurrentUser } from "./services/authService";

const SIGN_IN_URL = "/sign-in";

export async function proxy(request: NextRequest) {
  const token = await getCurrentUser();

  // Allow access to auth pages without token
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/sign-in") ||
    request.nextUrl.pathname.startsWith("/sign-up") ||
    request.nextUrl.pathname.startsWith("/forget-pass") ||
    request.nextUrl.pathname.startsWith("/reset-pass") ||
    request.nextUrl.pathname.startsWith("/verify-method") ||
    request.nextUrl.pathname.startsWith("/verify-otp");

  if (isAuthPage) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL(SIGN_IN_URL, request.url));
  }

  try {
    const decoded: any = jwtDecode(token);

    if (decoded?.role !== "ADMIN") {
      return NextResponse.redirect(new URL(SIGN_IN_URL, request.url));
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
