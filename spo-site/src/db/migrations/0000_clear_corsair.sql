CREATE TYPE "public"."event_kind" AS ENUM('evento', 'programacao');--> statement-breakpoint
CREATE TYPE "public"."event_type" AS ENUM('online', 'presencial', 'hibrido');--> statement-breakpoint
CREATE TYPE "public"."media_type" AS ENUM('image', 'pdf', 'other');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin', 'superadmin');--> statement-breakpoint
CREATE TABLE "analysts" (
	"id" varchar(80) PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"state" varchar(40) NOT NULL,
	"city" varchar(120) NOT NULL,
	"whatsapp" varchar(40) NOT NULL,
	"available" boolean DEFAULT true NOT NULL,
	"created_at" date DEFAULT CURRENT_DATE NOT NULL
);
--> statement-breakpoint
CREATE TABLE "authors" (
	"id" varchar(80) PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"slug" varchar(200) NOT NULL,
	"avatar" text DEFAULT '' NOT NULL,
	"role" varchar(200) NOT NULL,
	"bio" text DEFAULT '' NOT NULL,
	"specialties" text[] DEFAULT '{}'::text[] NOT NULL,
	"education" text[] DEFAULT '{}'::text[] NOT NULL,
	"linkedin" text,
	"lattes" text
);
--> statement-breakpoint
CREATE TABLE "cartells" (
	"id" varchar(80) PRIMARY KEY NOT NULL,
	"name" varchar(300) NOT NULL,
	"slug" varchar(300) NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"meeting_day" varchar(80) NOT NULL,
	"meeting_time" varchar(40) NOT NULL,
	"frequency" varchar(80) NOT NULL,
	"more_one_name" varchar(200) NOT NULL,
	"more_one_whatsapp" varchar(40) NOT NULL,
	"available" boolean DEFAULT true NOT NULL,
	"created_at" date DEFAULT CURRENT_DATE NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" varchar(80) PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"slug" varchar(200) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course_tags" (
	"course_id" varchar(80) NOT NULL,
	"tag_id" varchar(80) NOT NULL,
	CONSTRAINT "course_tags_course_id_tag_id_pk" PRIMARY KEY("course_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" varchar(80) PRIMARY KEY NOT NULL,
	"title" varchar(300) NOT NULL,
	"slug" varchar(300) NOT NULL,
	"description" text NOT NULL,
	"long_description" text DEFAULT '' NOT NULL,
	"price" integer DEFAULT 0 NOT NULL,
	"image" text DEFAULT '' NOT NULL,
	"category_id" varchar(80) NOT NULL,
	"instructor_id" varchar(80) NOT NULL,
	"duration" varchar(80) DEFAULT '' NOT NULL,
	"workload" varchar(80) DEFAULT '' NOT NULL,
	"level" varchar(40) DEFAULT 'intermediário' NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"available" boolean DEFAULT true NOT NULL,
	"created_at" date DEFAULT CURRENT_DATE NOT NULL
);
--> statement-breakpoint
CREATE TABLE "event_tags" (
	"event_id" varchar(80) NOT NULL,
	"tag_id" varchar(80) NOT NULL,
	CONSTRAINT "event_tags_event_id_tag_id_pk" PRIMARY KEY("event_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" varchar(80) PRIMARY KEY NOT NULL,
	"title" varchar(300) NOT NULL,
	"slug" varchar(300) NOT NULL,
	"description" text NOT NULL,
	"long_description" text DEFAULT '' NOT NULL,
	"date" date NOT NULL,
	"time" time NOT NULL,
	"location" varchar(300) NOT NULL,
	"kind" "event_kind" DEFAULT 'evento' NOT NULL,
	"type" "event_type" DEFAULT 'online' NOT NULL,
	"image" text DEFAULT '' NOT NULL,
	"price" integer,
	"available" boolean DEFAULT true NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"category_id" varchar(80) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "formacao_contents" (
	"id" varchar(80) PRIMARY KEY NOT NULL,
	"key" varchar(80) NOT NULL,
	"content" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" varchar(80) PRIMARY KEY NOT NULL,
	"name" varchar(300) NOT NULL,
	"type" "media_type" NOT NULL,
	"mime_type" varchar(200) NOT NULL,
	"size" integer NOT NULL,
	"url" text NOT NULL,
	"uploaded_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_config" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"title" varchar(200) NOT NULL,
	"short_name" varchar(80) NOT NULL,
	"description" text NOT NULL,
	"url" varchar(300) NOT NULL,
	"email" varchar(320) NOT NULL,
	"whatsapp" varchar(40) NOT NULL,
	"phone" varchar(40) NOT NULL,
	"address" text NOT NULL,
	"social_links" text[] DEFAULT '{}'::text[] NOT NULL,
	"seo_title_template" text NOT NULL,
	"seo_default_description" text NOT NULL,
	"seo_og_image" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "supervisions" (
	"id" varchar(80) PRIMARY KEY NOT NULL,
	"supervisor_name" varchar(200) NOT NULL,
	"date" date NOT NULL,
	"time" time NOT NULL,
	"frequency" varchar(80) NOT NULL,
	"whatsapp" varchar(40) NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"available" boolean DEFAULT true NOT NULL,
	"created_at" date DEFAULT CURRENT_DATE NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" varchar(80) PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"slug" varchar(200) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" varchar(80) PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"role" varchar(200) NOT NULL,
	"avatar" text DEFAULT '' NOT NULL,
	"content" text NOT NULL,
	"rating" integer,
	"featured" boolean DEFAULT false NOT NULL,
	"created_at" date DEFAULT CURRENT_DATE NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"email" varchar(320) NOT NULL,
	"password_hash" text NOT NULL,
	"role" "user_role" DEFAULT 'admin' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "course_tags" ADD CONSTRAINT "course_tags_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_tags" ADD CONSTRAINT "course_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_tags" ADD CONSTRAINT "event_tags_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_tags" ADD CONSTRAINT "event_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "authors_slug_idx" ON "authors" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "cartells_slug_idx" ON "cartells" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "courses_slug_idx" ON "courses" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "courses_category_idx" ON "courses" USING btree ("category_id");--> statement-breakpoint
CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "events_date_idx" ON "events" USING btree ("date");--> statement-breakpoint
CREATE INDEX "events_kind_idx" ON "events" USING btree ("kind");--> statement-breakpoint
CREATE UNIQUE INDEX "formacao_contents_key_idx" ON "formacao_contents" USING btree ("key");--> statement-breakpoint
CREATE UNIQUE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");