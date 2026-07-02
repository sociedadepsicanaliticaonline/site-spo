import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export class ApiError extends Error {
  constructor(
    public status: number,
    public override message: string
  ) {
    super(message)
  }
}

export function apiError(status: number, message: string) {
  return NextResponse.json({ error: message }, { status })
}

export async function requireAdmin() {
  const session = await auth()
  if (!session?.user) {
    throw new ApiError(401, "Não autenticado")
  }
  return {
    id: (session.user as { id?: string }).id ?? "",
    role: (session.user as { role?: "admin" | "superadmin" }).role ?? "admin",
  }
}

export async function withAuth<T>(
  handler: (user: { id: string; role: "admin" | "superadmin" }) => Promise<T>
) {
  try {
    const user = await requireAdmin()
    const result = await handler(user)
    return NextResponse.json(result)
  } catch (err) {
    if (err instanceof ApiError) {
      return apiError(err.status, err.message)
    }
    console.error("[api]", err)
    const message =
      err instanceof Error ? err.message : "Erro interno do servidor"
    return apiError(500, message)
  }
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
