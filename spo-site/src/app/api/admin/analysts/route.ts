import { withAuth, generateId } from "@/lib/api"
import { getDb } from "@/db"
import { analysts } from "@/db/schema"
import { analystSchema } from "@/lib/schemas"
import { eq } from "drizzle-orm"

export const dynamic = "force-dynamic"

export async function GET() {
  return withAuth(async () => {
    const db = getDb()
    return db.select().from(analysts)
  })
}

export async function POST(req: Request) {
  return withAuth(async () => {
    const body = await req.json()
    const parsed = analystSchema.parse(body)
    const db = getDb()
    const id = parsed.id || generateId()
    const existing = await db.select().from(analysts).where(eq(analysts.id, id)).limit(1)
    const data = {
      id,
      name: parsed.name,
      state: parsed.state,
      city: parsed.city,
      whatsapp: parsed.whatsapp,
      available: parsed.available,
      createdAt: parsed.createdAt,
    }
    if (existing.length > 0) {
      await db.update(analysts).set(data).where(eq(analysts.id, id))
    } else {
      await db.insert(analysts).values(data)
    }
    const [saved] = await db.select().from(analysts).where(eq(analysts.id, id))
    return saved
  })
}
