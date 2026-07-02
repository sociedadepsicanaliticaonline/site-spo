import { withAuth } from "@/lib/api"
import { getSupabaseAdmin } from "@/lib/supabase"

export const dynamic = "force-dynamic"

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return withAuth(async () => {
    const { id } = await params
    const supabase = getSupabaseAdmin()
    const { error } = await supabase.from("events").delete().eq("id", id)
    if (error) throw error
    return { success: true }
  })
}
