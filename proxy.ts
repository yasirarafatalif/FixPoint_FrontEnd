import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getNewAccessToken } from "./service/refreshToken";
import { jwtUtils } from "./utils/jwt";

const AUTH_ROUTES = [
  "/auth/login",
  "/auth/register",
];

const PUBLIC_ROUTES = [
  "/",
  "/services",
  "/technicians",
  "/payment/success",
  "/payment/cancel",
];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const cookieStore = await cookies();

  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string
      )
    : null;

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
      )
    : null;

  // Access token expired but refresh token is valid
  if (
    !decodedAccessToken &&
    decodedRefreshToken
  ) {
    const result = await getNewAccessToken();

    if (result.success) {
      const newAccessToken = result.data.accessToken;

      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
        path: "/",
      });

      accessToken = newAccessToken;

      decodedAccessToken = jwtUtils.verifyToken(
        accessToken!,
        process.env.JWT_ACCESS_SECRET as string
      );
    }
  }

  let userRole = null;

  // Access token invalid / expired
  if (!decodedAccessToken) {
    cookieStore.delete("accessToken");
  }

  // Get role from access token
  if (
    decodedAccessToken &&
    typeof decodedAccessToken !== "string"
  ) {
    userRole = (decodedAccessToken as JwtPayload).role;
  }

  // Logged-in user trying to access login/register
  if (
    accessToken &&
    AUTH_ROUTES.some(
      (route) =>
        pathname === route ||
        pathname.startsWith(route + "/")
    )
  ) {
    if (userRole === "CUSTOMER") {
      return NextResponse.redirect(
        new URL("/dashboard/customer", request.url)
      );
    } else if (userRole === "TECHNICIAN") {
      return NextResponse.redirect(
        new URL("/dashboard/technician", request.url)
      );
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(
        new URL("/dashboard/admin", request.url)
      );
    } else {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(route + "/")
  );

  const isAuthRoute = AUTH_ROUTES.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(route + "/")
  );

  // Authentication protection
  if (
    !accessToken &&
    !isPublicRoute &&
    !isAuthRoute
  ) {
    return NextResponse.redirect(
      new URL(
        `/auth/login?redirect=${pathname}`,
        request.url
      )
    );
  }

  // Authorization : Role based access control

  // Customer dashboard
  if (
    pathname.startsWith("/dashboard/customer") &&
    userRole !== "CUSTOMER"
  ) {
    return NextResponse.redirect(
      new URL("/not-found", request.url)
    );
  }

  // Technician dashboard
  else if (
    pathname.startsWith("/dashboard/technician") &&
    userRole !== "TECHNICIAN"
  ) {
    return NextResponse.redirect(
      new URL("/not-found", request.url)
    );
  }

  // Admin dashboard
  else if (
    pathname.startsWith("/dashboard/admin") &&
    userRole !== "ADMIN"
  ) {
    return NextResponse.redirect(
      new URL("/not-found", request.url)
    );
  }

  // /dashboard directly visited
  if (pathname === "/dashboard") {
    if (userRole === "CUSTOMER") {
      return NextResponse.redirect(
        new URL("/dashboard/customer", request.url)
      );
    }

    if (userRole === "TECHNICIAN") {
      return NextResponse.redirect(
        new URL("/dashboard/technician", request.url)
      );
    }

    if (userRole === "ADMIN") {
      return NextResponse.redirect(
        new URL("/dashboard/admin", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)",
  ],
};