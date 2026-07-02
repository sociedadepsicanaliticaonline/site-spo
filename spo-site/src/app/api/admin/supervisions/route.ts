import { withAuth } from "@/lib/api"
import { getSupabaseAdmin } from "@/lib/supabase"

export const dynamic = "force-dynamic"

interface DbSupervision {
  id: string
  supervisor_name: string
  date: string
  time: string
  frequency: string
  whatsapp: string
  description: string
  available: boolean
  created_at: string
}

export async function GET() {
  return withAuth(async () => {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from("supervisions")
      .select("*")
      .order("date", { ascending: true })
      .returns<DbSupervision[]>()
    if (error) throw error
    return data ?? []
  })
}

export async function POST(req: Request) {
  return withAuth(async () => {
    const body = await req.json()
    const supabase = getSupabaseAdmin()
    const id = body.id || `supervisao-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

    const row: Partial<DbSupervision> = {
      id,
      supervisor_name: body.supervisorName,
      date: body.date,
      time: body.time,
      frequency: body.frequency,
      whatsapp: body.whatsapp,
      description: body.description ?? "",
      available: body.available ?? true,
      created_at: body.createdAt ?? new Date().toISOString().split("T")[0],
    }

    const { error } = await supabase.from("supervisions").upsert(row).select().single()
    if (error) throw error
    return row
  })
}
