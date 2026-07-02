import { withAuth, generateId } from "@/lib/api"
import { getDb } from "@/db"
import { cartells } from "@/db/schema"
import { cartelSchema } from "@/lib/schemas"
import { eq } from "drizzle-orm"

export const dynamic = "force-dynamic"

export async function GET() {
  return withAuth(async () => {
    const db = getDb()
    return db.select().from(cartells)
  })
}

export async function POST(req: Request) {
  return withAuth(async () => {
    const body = await req.json()
    const parsed = cartelSchema.parse(body)
    const db = getDb()
    const id = parsed.id || generateId()

    const existing = await db.select().from(cartells).where(eq(cartells.id, id)).limit(1)
    const data = {
      id,
      name: parsed.name,
      slug: parsed.slug,
      description: parsed.description ?? "",
      meetingDay: parsed.meetingDay,
      meetingTime: parsed.meetingTime,
      frequency: parsed.frequency,
      moreOneName: parsed.moreOneName,
      moreOneWhatsapp: parsed.moreOneWhatsapp,
      available: parsed.available,
      createdAt: parsed.createdAt,
    }
    if (existing.length > 0) {
      await db.update(cartells).set(data).where(eq(cartells.id, id))
    } else {
      await db.insert(cartells).values(data)
    }
    const [saved] = await db.select().from(cartells).where(eq(cartells.id, id))
    return saved
  })
}
