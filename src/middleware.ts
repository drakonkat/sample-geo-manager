import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const sessionId = request.cookies.get("session_id")?.value;
  const pathname = request.nextUrl.pathname;

  const publicPaths = ["/login", "/register", "/api/auth"];
  const isPublic = publicPaths.some((p) => pathname.startsWith(p));
  const isStatic =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/uploads") ||
    pathname.includes(".");

  if (isStatic) return NextResponse.next();

  if (!sessionId && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (sessionId && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
