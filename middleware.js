import { NextResponse } from "next/server";

export function middleware(req) {
    const { pathname } = req.nextUrl;

    /// allow public routes
    if (pathname === "/" || pathname === "/index") {
        return NextResponse.next();
    }

    // check auth cookie
    const token =
        req.cookies.get("next-auth.session-token")?.value ||
        req.cookies.get("__Secure-next-auth.session-token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // if not logged in, redirect to home
    if (!token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // role cookie (set from your app after login)
    const role = req.cookies.get("role")?.value;

    // Admin routes
    if (pathname.startsWith("/admin")) {
        if (role !== "admin" && role !== "superadmin") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    // Superadmin routes
    if (pathname.startsWith("/superadmin")) {
        if (role !== "superadmin") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
      "/((?!_next/static|_next/image|favicon.ico|api/auth).*)",
    ],
};