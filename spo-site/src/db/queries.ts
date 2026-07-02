import { getDb } from "@/db"
import {
  courses,
  events,
  cartells,
  analysts,
  supervisions,
  formacaoContents,
  testimonials,
  siteConfig,
  authors,
  categories,
  tags,
  courseTags,
  eventTags,
} from "@/db/schema"
import { and, asc, desc, eq, inArray, sql } from "drizzle-orm"
import type {
  Course,
  Event,
  Cartel,
  Analyst,
  Supervision,
  FormacaoContent,
  FormacaoContentKey,
  Testimonial,
  Coordinator,
  Category,
  Tag,
  Author,
  SiteConfig,
} from "@/types"

export const dynamic = "force-dynamic"

function toEvent(row: typeof events.$inferSelect, tagsList: Tag[], category: Category): Event {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    longDescription: row.longDescription,
    date: row.date,
    time: row.time,
    location: row.location,
    kind: row.kind,
    type: row.type,
    image: row.image,
    price: row.price ?? undefined,
    available: row.available,
    featured: row.featured,
    category,
    tags: tagsList,
  }
}

function toCourse(row: typeof courses.$inferSelect, tagsList: Tag[], category: Category, instructor: Author): Course {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    longDescription: row.longDescription,
    price: row.price,
    image: row.image,
    category,
    instructor,
    duration: row.duration,
    workload: row.workload,
    level: row.level as Course["level"],
    featured: row.featured,
    available: row.available,
    tags: tagsList,
    createdAt: row.createdAt,
  }
}

export async function getAllCourses(): Promise<Course[]> {
  const db = getDb()
  const courseRows = await db.select().from(courses)
  if (courseRows.length === 0) return []
  const courseIds = courseRows.map((c) => c.id)
  const catIds = [...new Set(courseRows.map((c) => c.categoryId))]
  const instrIds = [...new Set(courseRows.map((c) => c.instructorId))]

  const [catRows, instrRows, tagLinkRows, allTagRows] = await Promise.all([
    db.select().from(categories).where(inArray(categories.id, catIds)),
    db.select().from(authors).where(inArray(authors.id, instrIds)),
    db.select().from(courseTags).where(inArray(courseTags.courseId, courseIds)),
    db.select().from(tags),
  ])

  const tagIds = [...new Set(tagLinkRows.map((t) => t.tagId))]
  const tagById = new Map(allTagRows.filter((t) => tagIds.includes(t.id)).map((t) => [t.id, { id: t.id, name: t.name, slug: t.slug }]))
  const tagsByCourse = new Map<string, Tag[]>()
  for (const link of tagLinkRows) {
    const t = tagById.get(link.tagId)
    if (!t) continue
    const list = tagsByCourse.get(link.courseId) ?? []
    list.push(t)
    tagsByCourse.set(link.courseId, list)
  }

  const catById = new Map(catRows.map((c) => [c.id, { id: c.id, name: c.name, slug: c.slug }]))
  const instrById = new Map(
    instrRows.map((a) => [
      a.id,
      {
        id: a.id,
        name: a.name,
        avatar: a.avatar,
        role: a.role,
        bio: a.bio,
      },
    ])
  )

  return courseRows.map((c) => {
    const cat = catById.get(c.categoryId) ?? { id: c.categoryId, name: "", slug: "" }
    const instr = instrById.get(c.instructorId) ?? { id: c.instructorId, name: "", avatar: "", role: "" }
    return toCourse(c, tagsByCourse.get(c.id) ?? [], cat, instr as Author)
  })
}

export async function getFeaturedCourses(): Promise<Course[]> {
  return (await getAllCourses()).filter((c) => c.featured)
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  const all = await getAllCourses()
  return all.find((c) => c.slug === slug)
}

export async function getAllEvents(): Promise<Event[]> {
  const db = getDb()
  const eventRows = await db.select().from(events)
  if (eventRows.length === 0) return []
  const eventIds = eventRows.map((e) => e.id)
  const catIds = [...new Set(eventRows.map((e) => e.categoryId))]

  const [catRows, tagLinkRows, allTagRows] = await Promise.all([
    db.select().from(categories).where(inArray(categories.id, catIds)),
    db.select().from(eventTags).where(inArray(eventTags.eventId, eventIds)),
    db.select().from(tags),
  ])

  const tagIds = [...new Set(tagLinkRows.map((t) => t.tagId))]
  const tagById = new Map(allTagRows.filter((t) => tagIds.includes(t.id)).map((t) => [t.id, { id: t.id, name: t.name, slug: t.slug }]))
  const tagsByEvent = new Map<string, Tag[]>()
  for (const link of tagLinkRows) {
    const t = tagById.get(link.tagId)
    if (!t) continue
    const list = tagsByEvent.get(link.eventId) ?? []
    list.push(t)
    tagsByEvent.set(link.eventId, list)
  }

  const catById = new Map(catRows.map((c) => [c.id, { id: c.id, name: c.name, slug: c.slug }]))
  return eventRows.map((e) => {
    const cat = catById.get(e.categoryId) ?? { id: e.categoryId, name: "", slug: "" }
    return toEvent(e, tagsByEvent.get(e.id) ?? [], cat)
  })
}

