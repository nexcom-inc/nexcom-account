import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"


export function middleware(request: NextRequest) {
  const token = request.cookies.get("connect.sid")
  const { pathname } = request.nextUrl
  // const user_role = request.cookies.get(VARIABLES.USER_ROLE)?.value ?? "User"

  

  if (pathname.startsWith("/auth/login")) {
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL(`/auth/login?next=${pathname}`, request.url))
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL("/home", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|nexcom-black.svg|nexcom-auth-illustration.svg|auth-background.jpg).*)",
  ],
}