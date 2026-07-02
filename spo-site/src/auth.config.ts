import type { NextAuthConfig } from "next-auth"

export const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl
      const isAdminPath = pathname.startsWith("/admin")
      const isPublicAdminPath =
        pathname === "/admin/login" || pathname.startsWith("/admin/login/")
      if (!isAdminPath || isPublicAdminPath) return true
      return !!auth
    },
  },
}
