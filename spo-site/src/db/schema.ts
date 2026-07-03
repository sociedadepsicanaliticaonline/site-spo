import {
  pgTable,
  text,
  varchar,
  boolean,
  integer,
  timestamp,
  date,
  time,
  index,
  uniqueIndex,
  pgEnum,
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const eventKindEnum = pgEnum("event_kind", ["evento", "programacao"])
export const eventTypeEnum = pgEnum("event_type", ["online", "presencial", "hibrido"])
export const userRoleEnum = pgEnum("user_role", ["admin", "superadmin"])
export const mediaTypeEnum = pgEnum("media_type", ["image", "pdf", "other"])

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: userRoleEnum("role").notNull().default("admin"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export const authors = pgTable(
  "authors",
  {
    id: varchar("id", { length: 80 }).primaryKey(),
    name: varchar("name", { length: 200 }).notNull(),
    slug: varchar("slug", { length: 200 }).notNull(),
    avatar: text("avatar").notNull().default(""),
    role: varchar("role", { length: 200 }).notNull(),
    bio: text("bio").notNull().default(""),
    specialties: text("specialties").array().notNull().default(sql`'{}'::text[]`),
    education: text("education").array().notNull().default(sql`'{}'::text[]`),
    linkedin: text("linkedin"),
    lattes: text("lattes"),
  },
  (t) => ({
    slugIdx: uniqueIndex("authors_slug_idx").on(t.slug),
  })
)

export const courses = pgTable(
  "courses",
  {
    id: varchar("id", { length: 80 }).primaryKey(),
    title: varchar("title", { length: 300 }).notNull(),
    slug: varchar("slug", { length: 300 }).notNull(),
    description: text("description").notNull(),
    longDescription: text("long_description").notNull().default(""),
    price: integer("price").notNull().default(0),
    image: text("image").notNull().default(""),
    instructorName: varchar("instructor_name", { length: 300 }).notNull().default(""),
    duration: varchar("duration", { length: 80 }).notNull().default(""),
    workload: varchar("workload", { length: 80 }).notNull().default(""),
    featured: boolean("featured").notNull().default(false),
    available: boolean("available").notNull().default(true),
    createdAt: date("created_at").notNull().default(sql`CURRENT_DATE`),
  },
  (t) => ({
    slugIdx: uniqueIndex("courses_slug_idx").on(t.slug),
  })
)

export const events = pgTable(
  "events",
  {
    id: varchar("id", { length: 80 }).primaryKey(),
    title: varchar("title", { length: 300 }).notNull(),
    slug: varchar("slug", { length: 300 }).notNull(),
    description: text("description").notNull(),
    longDescription: text("long_description").notNull().default(""),
    date: date("date").notNull(),
    time: time("time").notNull(),
    location: varchar("location", { length: 300 }).notNull(),
    kind: eventKindEnum("kind").notNull().default("evento"),
    type: eventTypeEnum("type").notNull().default("online"),
    image: text("image").notNull().default(""),
    price: integer("price"),
    available: boolean("available").notNull().default(true),
    featured: boolean("featured").notNull().default(false),
  },
  (t) => ({
    slugIdx: uniqueIndex("events_slug_idx").on(t.slug),
    dateIdx: index("events_date_idx").on(t.date),
    kindIdx: index("events_kind_idx").on(t.kind),
  })
)

export const cartells = pgTable(
  "cartells",
  {
    id: varchar("id", { length: 80 }).primaryKey(),
    name: varchar("name", { length: 300 }).notNull(),
    slug: varchar("slug", { length: 300 }).notNull(),
    description: text("description").notNull().default(""),
    meetingDay: varchar("meeting_day", { length: 80 }).notNull(),
    meetingTime: varchar("meeting_time", { length: 40 }).notNull(),
    frequency: varchar("frequency", { length: 80 }).notNull(),
    moreOneName: varchar("more_one_name", { length: 200 }).notNull(),
    moreOneWhatsapp: varchar("more_one_whatsapp", { length: 40 }).notNull(),
    available: boolean("available").notNull().default(true),
    createdAt: date("created_at").notNull().default(sql`CURRENT_DATE`),
  },
  (t) => ({
    slugIdx: uniqueIndex("cartells_slug_idx").on(t.slug),
  })
)

export const analysts = pgTable("analysts", {
  id: varchar("id", { length: 80 }).primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  state: varchar("state", { length: 40 }).notNull(),
  city: varchar("city", { length: 120 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 40 }).notNull(),
  available: boolean("available").notNull().default(true),
  createdAt: date("created_at").notNull().default(sql`CURRENT_DATE`),
})

export const supervisions = pgTable("supervisions", {
  id: varchar("id", { length: 80 }).primaryKey(),
  supervisorName: varchar("supervisor_name", { length: 200 }).notNull(),
  date: date("date").notNull(),
  time: time("time").notNull(),
  frequency: varchar("frequency", { length: 80 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 40 }).notNull(),
  description: text("description").notNull().default(""),
  available: boolean("available").notNull().default(true),
  createdAt: date("created_at").notNull().default(sql`CURRENT_DATE`),
})

export const formacaoContents = pgTable(
  "formacao_contents",
  {
    id: varchar("id", { length: 80 }).primaryKey(),
    key: varchar("key", { length: 80 }).notNull(),
    content: text("content").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    keyIdx: uniqueIndex("formacao_contents_key_idx").on(t.key),
  })
)

export const testimonials = pgTable("testimonials", {
  id: varchar("id", { length: 80 }).primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  role: varchar("role", { length: 200 }).notNull(),
  avatar: text("avatar").notNull().default(""),
  content: text("content").notNull(),
  rating: integer("rating"),
  featured: boolean("featured").notNull().default(false),
  createdAt: date("created_at").notNull().default(sql`CURRENT_DATE`),
})

export const media = pgTable("media", {
  id: varchar("id", { length: 80 }).primaryKey(),
  name: varchar("name", { length: 300 }).notNull(),
  type: mediaTypeEnum("type").notNull(),
  mimeType: varchar("mime_type", { length: 200 }).notNull(),
  size: integer("size").notNull(),
  url: text("url").notNull(),
  uploadedAt: timestamp("uploaded_at", { withTimezone: true }).notNull().defaultNow(),
})

export const siteConfig = pgTable("site_config", {
  id: integer("id").primaryKey().default(1),
  title: varchar("title", { length: 200 }).notNull(),
  shortName: varchar("short_name", { length: 80 }).notNull(),
  description: text("description").notNull(),
  url: varchar("url", { length: 300 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 40 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  address: text("address").notNull(),
  socialLinks: text("social_links").array().notNull().default(sql`'{}'::text[]`),
  seoTitleTemplate: text("seo_title_template").notNull(),
  seoDefaultDescription: text("seo_default_description").notNull(),
  seoOgImage: text("seo_og_image").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type CourseRow = typeof courses.$inferSelect
export type EventRow = typeof events.$inferSelect
export type CartelRow = typeof cartells.$inferSelect
export type AnalystRow = typeof analysts.$inferSelect
export type SupervisionRow = typeof supervisions.$inferSelect
export type FormacaoContentRow = typeof formacaoContents.$inferSelect
export type TestimonialRow = typeof testimonials.$inferSelect
export type MediaRow = typeof media.$inferSelect
export type AuthorRow = typeof authors.$inferSelect
export type SiteConfigRow = typeof siteConfig.$inferSelect
