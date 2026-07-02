import NextAuth from "next-auth"
import { authConfig } from "@/auth.config"

const { auth } = NextAuth(authConfig)

const PUBLIC_ADMIN_PATHS = ["/admin/login"]

export default auth((req) => {
  const { pathname } = req.nextUrl

  const isAdminPath = pathname.startsWith("/admin")
  const isPublicAdminPath = PUBLIC_ADMIN_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  )

  if (!isAdminPath || isPublicAdminPath) {
    return undefined
  }

  if (!req.auth) {
    const loginUrl = new URL("/admin/login", req.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return Response.redirect(loginUrl)
  }

  return undefined
})

export const config = {
  matcher: ["/admin/:path*"],
}
