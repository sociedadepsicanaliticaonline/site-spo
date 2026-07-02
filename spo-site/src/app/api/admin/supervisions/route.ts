import { withAuth, generateId } from "@/lib/api"
import { getDb } from "@/db"
import { supervisions } from "@/db/schema"
import { supervisionSchema } from "@/lib/schemas"
import { eq } from "drizzle-orm"

export const dynamic = "force-dynamic"

export async function GET() {
  return withAuth(async () => {
    const db = getDb()
    return db.select().from(supervisions)
  })
}

export async function POST(req: Request) {
  return withAuth(async () => {
    const body = await req.json()
    const parsed = supervisionSchema.parse(body)
    const db = getDb()
    const id = parsed.id || generateId()
    const existing = await db.select().from(supervisions).where(eq(supervisions.id, id)).limit(1)
    const data = {
      id,
      supervisorName: parsed.supervisorName,
      date: parsed.date,
      time: parsed.time,
      frequency: parsed.frequency,
      whatsapp: parsed.whatsapp,
      description: parsed.description ?? "",
      available: parsed.available,
      createdAt: parsed.createdAt,
    }
    if (existing.length > 0) {
      await db.update(supervisions).set(data).where(eq(supervisions.id, id))
    } else {
      await db.insert(supervisions).values(data)
    }
    const [saved] = await db.select().from(supervisions).where(eq(supervisions.id, id))
    return saved
  })
}
