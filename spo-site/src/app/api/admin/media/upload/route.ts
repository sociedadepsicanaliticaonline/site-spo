import { NextResponse } from "next/server"
import { requireAdmin, ApiError, apiError, generateId } from "@/lib/api"
import { getSupabaseAdmin } from "@/lib/supabase"
import { saveFile, deleteFile } from "@/lib/storage"

export const dynamic = "force-dynamic"

const MAX_IMAGE_SIZE = 2 * 1024 * 1024
const MAX_PDF_SIZE = 3 * 1024 * 1024

export async function POST(req: Request) {
  try {
    await requireAdmin()

    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return apiError(400, "Nenhum arquivo enviado")
    }

    const isImage = file.type.startsWith("image/")
    const isPdf = file.type === "application/pdf"

    if (!isImage && !isPdf) {
      return apiError(400, "Tipo de arquivo não suportado. Use imagens ou PDFs.")
    }

    if (isImage && file.size > MAX_IMAGE_SIZE) {
      return apiError(400, `Imagem muito grande (máx. ${MAX_IMAGE_SIZE / 1024 / 1024}MB).`)
    }
    if (isPdf && file.size > MAX_PDF_SIZE) {
      return apiError(400, `PDF muito grande (máx. ${MAX_PDF_SIZE / 1024 / 1024}MB).`)
    }

    const buffer = await file.arrayBuffer()
    const { url, filename } = await saveFile(buffer, file.name, file.type)

    const id = generateId()
    const supabase = getSupabaseAdmin()
    const { error: dbError } = await supabase.from("media").insert({
      id,
      name: file.name,
      type: isImage ? "image" : "pdf",
      mime_type: file.type,
      size: file.size,
      url,
      uploaded_at: new Date().toISOString(),
    })

    if (dbError) {
      await deleteFile(filename)
      console.error("[media/upload] db error:", dbError)
      return apiError(500, "Erro ao salvar no banco de dados")
    }

    return NextResponse.json({
      id,
      name: file.name,
      type: isImage ? "image" : "pdf",
      mimeType: file.type,
      size: file.size,
      url,
      uploadedAt: new Date().toISOString(),
    })
  } catch (err) {
    if (err instanceof ApiError) {
      return apiError(err.status, err.message)
    }
    console.error("[media/upload]", err)
    return apiError(500, "Erro interno do servidor")
  }
}
