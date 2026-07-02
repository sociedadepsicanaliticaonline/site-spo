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
  category_id: string
}

export async function GET() {
  return withAuth(async () => {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: false })
      .returns<DbEvent[]>()
    if (error) throw error
    return data ?? []
  })
}

export async function POST(req: Request) {
  return withAuth(async () => {
    const body = await req.json()
    const supabase = getSupabaseAdmin()
    const id = body.id || `evento-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    const tags: Array<{ id: string }> = Array.isArray(body.tags) ? body.tags : []

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
      price: body.price ?? null,
      available: body.available ?? true,
      featured: body.featured ?? false,
      category_id: body.category?.id ?? body.category_id,
    }

    const { error: upsertErr } = await supabase
      .from("events")
      .upsert(row)
      .select()
      .single()
    if (upsertErr) throw upsertErr

    await supabase.from("event_tags").delete().eq("event_id", id)
    if (tags.length > 0) {
      const { error: tagsErr } = await supabase
        .from("event_tags")
        .insert(tags.map((t) => ({ event_id: id, tag_id: t.id })))
      if (tagsErr) throw tagsErr
    }

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single()
      .returns<DbEvent>()
    if (error) throw error
    return data
  });
}
