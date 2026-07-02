import { withAuth } from "@/lib/api"
import { getSupabaseAdmin } from "@/lib/supabase"

export const dynamic = "force-dynamic"

interface DbCourse {
  id: string
  title: string
  slug: string
  description: string
  long_description: string
  price: number
  image: string
  category_id: string
  instructor_id: string
  duration: string
  workload: string
  level: string
  featured: boolean
  available: boolean
  created_at: string
}

export async function GET() {
  return withAuth(async () => {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false })
      .returns<DbCourse[]>()
    if (error) throw error
    return data ?? []
  })
}

export async function POST(req: Request) {
  return withAuth(async () => {
    const body = await req.json()
    const supabase = getSupabaseAdmin()
    const id = body.id || `curso-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    const tags: Array<{ id: string }> = Array.isArray(body.tags) ? body.tags : []

    const row: Partial<DbCourse> = {
      id,
      title: body.title,
      slug: body.slug,
      description: body.description,
      long_description: body.longDescription ?? "",
      price: body.price ?? 0,
      image: body.image ?? "",
      category_id: body.category?.id ?? body.category_id,
      instructor_id: body.instructor?.id ?? body.instructor_id,
      duration: body.duration ?? "",
      workload: body.workload ?? "",
      level: body.level ?? "intermediário",
      featured: body.featured ?? false,
      available: body.available ?? true,
    }

    const { error: upsertErr } = await supabase
      .from("courses")
      .upsert(row)
      .select()
      .single()
    if (upsertErr) throw upsertErr

    await supabase.from("course_tags").delete().eq("course_id", id)
    if (tags.length > 0) {
      const { error: tagsErr } = await supabase
        .from("course_tags")
        .insert(tags.map((t) => ({ course_id: id, tag_id: t.id })))
      if (tagsErr) throw tagsErr
    }

    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", id)
      .single()
      .returns<DbCourse>()
    if (error) throw error
    return data
  });
}
