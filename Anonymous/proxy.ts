import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
export {default} from "next-auth/middleware"

export async function proxy(req: NextRequest) {
  const token = await getToken({ req })
  const url = req.nextUrl.clone()

  // Allow unauthenticated access to auth pages
  if (!token) {
    if (
      url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/signup") ||
      url.pathname.startsWith("/verify")
    ) {
      return NextResponse.next()
    }
    // Redirect to sign-in only if trying to access protected pages
    return NextResponse.redirect(new URL("/sign-in", req.url))
  }

  // If user is authenticated and tries to access auth pages, redirect to home
  if (token && (
    url.pathname.startsWith("/sign-in") ||
    url.pathname.startsWith("/signup") ||
    url.pathname.startsWith("/verify")
  )) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/sign-in"
    ,"/signup","/dashboard:paths*","/verify/:paths*","/"
  ],
}