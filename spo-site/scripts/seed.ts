import "dotenv/config"
import { createClient } from "@supabase/supabase-js"
import bcrypt from "bcryptjs"

import { coordinators } from "../src/data/coordinators"
import { courses } from "../src/data/courses"
import { events } from "../src/data/events"
import { carteis } from "../src/data/carteis"
import { analysts } from "../src/data/analysts"
import { supervisions } from "../src/data/supervisions"
import { formacaoContents } from "../src/data/formacao-content"
import { testimonials } from "../src/data/testimonials"

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

const REST_HEADERS = {
  apikey: SUPABASE_SERVICE_ROLE_KEY,
  Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=minimal",
}

async function restDelete(path: string, filter: string): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}?${filter}`, {
    method: "DELETE",
    headers: REST_HEADERS,
  })
  if (!res.ok && res.status !== 404) {
    const body = await res.text().catch(() => "")
    console.warn(`  ⚠️  DELETE ${path}: ${res.status} ${res.statusText} ${body}`)
  }
}

async function cleanup() {
  console.log("🔄 Limpando dados existentes...")
  // event_tags e course_tags: filtros baseados em colunas não-id
  await restDelete("event_tags", "event_id=gte.a")
  await restDelete("course_tags", "course_id=gte.a")
  // Tabelas com id varchar: usar neq com um id impossível
  for (const table of [
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
    "users",
  ]) {
    await restDelete(table, "id=neq.__never__")
  }
  // site_config: id é integer
  await restDelete("site_config", "id=gte.0")
}

async function main() {
  await cleanup()

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

  console.log(`👥 Inserindo ${coordinators.length} coordenadores/autores...`)
  for (const a of coordinators) {
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

  console.log(`📚 Inserindo ${courses.length} cursos...`)
  for (const c of courses) {
    const { error } = await supabase.from("courses").insert({
      id: c.id,
      title: c.title,
      slug: c.slug,
      description: c.description,
      long_description: c.longDescription,
      price: c.price,
      image: c.image,
      instructor_name: c.instructorName,
      duration: c.duration,
      workload: c.workload,
      featured: c.featured,
      available: c.available,
      created_at: c.createdAt,
    })
    if (error) throw error
  }

  console.log(`📅 Inserindo ${events.length} eventos/programações...`)
  for (const e of events) {
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
    })
    if (error) throw error
  }

  console.log(`🔗 Inserindo ${carteis.length} cartéis...`)
  for (const c of carteis) {
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

  console.log(`📜 Inserindo ${formacaoContents.length} conteúdos de formação...`)
  for (const f of formacaoContents) {
    await supabase.from("formacao_contents").insert({
      id: f.id,
      key: f.key,
      content: f.content,
      updated_at: f.updatedAt,
    })
  }

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