export async function getUpcomingEvents(): Promise<Event[]> {
  return (await getAllEvents()).filter((e) => e.available && e.featured)
}

export async function getEventos(): Promise<Event[]> {
  return (await getAllEvents()).filter((e) => e.kind === "evento")
}

export async function getProgramacoes(): Promise<Event[]> {
  return (await getAllEvents()).filter((e) => e.kind === "programacao")
}

export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  const all = await getAllEvents()
  return all.find((e) => e.slug === slug)
}

export async function getAllCartels(): Promise<Cartel[]> {
  const db = getDb()
  return db.select().from(cartells)
}

export async function getAvailableCartels(): Promise<Cartel[]> {
  return (await getAllCartels()).filter((c) => c.available)
}

export async function getCartelBySlug(slug: string): Promise<Cartel | undefined> {
  const all = await getAllCartels()
  return all.find((c) => c.slug === slug)
}

export async function getAllAnalysts(): Promise<Analyst[]> {
  const db = getDb()
  return db.select().from(analysts)
}

export async function getAvailableAnalysts(): Promise<Analyst[]> {
  return (await getAllAnalysts()).filter((a) => a.available)
}

export async function getAllSupervisions(): Promise<Supervision[]> {
  const db = getDb()
  return db.select().from(supervisions)
}

export async function getAvailableSupervisions(): Promise<Supervision[]> {
  return (await getAllSupervisions()).filter((s) => s.available)
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const db = getDb()
  const rows = await db.select().from(testimonials)
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    role: r.role,
    avatar: r.avatar,
    content: r.content,
    rating: r.rating ?? undefined,
    featured: r.featured,
    createdAt: r.createdAt,
  }))
}

export async function getAllFormacaoContents(): Promise<FormacaoContent[]> {
  const db = getDb()
  const rows = await db.select().from(formacaoContents)
  return rows.map((r) => ({
    id: r.id,
    key: r.key as FormacaoContentKey,
    content: r.content,
    updatedAt: r.updatedAt.toISOString().split("T")[0],
  }))
}

export async function getFormacaoContentByKey(key: FormacaoContentKey): Promise<FormacaoContent | undefined> {
  const db = getDb()
  const [row] = await db
    .select()
    .from(formacaoContents)
    .where(eq(formacaoContents.key, key))
    .limit(1)
  if (!row) return undefined
  return {
    id: row.id,
    key: row.key as FormacaoContentKey,
    content: row.content,
    updatedAt: row.updatedAt.toISOString().split("T")[0],
  }
}

export async function getAllCoordinators(): Promise<Coordinator[]> {
  const db = getDb()
  const rows = await db.select().from(authors).orderBy(asc(authors.name))
  return rows.map((a) => ({
    id: a.id,
    name: a.name,
    slug: a.slug,
    avatar: a.avatar,
    role: a.role,
    bio: a.bio,
    specialties: a.specialties,
    education: a.education,
    socialLinks: {
      ...(a.linkedin ? { linkedin: a.linkedin } : {}),
      ...(a.lattes ? { lattes: a.lattes } : {}),
    },
  }))
}

export async function getSiteConfig(): Promise<SiteConfig | null> {
  const db = getDb()
  const [row] = await db.select().from(siteConfig).where(eq(siteConfig.id, 1)).limit(1)
  if (!row) return null
  return {
    title: row.title,
    shortName: row.shortName,
    description: row.description,
    url: row.url,
    email: row.email,
    whatsapp: row.whatsapp,
    phone: row.phone,
    address: row.address,
    socialLinks: row.socialLinks.map((s) => {
      const parsed = JSON.parse(s) as { label: string; href: string; icon: string }
      return parsed
    }),
    seo: {
      titleTemplate: row.seoTitleTemplate,
      defaultDescription: row.seoDefaultDescription,
      ogImage: row.seoOgImage,
    },
  }
}
