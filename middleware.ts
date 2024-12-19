// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);

export async function middleware(req: NextRequest) {
  //   const { pathname } = req.nextUrl;
  //   const publicPaths = ["/signin", "/signup"];
  //   const authHeader = req.headers.get("authorization");
  //   if (publicPaths.includes(pathname)) {
  //     return NextResponse.next();
  //   }
  //   if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //     return NextResponse.redirect(new URL("/signin", req.url));
  //   }
  //   const token = authHeader.split(" ")[1];
  //   try {
  //     await jwtVerify(token, SECRET_KEY);
  //     return NextResponse.next();
  //   } catch (err) {
  //     console.error("JWT verification failed:", err);
  //     return NextResponse.redirect(new URL("/signin", req.url));
  //   }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)", // Apply middleware to all routes except static files and API routes
  ],
};
