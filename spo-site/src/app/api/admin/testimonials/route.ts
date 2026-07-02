import { withAuth, generateId } from "@/lib/api"
import { getDb } from "@/db"
import { testimonials } from "@/db/schema"
import { testimonialSchema } from "@/lib/schemas"
import { eq } from "drizzle-orm"

export const dynamic = "force-dynamic"

export async function GET() {
  return withAuth(async () => {
    const db = getDb()
    return db.select().from(testimonials)
  })
}

export async function POST(req: Request) {
  return withAuth(async () => {
    const body = await req.json()
    const parsed = testimonialSchema.parse(body)
    const db = getDb()
    const id = parsed.id || generateId()
    const existing = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1)
    const data = {
      id,
      name: parsed.name,
      role: parsed.role,
      avatar: parsed.avatar,
      content: parsed.content,
      rating: parsed.rating ?? null,
      featured: parsed.featured ?? false,
      createdAt: parsed.createdAt,
    }
    if (existing.length > 0) {
      await db.update(testimonials).set(data).where(eq(testimonials.id, id))
    } else {
      await db.insert(testimonials).values(data)
    }
    const [saved] = await db.select().from(testimonials).where(eq(testimonials.id, id))
    return saved
  })
}
