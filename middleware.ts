import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|.*\\.(?:png|jpg|jpeg|gif|svg|webp)$).*)",
  ],
};

const protectedRoutes = ["/dashboard", "/downline", "/direct-members", "/about-us"];
const unProtectedRoutes = ["/about-us", "/pricing", "/secret-page101"]

export async function middleware(request: NextRequest) {
  console.log("Reached middlewware");

  try {
    const { pathname } = request.nextUrl;

    const isUnprotectedRoute = unProtectedRoutes.some((route) => pathname.startsWith(route));

    if (isUnprotectedRoute) {
      return NextResponse.next();
    }

    if (
      pathname === "/" ||
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api")
    ) {
      console.log("Sent forward for: ", pathname);
      return NextResponse.next();
    }

    console.log("Reached here 3");

    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    const token = request.cookies.get("auth_token")?.value;

    console.log("Printed cookie in middleware: ", token);

    if (!token) {
      if (pathname.startsWith("/auth")) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (isProtectedRoute && !token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    let decodedToken: any;
    try {
      decodedToken = jwt.decode(token);
    } catch (error) {
      console.error("Invalid token:", error);
      const response = NextResponse.redirect(
        new URL("/auth/login", request.url)
      );
      request.cookies.delete("auth_token");
      return response;
    }

    console.log("Here in middleware: ", decodedToken?.role);

    if (decodedToken?.role === Role.SETUP_PENDING) {
      if (pathname === "/auth/setup") {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/auth/setup", request.url));
    }

    if (decodedToken?.role === Role.PAYMENT_PENDING) {
      if (pathname === "/auth/payment") {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/auth/payment", request.url));
    }

    if (pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}
