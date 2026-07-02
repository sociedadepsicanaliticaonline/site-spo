import { withAuth, generateId } from "@/lib/api"
import { getDb } from "@/db"
import { events, eventTags } from "@/db/schema"
import { eventSchema } from "@/lib/schemas"
import { eq } from "drizzle-orm"

export const dynamic = "force-dynamic"

export async function GET() {
  return withAuth(async () => {
    const db = getDb()
    const rows = await db.select().from(events)
    return rows
  })
}

export async function POST(req: Request) {
  return withAuth(async () => {
    const body = await req.json()
    const parsed = eventSchema.parse(body)
    const db = getDb()

    const existing = await db
      .select()
      .from(events)
      .where(eq(events.id, parsed.id))
      .limit(1)

    const id = existing.length > 0 ? parsed.id : parsed.id || generateId()
    const tagsList = Array.isArray((body as { tags?: unknown }).tags)
      ? ((body as { tags: Array<{ id: string }> }).tags)
      : []

    if (existing.length > 0) {
      await db
        .update(events)
        .set({
          title: parsed.title,
          slug: parsed.slug,
          description: parsed.description,
          longDescription: parsed.longDescription ?? "",
          date: parsed.date,
          time: parsed.time,
          location: parsed.location,
          kind: parsed.kind,
          type: parsed.type,
          image: parsed.image,
          price: parsed.price ?? null,
          available: parsed.available,
          featured: parsed.featured,
          categoryId: parsed.category.id,
        })
        .where(eq(events.id, id))
    } else {
      await db.insert(events).values({
        id,
        title: parsed.title,
        slug: parsed.slug,
        description: parsed.description,
        longDescription: parsed.longDescription ?? "",
        date: parsed.date,
        time: parsed.time,
        location: parsed.location,
        kind: parsed.kind,
        type: parsed.type,
        image: parsed.image,
        price: parsed.price ?? null,
        available: parsed.available,
        featured: parsed.featured,
        categoryId: parsed.category.id,
      })
    }

    await db.delete(eventTags).where(eq(eventTags.eventId, id))
    if (tagsList.length > 0) {
      await db
        .insert(eventTags)
        .values(tagsList.map((t) => ({ eventId: id, tagId: t.id })))
    }

    const [saved] = await db.select().from(events).where(eq(events.id, id))
    return saved
  })
}
