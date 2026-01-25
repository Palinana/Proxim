import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
    // const { pathname } = req.nextUrl;

    // if (pathname === "/" || pathname === "/index") {
    //     return NextResponse.next();
    // }

    // const token = await getToken({
    //     req,
    //     secret: process.env.NEXTAUTH_SECRET,
    // });

    // if (!token) {
    //     return NextResponse.redirect(new URL("/", req.url));
    // }

    // const role = token.role;
    

    // if (pathname.startsWith("/admin")) {
    //     if (role !== "admin" && role !== "superadmin") {
    //         return NextResponse.redirect(new URL("/", req.url));
    //     }
    // }

    // if (pathname.startsWith("/superadmin")) {
    //     if (role !== "superadmin") {
    //         return NextResponse.redirect(new URL("/", req.url));
    //     }
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
