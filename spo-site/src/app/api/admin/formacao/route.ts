import { withAuth } from "@/lib/api"
import { getDb } from "@/db"
import { formacaoContents } from "@/db/schema"
import { formacaoContentSchema } from "@/lib/schemas"
import { eq } from "drizzle-orm"

export const dynamic = "force-dynamic"

export async function GET() {
  return withAuth(async () => {
    const db = getDb()
    return db.select().from(formacaoContents)
  })
}

export async function POST(req: Request) {
  return withAuth(async () => {
    const body = await req.json()
    const parsed = formacaoContentSchema.parse(body)
    const db = getDb()
    const id = parsed.id || `fc-${parsed.key}`
    const existing = await db
      .select()
      .from(formacaoContents)
      .where(eq(formacaoContents.key, parsed.key))
      .limit(1)

    const data = {
      id,
      key: parsed.key,
      content: parsed.content,
      updatedAt: new Date(),
    }
    if (existing.length > 0) {
      await db
        .update(formacaoContents)
        .set({ content: data.content, updatedAt: data.updatedAt })
        .where(eq(formacaoContents.key, parsed.key))
    } else {
      await db.insert(formacaoContents).values(data)
    }
    const [saved] = await db
      .select()
      .from(formacaoContents)
      .where(eq(formacaoContents.key, parsed.key))
    return saved
  })
}
