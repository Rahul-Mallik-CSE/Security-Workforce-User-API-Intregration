/** @format */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { getCurrentUser } from "./services/authService";

const SIGN_IN_URL = "/signin";

export async function proxy(request: NextRequest) {
  const token = await getCurrentUser();

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
  matcher: [
    "/",
    "/users",
    "/bookingList",
    "/uploadProduct",
    "/skinCondition",
    "/setting",
    "/court",
    "/cart",
    "/checkout",
    "/notifications",
    "/user-questions",
  ],
};
