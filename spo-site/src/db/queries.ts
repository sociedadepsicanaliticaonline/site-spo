import { getSupabase } from "@/lib/supabase"
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

interface DbCourse {
  id: string
  title: string
  slug: string
  description: string
  long_description: string
  price: number
  image: string
  category_id: string
  instructor_id: string
  duration: string
  workload: string
  level: string
  featured: boolean
  available: boolean
  created_at: string
}

interface DbEvent {
  id: string
  title: string
  slug: string
  description: string
  long_description: string
  date: string
  time: string
  location: string
  kind: "evento" | "programacao"
  type: "online" | "presencial" | "hibrido"
  image: string
  price: number | null
  available: boolean
  featured: boolean
  category_id: string
}

interface DbCategory {
  id: string
  name: string
  slug: string
}

interface DbTag {
  id: string
  name: string
  slug: string
}

interface DbAuthor {
  id: string
  name: string
  slug: string
  avatar: string
  role: string
  bio: string
  specialties: string[]
  education: string[]
  linkedin: string | null
  lattes: string | null
}

interface DbCartel {
  id: string
  name: string
  slug: string
  description: string
  meeting_day: string
  meeting_time: string
  frequency: string
  more_one_name: string
  more_one_whatsapp: string
  available: boolean
  created_at: string
}

interface DbAnalyst {
  id: string
  name: string
  state: string
  city: string
  whatsapp: string
  available: boolean
  created_at: string
}

interface DbSupervision {
  id: string
  supervisor_name: string
  date: string
  time: string
  frequency: string
  whatsapp: string
  description: string
  available: boolean
  created_at: string
}

interface DbFormacaoContent {
  id: string
  key: string
  content: string
  updated_at: string
}

interface DbTestimonial {
  id: string
  name: string
  role: string
  avatar: string
  content: string
  rating: number | null
  featured: boolean
  created_at: string
}

interface DbSiteConfig {
  id: number
  title: string
  short_name: string
  description: string
  url: string
  email: string
  whatsapp: string
  phone: string
  address: string
  social_links: string[]
  seo_title_template: string
  seo_default_description: string
  seo_og_image: string
  updated_at: string
}

function mapCategory(row: DbCategory): Category {
  return { id: row.id, name: row.name, slug: row.slug }
}

function mapTag(row: DbTag): Tag {
  return { id: row.id, name: row.name, slug: row.slug }
}

function mapAuthor(row: DbAuthor): Author {
  return {
    id: row.id,
    name: row.name,
    avatar: row.avatar,
    role: row.role,
    bio: row.bio,
  }
}

function toCourse(
  row: DbCourse,
  tagsList: Tag[],
  category: Category,
  instructor: Author
): Course {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    longDescription: row.long_description,
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
    createdAt: row.created_at,
  }
}

function toEvent(
  row: DbEvent,
  tagsList: Tag[],
  category: Category
): Event {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    longDescription: row.long_description,
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

function toCartel(row: DbCartel): Cartel {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    meetingDay: row.meeting_day,
    meetingTime: row.meeting_time,
    frequency: row.frequency,
    moreOneName: row.more_one_name,
    moreOneWhatsapp: row.more_one_whatsapp,
    available: row.available,
    createdAt: row.created_at,
  }
}

function toAnalyst(row: DbAnalyst): Analyst {
  return {
    id: row.id,
    name: row.name,
    state: row.state,
    city: row.city,
    whatsapp: row.whatsapp,
    available: row.available,
    createdAt: row.created_at,
  }
}

function toSupervision(row: DbSupervision): Supervision {
  return {
    id: row.id,
    supervisorName: row.supervisor_name,
    date: row.date,
    time: row.time,
    frequency: row.frequency,
    whatsapp: row.whatsapp,
    description: row.description,
    available: row.available,
    createdAt: row.created_at,
  }
}

function toFormacaoContent(row: DbFormacaoContent): FormacaoContent {
  return {
    id: row.id,
    key: row.key as FormacaoContentKey,
    content: row.content,
    updatedAt: row.updated_at.split("T")[0],
  }
}

function toTestimonial(row: DbTestimonial): Testimonial {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    avatar: row.avatar,
    content: row.content,
    rating: row.rating ?? undefined,
    featured: row.featured,
    createdAt: row.created_at,
  }
}

function toSiteConfig(row: DbSiteConfig): SiteConfig {
  return {
    title: row.title,
    shortName: row.short_name,
    description: row.description,
    url: row.url,
    email: row.email,
    whatsapp: row.whatsapp,
    phone: row.phone,
    address: row.address,
    socialLinks: row.social_links.map((s) => JSON.parse(s)),
    seo: {
      titleTemplate: row.seo_title_template,
      defaultDescription: row.seo_default_description,
      ogImage: row.seo_og_image,
    },
  }
}

