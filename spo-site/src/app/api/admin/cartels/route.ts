import { withAuth } from "@/lib/api"
import { getSupabaseAdmin } from "@/lib/supabase"

export const dynamic = "force-dynamic"

interface DbCartel {
  id: string
  name: string
  slug: string
  description: string
  meeting_day: string
  meeting_time: string
  frequency: string
  more_one_name: string
  more_one_whatsapp: string
  available: boolean
  created_at: string
}

export async function GET() {
  return withAuth(async () => {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from("cartells")
      .select("*")
      .order("created_at", { ascending: false })
      .returns<DbCartel[]>()
    if (error) throw error
    return data ?? []
  })
}

export async function POST(req: Request) {
  return withAuth(async () => {
    const body = await req.json()
    const supabase = getSupabaseAdmin()
    const id = body.id || `cartel-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

    const row: Partial<DbCartel> = {
      id,
      name: body.name,
      slug: body.slug,
      description: body.description ?? "",
      meeting_day: body.meetingDay,
      meeting_time: body.meetingTime,
      frequency: body.frequency,
      more_one_name: body.moreOneName,
      more_one_whatsapp: body.moreOneWhatsapp,
      available: body.available ?? true,
      created_at: body.createdAt ?? new Date().toISOString().split("T")[0],
    }

    const { error } = await supabase.from("cartells").upsert(row).select().single()
    if (error) throw error
    return row
  })
}
