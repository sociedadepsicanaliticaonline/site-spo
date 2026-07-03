import { withAuth } from "@/lib/api"
import { getSupabaseAdmin } from "@/lib/supabase"

export const dynamic = "force-dynamic"

interface DbEvent {
  id: string
  title: string
  slug: string
  description: string
  long_description: string
  date: string
  time: string
  location: string
  kind: "evento" | "programacao"
  type: "online" | "presencial" | "hibrido"
  image: string
  price: number | null
  available: boolean
  featured: boolean
}

export async function GET() {
  return withAuth(async () => {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: false })
    if (error) throw error

    return (data ?? []).map((item: Record<string, unknown>) => ({
      ...item,
      longDescription: item.long_description ?? "",
      long_description: undefined,
    }))
  })
}

export async function POST(req: Request) {
  return withAuth(async () => {
    const body = await req.json()
    const supabase = getSupabaseAdmin()
    const id = body.id || `evento-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

    const row: Partial<DbEvent> = {
      id,
      title: body.title,
      slug: body.slug,
      description: body.description,
      long_description: body.longDescription ?? "",
      date: body.date,
      time: body.time,
      location: body.location,
      kind: body.kind,
      type: body.type,
      image: body.image ?? "",
      price: body.price != null ? Number(body.price) : null,
      available: body.available ?? true,
      featured: body.featured ?? false,
    }

    const { error: upsertErr } = await supabase
      .from("events")
      .upsert(row)
      .select()
      .single()
    if (upsertErr) throw upsertErr

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single()
    if (error) throw error
    return {
      ...data,
      longDescription: (data as Record<string, unknown>).long_description ?? "",
      long_description: undefined,
    }
  });
}
