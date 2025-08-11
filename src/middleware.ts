import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { config } from '../config/config';
import { CloudCog } from 'lucide-react';

// Paths that require auth
const protectedRoutes = ['/portfolio','/portfolio/my-portfolios','/portfolio/:path*'];
 const tickerRoutes = /^\/(chart|summary|financials|history|statistics)\/([^\/]+)$/;
 

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
  const token = request.cookies.get('accessToken')?.value; 
  let isAuthenticated = false
  let isValid = false
  if (token) {
    const res = await fetch( `${config.BASE_URL}auth-verify/`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
     
    if (res.ok) isAuthenticated = true
     
  } 
   const match = pathname.match(tickerRoutes);
  if (match) {
    const symbol = match[2]; // Extracted symbol

    const res1 = await fetch(`${config.BASE_URL}verify-ticker/${symbol}`);
    console.log(res1)
    if (!res1.ok) {
       return NextResponse.redirect(new URL('/404-no-such-stock', request.url)); 
    }
  }

  if (protectedRoutes.includes(request.nextUrl.pathname)   && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname); // optional: return URL
    return NextResponse.redirect(loginUrl);
  }

  // Otherwise, continue
  return NextResponse.next();
}
