import { withAuth } from "@/lib/api"
import { getDb } from "@/db"
import { testimonials } from "@/db/schema"
import { eq } from "drizzle-orm"

export const dynamic = "force-dynamic"

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return withAuth(async () => {
    const { id } = await params
    const db = getDb()
    await db.delete(testimonials).where(eq(testimonials.id, id))
    return { success: true }
  })
}
