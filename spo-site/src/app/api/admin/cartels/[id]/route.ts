import { withAuth } from "@/lib/api"
import { getDb } from "@/db"
import { cartells } from "@/db/schema"
import { eq } from "drizzle-orm"

export const dynamic = "force-dynamic"

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return withAuth(async () => {
    const { id } = await params
    const db = getDb()
    await db.delete(cartells).where(eq(cartells.id, id))
    return { success: true }
  })
}
