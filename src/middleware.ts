import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Paths that require auth
const protectedRoutes = ['/portfolio','/portfolio/my-portfolios','/portfolio/:path*'];
const isProtected = (pathname: string) => {
  // Exact matches
  if (protectedRoutes.includes(pathname)) return true;

  // Match dynamic portfolio routes like /portfolio/:id or /portfolio/:id/*
  if (/^\/portfolio\/[^\/]+(\/.*)?$/.test(pathname)) return true;

  return false;
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;

  // If accessing a protected route without token, redirect to /login
  if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname); // optional: return URL
    return NextResponse.redirect(loginUrl);
  }

  // Otherwise, continue
  return NextResponse.next();
}