export async function getAllCourses(): Promise<Course[]> {
  const supabase = getSupabase()
  const [courseRes, catRes, instrRes, ctRes, tagRes] = await Promise.all([
    supabase.from("courses").select("*").returns<DbCourse[]>(),
    supabase.from("categories").select("*").returns<DbCategory[]>(),
    supabase.from("authors").select("*").returns<DbAuthor[]>(),
    supabase.from("course_tags").select("*"),
    supabase.from("tags").select("*").returns<DbTag[]>(),
  ])

  if (courseRes.error) throw courseRes.error
  if (catRes.error) throw catRes.error
  if (instrRes.error) throw instrRes.error
  if (ctRes.error) throw ctRes.error
  if (tagRes.error) throw tagRes.error

  const catById = new Map((catRes.data ?? []).map((c) => [c.id, c]))
  const instrById = new Map((instrRes.data ?? []).map((a) => [a.id, a]))
  const tagById = new Map((tagRes.data ?? []).map((t) => [t.id, t]))

  const tagsByCourse = new Map<string, Tag[]>()
  for (const ct of ctRes.data ?? []) {
    const t = tagById.get(ct.tag_id)
    if (!t) continue
    const list = tagsByCourse.get(ct.course_id) ?? []
    list.push(t)
    tagsByCourse.set(ct.course_id, list)
  }

  return (courseRes.data ?? []).map((c) => {
    const cat = catById.get(c.category_id) ?? { id: c.category_id, name: "", slug: "" }
    const instr = instrById.get(c.instructor_id) ?? {
      id: c.instructor_id,
      name: "",
      avatar: "",
      role: "",
    }
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
  const supabase = getSupabase()
  const [eventRes, catRes, etRes, tagRes] = await Promise.all([
    supabase.from("events").select("*").returns<DbEvent[]>(),
    supabase.from("categories").select("*").returns<DbCategory[]>(),
    supabase.from("event_tags").select("*"),
    supabase.from("tags").select("*").returns<DbTag[]>(),
  ])

  if (eventRes.error) throw eventRes.error
  if (catRes.error) throw catRes.error
  if (etRes.error) throw etRes.error
  if (tagRes.error) throw tagRes.error

  const catById = new Map((catRes.data ?? []).map((c) => [c.id, c]))
  const tagById = new Map((tagRes.data ?? []).map((t) => [t.id, t]))

  const tagsByEvent = new Map<string, Tag[]>()
  for (const et of etRes.data ?? []) {
    const t = tagById.get(et.tag_id)
    if (!t) continue
    const list = tagsByEvent.get(et.event_id) ?? []
    list.push(t)
    tagsByEvent.set(et.event_id, list)
  }

  return (eventRes.data ?? []).map((e) => {
    const cat = catById.get(e.category_id) ?? { id: e.category_id, name: "", slug: "" }
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
  const supabase = getSupabase()
  const { data, error } = await supabase.from("cartells").select("*").returns<DbCartel[]>()
  if (error) throw error
  return (data ?? []).map(toCartel)
}

export async function getAvailableCartels(): Promise<Cartel[]> {
  return (await getAllCartels()).filter((c) => c.available)
}

export async function getCartelBySlug(slug: string): Promise<Cartel | undefined> {
  const all = await getAllCartels()
  return all.find((c) => c.slug === slug)
}

export async function getAllAnalysts(): Promise<Analyst[]> {
  const supabase = getSupabase()
  const { data, error } = await supabase.from("analysts").select("*").returns<DbAnalyst[]>()
  if (error) throw error
  return (data ?? []).map(toAnalyst)
}

export async function getAvailableAnalysts(): Promise<Analyst[]> {
  return (await getAllAnalysts()).filter((a) => a.available)
}

export async function getAllSupervisions(): Promise<Supervision[]> {
  const supabase = getSupabase()
  const { data, error } = await supabase.from("supervisions").select("*").returns<DbSupervision[]>()
  if (error) throw error
  return (data ?? []).map(toSupervision)
}

export async function getAvailableSupervisions(): Promise<Supervision[]> {
  return (await getAllSupervisions()).filter((s) => s.available)
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const supabase = getSupabase()
  const { data, error } = await supabase.from("testimonials").select("*").returns<DbTestimonial[]>()
  if (error) throw error
  return (data ?? []).map(toTestimonial)
}

export async function getAllFormacaoContents(): Promise<FormacaoContent[]> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from("formacao_contents")
    .select("*").returns<DbFormacaoContent[]>()
  if (error) throw error
  return (data ?? []).map(toFormacaoContent)
}

export async function getFormacaoContentByKey(
  key: FormacaoContentKey
): Promise<FormacaoContent | undefined> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from("formacao_contents")
    .select("*")
    .eq("key", key)
    .maybeSingle()
  if (error) throw error
  return data ? toFormacaoContent(data as DbFormacaoContent) : undefined
}

export async function getAllCoordinators(): Promise<Coordinator[]> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from("authors")
    .select("*").returns<DbAuthor[]>()
    .order("name", { ascending: true })
  if (error) throw error
  return (data ?? []).map((a) => ({
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
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from("site_config")
    .select("*")
    .eq("id", 1)
    .maybeSingle()
  if (error) throw error
  return data ? toSiteConfig(data as DbSiteConfig) : null
}

