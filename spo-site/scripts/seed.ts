import "dotenv/config"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import postgres from "postgres"
import bcrypt from "bcryptjs"

const DATABASE_URL = process.env.DATABASE_URL!
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL não definida. Configure em .dev.vars antes de rodar o seed.")
}

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
  const sql = postgres(DATABASE_URL, { max: 1, prepare: false })
  console.log("🌱 Iniciando seed...")

  console.log("🔄 Limpando dados existentes...")
  await sql`TRUNCATE TABLE
    "event_tags", "course_tags", "events", "courses",
    "cartells", "analysts", "supervisions", "formacao_contents",
    "testimonials", "media", "authors", "categories", "tags",
    "site_config", "users"
    RESTART IDENTITY CASCADE`

  console.log("👤 Criando superadmin...")
  const passwordHash = await bcrypt.hash("spopublic@2026", 10)
  await sql`
    INSERT INTO "users" ("id", "name", "email", "password_hash", "role")
    VALUES (${"user-superadmin"}, ${"superadmin"}, ${"sociedadepsicanaliticaonline@gmail.com"}, ${passwordHash}, ${"superadmin"})
  `

  const authors = loadDataFile<{ coordinators: Array<{ id: string; name: string; slug: string; avatar: string; role: string; bio: string; specialties: string[]; education: string[]; socialLinks?: { linkedin?: string; lattes?: string } }> }>(
    "src/data/coordinators.ts"
  ).coordinators
  console.log(`👥 Inserindo ${authors.length} coordenadores/autores...`)
  for (const a of authors) {
    await sql`
      INSERT INTO "authors" ("id", "name", "slug", "avatar", "role", "bio", "specialties", "education", "linkedin", "lattes")
      VALUES (${a.id}, ${a.name}, ${a.slug}, ${a.avatar}, ${a.role}, ${a.bio},
              ${sql.array(a.specialties)}, ${sql.array(a.education)},
              ${a.socialLinks?.linkedin ?? null}, ${a.socialLinks?.lattes ?? null})
    `
  }

  const coursesData = loadDataFile<{ courses: Array<{
    id: string; title: string; slug: string; description: string; longDescription: string;
    price: number; image: string; category: { id: string; name: string; slug: string };
    instructor: { id: string; name: string; avatar: string; role: string };
    duration: string; workload: string; level: string;
    featured: boolean; available: boolean; tags: Array<{ id: string; name: string; slug: string }>;
    createdAt: string
  }> }>("src/data/courses.ts").courses
  console.log(`📚 Inserindo ${coursesData.length} cursos...`)
  const allTags = new Map<string, { id: string; name: string; slug: string }>()
  for (const c of coursesData) {
    for (const t of c.tags) allTags.set(t.id, t)
  }
  console.log(`🏷️  Inserindo ${allTags.size} tags...`)
  for (const t of allTags.values()) {
    await sql`INSERT INTO "tags" ("id", "name", "slug") VALUES (${t.id}, ${t.name}, ${t.slug})`
  }
  const allCategories = new Map<string, { id: string; name: string; slug: string }>()
  for (const c of coursesData) allCategories.set(c.category.id, c.category)
  console.log(`📁 Inserindo ${allCategories.size} categorias...`)
  for (const c of allCategories.values()) {
    await sql`INSERT INTO "categories" ("id", "name", "slug") VALUES (${c.id}, ${c.name}, ${c.slug})`
  }
  for (const c of coursesData) {
    await sql`
      INSERT INTO "courses" ("id", "title", "slug", "description", "long_description", "price", "image",
                             "category_id", "instructor_id", "duration", "workload", "level", "featured", "available", "created_at")
      VALUES (${c.id}, ${c.title}, ${c.slug}, ${c.description}, ${c.longDescription}, ${c.price}, ${c.image},
              ${c.category.id}, ${c.instructor.id}, ${c.duration}, ${c.workload}, ${c.level},
              ${c.featured}, ${c.available}, ${c.createdAt})
    `
    for (const t of c.tags) {
      await sql`INSERT INTO "course_tags" ("course_id", "tag_id") VALUES (${c.id}, ${t.id}) ON CONFLICT DO NOTHING`
    }
  }

  const eventsData = loadDataFile<{ events: Array<{
    id: string; title: string; slug: string; description: string; longDescription?: string;
    date: string; time: string; location: string; kind: "evento" | "programacao";
    type: "online" | "presencial" | "hibrido"; image: string; price?: number;
    available: boolean; featured: boolean;
    category: { id: string; name: string; slug: string };
    tags: Array<{ id: string; name: string; slug: string }>
  }> }>("src/data/events.ts").events
  console.log(`📅 Inserindo ${eventsData.length} eventos/programações...`)
  for (const e of eventsData) {
    if (!allCategories.has(e.category.id)) allCategories.set(e.category.id, e.category)
    for (const t of e.tags) allTags.set(t.id, t)
  }
  for (const c of allCategories.values()) {
    await sql`INSERT INTO "categories" ("id", "name", "slug") VALUES (${c.id}, ${c.name}, ${c.slug}) ON CONFLICT DO NOTHING`
  }
  for (const t of allTags.values()) {
    await sql`INSERT INTO "tags" ("id", "name", "slug") VALUES (${t.id}, ${t.name}, ${t.slug}) ON CONFLICT DO NOTHING`
  }
  for (const e of eventsData) {
    await sql`
      INSERT INTO "events" ("id", "title", "slug", "description", "long_description", "date", "time",
                            "location", "kind", "type", "image", "price", "available", "featured", "category_id")
      VALUES (${e.id}, ${e.title}, ${e.slug}, ${e.description}, ${e.longDescription ?? ""}, ${e.date}, ${e.time},
              ${e.location}, ${e.kind}, ${e.type}, ${e.image}, ${e.price ?? null},
              ${e.available}, ${e.featured}, ${e.category.id})
    `
    for (const t of e.tags) {
      await sql`INSERT INTO "event_tags" ("event_id", "tag_id") VALUES (${e.id}, ${t.id}) ON CONFLICT DO NOTHING`
    }
  }

  const cartells = loadDataFile<{ carteis: Array<{
    id: string; name: string; slug: string; description?: string;
    meetingDay: string; meetingTime: string; frequency: string;
    moreOneName: string; moreOneWhatsapp: string; available: boolean; createdAt: string
  }> }>("src/data/carteis.ts").carteis
  console.log(`🔗 Inserindo ${cartells.length} cartéis...`)
  for (const c of cartells) {
    await sql`
      INSERT INTO "cartells" ("id", "name", "slug", "description", "meeting_day", "meeting_time",
                              "frequency", "more_one_name", "more_one_whatsapp", "available", "created_at")
      VALUES (${c.id}, ${c.name}, ${c.slug}, ${c.description ?? ""}, ${c.meetingDay}, ${c.meetingTime},
              ${c.frequency}, ${c.moreOneName}, ${c.moreOneWhatsapp}, ${c.available}, ${c.createdAt})
    `
  }

  const analysts = loadDataFile<{ analysts: Array<{
    id: string; name: string; state: string; city: string; whatsapp: string;
    available: boolean; createdAt: string
  }> }>("src/data/analysts.ts").analysts
  console.log(`🧠 Inserindo ${analysts.length} analistas...`)
  for (const a of analysts) {
    await sql`
      INSERT INTO "analysts" ("id", "name", "state", "city", "whatsapp", "available", "created_at")
      VALUES (${a.id}, ${a.name}, ${a.state}, ${a.city}, ${a.whatsapp}, ${a.available}, ${a.createdAt})
    `
  }

  const supervisions = loadDataFile<{ supervisions: Array<{
    id: string; supervisorName: string; date: string; time: string; frequency: string;
    whatsapp: string; description?: string; available: boolean; createdAt: string
  }> }>("src/data/supervisions.ts").supervisions
  console.log(`👁️ Inserindo ${supervisions.length} supervisões...`)
  for (const s of supervisions) {
    await sql`
      INSERT INTO "supervisions" ("id", "supervisor_name", "date", "time", "frequency",
                                   "whatsapp", "description", "available", "created_at")
      VALUES (${s.id}, ${s.supervisorName}, ${s.date}, ${s.time}, ${s.frequency},
              ${s.whatsapp}, ${s.description ?? ""}, ${s.available}, ${s.createdAt})
    `
  }

  const formacaoContents = loadDataFile<{ formacaoContents: Array<{
    id: string; key: string; content: string; updatedAt: string
  }> }>("src/data/formacao-content.ts").formacaoContents
  console.log(`📜 Inserindo ${formacaoContents.length} conteúdos de formação...`)
  for (const f of formacaoContents) {
    await sql`
      INSERT INTO "formacao_contents" ("id", "key", "content", "updated_at")
      VALUES (${f.id}, ${f.key}, ${f.content}, ${f.updatedAt})
    `
  }

  const testimonials = loadDataFile<{ testimonials: Array<{
    id: string; name: string; role: string; avatar: string; content: string;
    rating?: number; featured?: boolean; createdAt: string
  }> }>("src/data/testimonials.ts").testimonials
  console.log(`💬 Inserindo ${testimonials.length} testemunhos...`)
  for (const t of testimonials) {
    await sql`
      INSERT INTO "testimonials" ("id", "name", "role", "avatar", "content", "rating", "featured", "created_at")
      VALUES (${t.id}, ${t.name}, ${t.role}, ${t.avatar}, ${t.content},
              ${t.rating ?? null}, ${t.featured ?? false}, ${t.createdAt})
    `
  }

  console.log("⚙️ Inserindo site_config...")
  await sql`
    INSERT INTO "site_config" (
      "id", "title", "short_name", "description", "url", "email", "whatsapp", "phone", "address",
      "social_links", "seo_title_template", "seo_default_description", "seo_og_image"
    ) VALUES (
      1,
      ${"Sociedade Psicanalítica Online"},
      ${"SPO"},
      ${"Formação e Saber em Psicanálise. A Sociedade Psicanalítica Online dedica-se à transmissão da psicanálise clássica e contemporânea."},
      ${"https://spo.com.br"},
      ${"contato@spo.com.br"},
      ${"5522998391755"},
      ${"+55 (11) 99999-9999"},
      ${"São Paulo, SP"},
      ${sql.array([
        '{"label":"Instagram","href":"https://instagram.com/spo","icon":"instagram"}',
        '{"label":"YouTube","href":"https://youtube.com/@spo","icon":"youtube"}',
        '{"label":"LinkedIn","href":"https://linkedin.com/company/spo","icon":"linkedin"}',
      ])},
      ${"%s | SPO - Sociedade Psicanalítica Online"},
      ${"Formação e Saber em Psicanálise. Seminários, eventos e conteúdo psicanalítico de alto nível."},
      ${"/images/og-image.jpg"}
    )
  `

  console.log("✅ Seed concluído com sucesso!")
  console.log("")
  console.log("👤 Superadmin criado:")
  console.log("   Email: sociedadepsicanaliticaonline@gmail.com")
  console.log("   Senha: spopublic@2026")
  console.log("   ⚠️  Altere a senha no primeiro login!")

  await sql.end()
}

main().catch((err) => {
  console.error("❌ Erro no seed:", err)
  process.exit(1)
})
