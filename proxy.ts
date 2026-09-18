import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtUtils } from "./utils/jwt";

const AUTH_ROUTES = [
  "/auth",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

const PROTECTED_ROUTES = [
  "/dashboard",
  "/dashboard/admin",
  "/dashboard/technician",
  "/dashboard/customer",
  "/profile",
  "/settings",
  "/orders",
  "/account",
];

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const accessToken = request.cookies.get("accessToken")?.value;

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  // const decodedAccessToken = accessToken
  //   ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
  //   : null;

  // let userRole = null;
  // if (decodedAccessToken) {
  //   userRole = (decodedAccessToken as { role?: string }).role;
  // }

  let userRole = null;
  if (accessToken) {
    try {
      const decodedAccessToken = jwtUtils.verifyToken(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string,
      );

      if (decodedAccessToken) {
        userRole = (decodedAccessToken as { role?: string }).role;
      }
    } catch (error) {
      console.error("JWT verification failed:", error);

      const response = NextResponse.redirect(
        new URL("/auth/login", request.url),
      );

      response.cookies.delete("accessToken");

      return response;
    }
  }

  console.log("proxy file", userRole);


  if (accessToken && isAuthRoute) {
    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }

    if (userRole === "TECHNICIAN") {
      return NextResponse.redirect(
        new URL("/dashboard/technician", request.url),
      );
    }

    if (userRole === "CUSTOMER" || userRole === "USER") {
      return NextResponse.redirect(new URL("/dashboard/customer", request.url));
    }
  }

  if (pathname.startsWith("/dashboard")) {
    // Customer dashboard
    if (
      pathname.startsWith("/dashboard/customer") &&
      userRole !== "CUSTOMER") {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }

    // Technician dashboard
    if (
      pathname.startsWith("/dashboard/technician") &&
      userRole !== "TECHNICIAN"
    ) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }

    // Admin dashboard
    if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }

    if (pathname === "/dashboard") {
      if (userRole === "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard/admin", request.url));
      }

      if (userRole === "TECHNICIAN") {
        return NextResponse.redirect(
          new URL("/dashboard/technician", request.url),
        );
      }

      if (userRole === "CUSTOMER" || userRole === "USER") {
        return NextResponse.redirect(
          new URL("/dashboard/customer", request.url),
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};
