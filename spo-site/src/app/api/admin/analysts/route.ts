import { withAuth } from "@/lib/api"
import { getSupabaseAdmin } from "@/lib/supabase"

export const dynamic = "force-dynamic"

interface DbAnalyst {
  id: string
  name: string
  state: string
  city: string
  whatsapp: string
  available: boolean
  created_at: string
}

export async function GET() {
  return withAuth(async () => {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from("analysts")
      .select("*")
      .order("name", { ascending: true })
      .returns<DbAnalyst[]>()
    if (error) throw error
    return data ?? []
  })
}

export async function POST(req: Request) {
  return withAuth(async () => {
    const body = await req.json()
    const supabase = getSupabaseAdmin()
    const id = body.id || `analista-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

    const row: Partial<DbAnalyst> = {
      id,
      name: body.name,
      state: body.state,
      city: body.city,
      whatsapp: body.whatsapp,
      available: body.available ?? true,
      created_at: body.createdAt ?? new Date().toISOString().split("T")[0],
    }

    const { error } = await supabase.from("analysts").upsert(row).select().single()
    if (error) throw error
    return row
  })
}
