import { withAuth } from "@/lib/api"
import { getSupabaseAdmin } from "@/lib/supabase"

export const dynamic = "force-dynamic"

interface DbTestimonial {
  id: string
  name: string
  role: string
  avatar: string
  content: string
  rating: number | null
  featured: boolean
  created_at: string
}

export async function GET() {
  return withAuth(async () => {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false })
      .returns<DbTestimonial[]>()
    if (error) throw error
    return data ?? []
  })
}

export async function POST(req: Request) {
  return withAuth(async () => {
    const body = await req.json()
    const supabase = getSupabaseAdmin()
    const id = body.id || `testemunho-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

    const row: Partial<DbTestimonial> = {
      id,
      name: body.name,
      role: body.role,
      avatar: body.avatar ?? "",
      content: body.content,
      rating: body.rating ?? null,
      featured: body.featured ?? false,
      created_at: body.createdAt ?? new Date().toISOString().split("T")[0],
    }

    const { error } = await supabase.from("testimonials").upsert(row).select().single()
    if (error) throw error
    return row
  })
}
