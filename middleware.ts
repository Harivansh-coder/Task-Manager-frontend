// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const publicPaths = ["/signin", "/signup"];
  const accessToken = req.cookies.get("accessToken");

  // Handle invalid or undefined access token
  if (!accessToken || !accessToken.value || accessToken.value === "undefined") {
    // Allow access to public paths if the user is not signed in
    if (publicPaths.includes(pathname)) {
      return NextResponse.next();
    }
    // Redirect non-authenticated users to the sign-in page
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // Verify JWT
  try {
    await jwtVerify(accessToken.value, SECRET_KEY);

    // Prevent signed-in users from accessing sign-in or sign-up pages
    if (publicPaths.includes(pathname)) {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect to the home page or dashboard
    }

    return NextResponse.next(); // Allow access to protected routes
  } catch (err) {
    console.error("JWT verification failed:", err);

    // Redirect to sign-in if JWT is invalid
    return NextResponse.redirect(new URL("/signin", req.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)", // Apply middleware to all routes except static files and API routes
  ],
};
