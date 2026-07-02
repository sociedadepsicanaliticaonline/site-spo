import { withAuth, generateId } from "@/lib/api"
import { getDb } from "@/db"
import { courses, courseTags } from "@/db/schema"
import { courseSchema } from "@/lib/schemas"
import { eq } from "drizzle-orm"

export const dynamic = "force-dynamic"

export async function GET() {
  return withAuth(async () => {
    const db = getDb()
    return db.select().from(courses)
  })
}

export async function POST(req: Request) {
  return withAuth(async () => {
    const body = await req.json()
    const parsed = courseSchema.parse(body)
    const db = getDb()
    const id = parsed.id || generateId()
    const tagsList = Array.isArray((body as { tags?: unknown }).tags)
      ? ((body as { tags: Array<{ id: string }> }).tags)
      : []

    const existing = await db.select().from(courses).where(eq(courses.id, id)).limit(1)

    if (existing.length > 0) {
      await db.update(courses).set({
        title: parsed.title,
        slug: parsed.slug,
        description: parsed.description,
        longDescription: parsed.longDescription ?? "",
        price: parsed.price,
        image: parsed.image,
        categoryId: parsed.category.id,
        instructorId: parsed.instructor.id,
        duration: parsed.duration,
        workload: parsed.workload,
        level: parsed.level,
        featured: parsed.featured,
        available: parsed.available,
      }).where(eq(courses.id, id))
    } else {
      await db.insert(courses).values({
        id,
        title: parsed.title,
        slug: parsed.slug,
        description: parsed.description,
        longDescription: parsed.longDescription ?? "",
        price: parsed.price,
        image: parsed.image,
        categoryId: parsed.category.id,
        instructorId: parsed.instructor.id,
        duration: parsed.duration,
        workload: parsed.workload,
        level: parsed.level,
        featured: parsed.featured,
        available: parsed.available,
      })
    }

    await db.delete(courseTags).where(eq(courseTags.courseId, id))
    if (tagsList.length > 0) {
      await db.insert(courseTags).values(tagsList.map((t) => ({ courseId: id, tagId: t.id })))
    }

    const [saved] = await db.select().from(courses).where(eq(courses.id, id))
    return saved
  })
}
