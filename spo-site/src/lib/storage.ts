import { getSupabaseAdmin } from "./supabase"

const BUCKET = "media"

async function ensureBucket(): Promise<void> {
  const supabase = getSupabaseAdmin()
  const { data: buckets } = await supabase.storage.listBuckets()
  if (!buckets?.find((b) => b.name === BUCKET)) {
    await supabase.storage.createBucket(BUCKET, { public: true })
  }
}

let bucketEnsured = false

export async function saveFile(
  buffer: ArrayBuffer,
  originalName: string,
  mimeType: string,
): Promise<{ url: string; filename: string }> {
  const supabase = getSupabaseAdmin()

  if (!bucketEnsured) {
    await ensureBucket()
    bucketEnsured = true
  }

  const ext = originalName.split(".").pop() || "bin"
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, buffer, { contentType: mimeType, upsert: false })

  if (error) throw new Error(`Erro ao fazer upload: ${error.message}`)

  const { data: publicUrl } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(filename)

  return { url: publicUrl.publicUrl, filename }
}

export async function deleteFile(filename: string): Promise<void> {
  const supabase = getSupabaseAdmin()
  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([filename])

  if (error) throw new Error(`Erro ao excluir: ${error.message}`)
}
