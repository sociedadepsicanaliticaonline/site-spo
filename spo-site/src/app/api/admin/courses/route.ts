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
  instructor_name: string
  duration: string
  workload: string
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
    if (error) throw error

    return (data ?? []).map((item: Record<string, unknown>) => ({
      ...item,
      longDescription: item.long_description ?? "",
      createdAt: item.created_at ?? "",
      instructorName: item.instructor_name ?? "",
      long_description: undefined,
      created_at: undefined,
    }))
  })
}

export async function POST(req: Request) {
  return withAuth(async () => {
    const body = await req.json()
    const supabase = getSupabaseAdmin()
    const id = body.id || `curso-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

    const row: Partial<DbCourse> = {
      id,
      title: body.title,
      slug: body.slug,
      description: body.description,
      long_description: body.longDescription ?? "",
      price: body.price ?? 0,
      image: body.image ?? "",
      instructor_name: body.instructorName ?? "",
      duration: body.duration ?? "",
      workload: body.workload ?? "",
      featured: body.featured ?? false,
      available: body.available ?? true,
    }

    const { error: upsertErr } = await supabase
      .from("courses")
      .upsert(row)
      .select()
      .single()
    if (upsertErr) throw upsertErr

    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", id)
      .single()
    if (error || !data) throw error ?? new Error("Course not found")

    const result = data as unknown as Record<string, unknown>
    return {
      ...result,
      longDescription: result.long_description ?? "",
      createdAt: result.created_at ?? "",
      instructorName: result.instructor_name ?? "",
      long_description: undefined,
      created_at: undefined,
    }
  });
}
