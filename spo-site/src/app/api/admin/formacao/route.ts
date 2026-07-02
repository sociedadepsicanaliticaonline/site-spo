import { withAuth } from "@/lib/api"
import { getSupabaseAdmin } from "@/lib/supabase"

export const dynamic = "force-dynamic"

interface DbFormacaoContent {
  id: string
  key: string
  content: string
  updated_at: string
}

export async function GET() {
  return withAuth(async () => {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from("formacao_contents")
      .select("*")
      .returns<DbFormacaoContent[]>()
    if (error) throw error
    return data ?? []
  })
}

export async function POST(req: Request) {
  return withAuth(async () => {
    const body = await req.json()
    const supabase = getSupabaseAdmin()
    const id = body.id || `fc-${body.key}`

    const row: Partial<DbFormacaoContent> = {
      id,
      key: body.key,
      content: body.content,
      updated_at: new Date().toISOString(),
    }

    const { error } = await supabase
      .from("formacao_contents")
      .upsert(row, { onConflict: "key" })
      .select()
      .single()
    if (error) throw error
    return row
  })
}
