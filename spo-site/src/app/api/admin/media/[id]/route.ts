import { NextResponse } from "next/server"
import { requireAdmin, ApiError, apiError } from "@/lib/api"
import { getSupabaseAdmin } from "@/lib/supabase"
import { deleteFile } from "@/lib/storage"

export const dynamic = "force-dynamic"

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin()
    const { id } = await params

    const supabase = getSupabaseAdmin()

    const { data: existing, error: findError } = await supabase
      .from("media")
      .select("url")
      .eq("id", id)
      .maybeSingle()

    if (findError) {
      console.error("[media/delete] find error:", findError)
      return apiError(500, "Erro ao buscar arquivo")
    }

    if (!existing) {
      return apiError(404, "Arquivo não encontrado")
    }

    const { error: deleteError } = await supabase
      .from("media")
      .delete()
      .eq("id", id)

    if (deleteError) {
      console.error("[media/delete] db error:", deleteError)
      return apiError(500, "Erro ao excluir do banco de dados")
    }

    const url = existing.url as string
    const filename = url.split("/").pop() ?? ""
    if (filename) {
      await deleteFile(filename)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof ApiError) {
      return apiError(err.status, err.message)
    }
    console.error("[media/delete]", err)
    return apiError(500, "Erro interno do servidor")
  }
}
