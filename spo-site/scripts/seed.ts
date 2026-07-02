import "dotenv/config"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { createClient } from "@supabase/supabase-js"
import bcrypt from "bcryptjs"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    "Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY antes de rodar o seed."
  )
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
})

function loadDataFile<T>(relativePath: string): T {
  const absolute = resolve(process.cwd(), relativePath)
  const source = readFileSync(absolute, "utf8")
  const transformed = source
    .replace(/import type \{[^}]+\} from "@\/types";?\s*/g, "")
    .replace(/from "@\/types";?/g, "")
  const moduleFn = new Function("exports", "module", transformed + "\nreturn module.exports;")
  const fakeExports: Record<string, unknown> = {}
  const fakeModule = { exports: fakeExports }
  return moduleFn(fakeExports, fakeModule) as T
}

async function main() {
  console.log("🌱 Iniciando seed via Supabase REST API...")

  console.log("🔄 Limpando dados existentes...")
  for (const table of [
    "event_tags",
    "course_tags",
    "events",
    "courses",
    "cartells",
    "analysts",
    "supervisions",
    "formacao_contents",
    "testimonials",
    "media",
    "authors",
    "categories",
    "tags",
    "site_config",
    "users",
  ]) {
    const { error } = await supabase.from(table).delete().neq("id", "__never__")
    if (error) console.warn(`  ⚠️  ${table}:`, error.message)
  }

  console.log("👤 Criando superadmin...")
  const passwordHash = await bcrypt.hash("spopublic@2026", 10)
  const { error: userErr } = await supabase.from("users").insert({
    id: "user-superadmin",
    name: "superadmin",
    email: "sociedadepsicanaliticaonline@gmail.com",
    password_hash: passwordHash,
    role: "superadmin",
  })
  if (userErr) throw userErr

  const authors = loadDataFile<{
    coordinators: Array<{
      id: string
      name: string
      slug: string
      avatar: string
      role: string
      bio: string
      specialties: string[]
      education: string[]
      socialLinks?: { linkedin?: string; lattes?: string }
    }>
  }>("src/data/coordinators.ts").coordinators
  console.log(`👥 Inserindo ${authors.length} coordenadores/autores...`)
  for (const a of authors) {
    const { error } = await supabase.from("authors").insert({
      id: a.id,
      name: a.name,
      slug: a.slug,
      avatar: a.avatar,
      role: a.role,
      bio: a.bio,
      specialties: a.specialties,
      education: a.education,
      linkedin: a.socialLinks?.linkedin ?? null,
      lattes: a.socialLinks?.lattes ?? null,
    })
    if (error) throw error
  }

  const coursesData = loadDataFile<{
    courses: Array<{
      id: string
      title: string
      slug: string
      description: string
      longDescription: string
      price: number
      image: string
      category: { id: string; name: string; slug: string }
      instructor: { id: string; name: string; avatar: string; role: string }
      duration: string
      workload: string
      level: string
      featured: boolean
      available: boolean
      tags: Array<{ id: string; name: string; slug: string }>
      createdAt: string
    }>
  }>("src/data/courses.ts").courses
  const allTags = new Map<string, { id: string; name: string; slug: string }>()
  const allCategories = new Map<string, { id: string; name: string; slug: string }>()

  for (const c of coursesData) {
    allCategories.set(c.category.id, c.category)
    for (const t of c.tags) allTags.set(t.id, t)
  }

  console.log(`🏷️  Inserindo ${allTags.size} tags...`)
  for (const t of allTags.values()) {
    const { error } = await supabase.from("tags").insert(t)
    if (error) throw error
  }

  console.log(`📁 Inserindo ${allCategories.size} categorias...`)
  for (const c of allCategories.values()) {
    const { error } = await supabase.from("categories").insert(c)
    if (error) throw error
  }

  console.log(`📚 Inserindo ${coursesData.length} cursos...`)
  for (const c of coursesData) {
    const { error } = await supabase.from("courses").insert({
      id: c.id,
      title: c.title,
      slug: c.slug,
      description: c.description,
      long_description: c.longDescription,
      price: c.price,
      image: c.image,
      category_id: c.category.id,
      instructor_id: c.instructor.id,
      duration: c.duration,
      workload: c.workload,
      level: c.level,
      featured: c.featured,
      available: c.available,
      created_at: c.createdAt,
    })
    if (error) throw error
    for (const t of c.tags) {
      const { error: ctErr } = await supabase
        .from("course_tags")
        .insert({ course_id: c.id, tag_id: t.id })
      if (ctErr) throw ctErr
    }
  }

  const eventsData = loadDataFile<{
    events: Array<{
      id: string
      title: string
      slug: string
      description: string
      longDescription?: string
      date: string
      time: string
      location: string
      kind: "evento" | "programacao"
      type: "online" | "presencial" | "hibrido"
      image: string
      price?: number
      available: boolean
      featured: boolean
      category: { id: string; name: string; slug: string }
      tags: Array<{ id: string; name: string; slug: string }>
    }>
  }>("src/data/events.ts").events
  for (const e of eventsData) {
    allCategories.set(e.category.id, e.category)
    for (const t of e.tags) allTags.set(t.id, t)
  }
  for (const c of allCategories.values()) {
    await supabase.from("categories").upsert(c)
  }
  for (const t of allTags.values()) {
    await supabase.from("tags").upsert(t)
  }

  console.log(`📅 Inserindo ${eventsData.length} eventos/programações...`)
  for (const e of eventsData) {
    const { error } = await supabase.from("events").insert({
      id: e.id,
      title: e.title,
      slug: e.slug,
      description: e.description,
      long_description: e.longDescription ?? "",
      date: e.date,
      time: e.time,
      location: e.location,
      kind: e.kind,
      type: e.type,
      image: e.image,
      price: e.price ?? null,
      available: e.available,
      featured: e.featured,
      category_id: e.category.id,
    })
    if (error) throw error
    for (const t of e.tags) {
      await supabase.from("event_tags").insert({ event_id: e.id, tag_id: t.id })
    }
  }

  const cartells = loadDataFile<{
    carteis: Array<{
      id: string
      name: string
      slug: string
      description?: string
      meetingDay: string
      meetingTime: string
      frequency: string
      moreOneName: string
      moreOneWhatsapp: string
      available: boolean
      createdAt: string
    }>
  }>("src/data/carteis.ts").carteis
  console.log(`🔗 Inserindo ${cartells.length} cartéis...`)
  for (const c of cartells) {
    await supabase.from("cartells").insert({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description ?? "",
      meeting_day: c.meetingDay,
      meeting_time: c.meetingTime,
      frequency: c.frequency,
      more_one_name: c.moreOneName,
      more_one_whatsapp: c.moreOneWhatsapp,
      available: c.available,
      created_at: c.createdAt,
    })
  }

  const analysts = loadDataFile<{
    analysts: Array<{
      id: string
      name: string
      state: string
      city: string
      whatsapp: string
      available: boolean
      createdAt: string
    }>
  }>("src/data/analysts.ts").analysts
  console.log(`🧠 Inserindo ${analysts.length} analistas...`)
  for (const a of analysts) {
    await supabase.from("analysts").insert({
      id: a.id,
      name: a.name,
      state: a.state,
      city: a.city,
      whatsapp: a.whatsapp,
      available: a.available,
      created_at: a.createdAt,
    })
  }

  const supervisions = loadDataFile<{
    supervisions: Array<{
      id: string
      supervisorName: string
      date: string
      time: string
      frequency: string
      whatsapp: string
      description?: string
      available: boolean
      createdAt: string
    }>
  }>("src/data/supervisions.ts").supervisions
  console.log(`👁️ Inserindo ${supervisions.length} supervisões...`)
  for (const s of supervisions) {
    await supabase.from("supervisions").insert({
      id: s.id,
      supervisor_name: s.supervisorName,
      date: s.date,
      time: s.time,
      frequency: s.frequency,
      whatsapp: s.whatsapp,
      description: s.description ?? "",
      available: s.available,
      created_at: s.createdAt,
    })
  }

  const formacaoContents = loadDataFile<{
    formacaoContents: Array<{
      id: string
      key: string
      content: string
      updatedAt: string
    }>
  }>("src/data/formacao-content.ts").formacaoContents
  console.log(`📜 Inserindo ${formacaoContents.length} conteúdos de formação...`)
  for (const f of formacaoContents) {
    await supabase.from("formacao_contents").insert({
      id: f.id,
      key: f.key,
      content: f.content,
      updated_at: f.updatedAt,
    })
  }

  const testimonials = loadDataFile<{
    testimonials: Array<{
      id: string
      name: string
      role: string
      avatar: string
      content: string
      rating?: number
      featured?: boolean
      createdAt: string
    }>
  }>("src/data/testimonials.ts").testimonials
  console.log(`💬 Inserindo ${testimonials.length} testemunhos...`)
  for (const t of testimonials) {
    await supabase.from("testimonials").insert({
      id: t.id,
      name: t.name,
      role: t.role,
      avatar: t.avatar,
      content: t.content,
      rating: t.rating ?? null,
      featured: t.featured ?? false,
      created_at: t.createdAt,
    })
  }

  console.log("⚙️ Inserindo site_config...")
  await supabase.from("site_config").insert({
    id: 1,
    title: "Sociedade Psicanalítica Online",
    short_name: "SPO",
    description:
      "Formação e Saber em Psicanálise. A Sociedade Psicanalítica Online dedica-se à transmissão da psicanálise clássica e contemporânea.",
    url: "https://spo.com.br",
    email: "contato@spo.com.br",
    whatsapp: "5522998391755",
    phone: "+55 (11) 99999-9999",
    address: "São Paulo, SP",
    social_links: [
      '{"label":"Instagram","href":"https://instagram.com/spo","icon":"instagram"}',
      '{"label":"YouTube","href":"https://youtube.com/@spo","icon":"youtube"}',
      '{"label":"LinkedIn","href":"https://linkedin.com/company/spo","icon":"linkedin"}',
    ],
    seo_title_template: "%s | SPO - Sociedade Psicanalítica Online",
    seo_default_description:
      "Formação e Saber em Psicanálise. Seminários, eventos e conteúdo psicanalítico de alto nível.",
    seo_og_image: "/images/og-image.jpg",
  })

  console.log("✅ Seed concluído com sucesso!")
  console.log("")
  console.log("👤 Superadmin criado:")
  console.log("   Email: sociedadepsicanaliticaonline@gmail.com")
  console.log("   Senha: spopublic@2026")
  console.log("   ⚠️  Altere a senha no primeiro login!")
}

main().catch((err) => {
  console.error("❌ Erro no seed:", err)
  process.exit(1)
})
