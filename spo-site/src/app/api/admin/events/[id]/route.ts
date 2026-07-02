import { withAuth } from "@/lib/api"
import { getDb } from "@/db"
import { events } from "@/db/schema"
import { eq } from "drizzle-orm"

export const dynamic = "force-dynamic"

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return withAuth(async () => {
    const { id } = await params
    const db = getDb()
    await db.delete(events).where(eq(events.id, id))
    return { success: true }
  })
}
