import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { authConfig } from "@/auth.config"
import { getSupabaseAdmin } from "@/lib/supabase"

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

interface DbUser {
  id: string
  name: string
  email: string
  password_hash: string
  role: "admin" | "superadmin"
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials)
        if (!parsed.success) return null

        const { email, password } = parsed.data
        try {
          const supabase = getSupabaseAdmin()
          const { data: user } = await supabase
            .from("users")
            .select("*")
            .eq("email", email.toLowerCase())
            .maybeSingle()

          if (!user) return null

          const userRow = user as DbUser
          const ok = await bcrypt.compare(password, userRow.password_hash)
          if (!ok) return null

          return {
            id: userRow.id,
            name: userRow.name,
            email: userRow.email,
            role: userRow.role,
          }
        } catch (err) {
          console.error("[auth:authorize]", err)
          return null
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as { id: string }).id
        token.role = (user as { role: "admin" | "superadmin" }).role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },
  },
})
