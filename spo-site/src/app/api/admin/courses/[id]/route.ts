import { withAuth } from "@/lib/api"
import { getDb } from "@/db"
import { courses } from "@/db/schema"
import { eq } from "drizzle-orm"

export const dynamic = "force-dynamic"

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return withAuth(async () => {
    const { id } = await params
    const db = getDb()
    await db.delete(courses).where(eq(courses.id, id))
    return { success: true }
  })
}
