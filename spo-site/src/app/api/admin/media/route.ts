import { NextResponse } from "next/server"
import { requireAdmin, ApiError, apiError } from "@/lib/api"
import { getSupabaseAdmin } from "@/lib/supabase"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    await requireAdmin()

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from("media")
      .select("*")
      .order("uploaded_at", { ascending: false })

    if (error) {
      console.error("[media/list] db error:", error)
      return apiError(500, "Erro ao listar mídia")
    }

    const items = (data ?? []).map((item: Record<string, unknown>) => ({
      id: item.id,
      name: item.name,
      type: item.type,
      mimeType: item.mime_type,
      size: item.size,
      url: item.url,
      uploadedAt: item.uploaded_at,
    }))

    return NextResponse.json(items)
  } catch (err) {
    if (err instanceof ApiError) {
      return apiError(err.status, err.message)
    }
    console.error("[media/list]", err)
    return apiError(500, "Erro interno do servidor")
  }
}
