import { z } from "zod"

export const categorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Nome da categoria é obrigatório"),
  slug: z.string().min(1, "Slug da categoria é obrigatório"),
})

export const authorSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Nome é obrigatório"),
  avatar: z.string(),
  role: z.string().min(1, "Cargo é obrigatório"),
  bio: z.string().optional(),
})

export const tagSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Nome da tag é obrigatório"),
  slug: z.string().min(1, "Slug da tag é obrigatório"),
})

export const blogPostSchema = z.object({
  id: z.string(),
  title: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
  slug: z.string().min(3, "Slug deve ter pelo menos 3 caracteres"),
  excerpt: z.string().min(10, "Resumo deve ter pelo menos 10 caracteres"),
  content: z.string().optional(),
  image: z.string().min(1, "Imagem é obrigatória"),
  author: authorSchema,
  category: categorySchema,
  tags: z.array(tagSchema).default([]),
  publishedAt: z.string().min(1, "Data de publicação é obrigatória"),
  featured: z.boolean().default(false),
  readingTime: z.string().min(1, "Tempo de leitura é obrigatório"),
})

export const courseSchema = z.object({
  id: z.string(),
  title: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
  slug: z.string().min(3, "Slug deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  longDescription: z.string().optional(),
  price: z.coerce.number().min(0, "Preço deve ser maior ou igual a 0"),
  image: z.string().min(1, "Imagem é obrigatória"),
  category: categorySchema,
  instructor: authorSchema,
  duration: z.string().min(1, "Duração é obrigatória"),
  workload: z.string().min(1, "Carga horária é obrigatória"),
  level: z.enum(["iniciante", "intermediário", "avançado"]),
  featured: z.boolean().default(false),
  available: z.boolean().default(true),
  tags: z.array(tagSchema).default([]),
  createdAt: z.string().min(1, "Data de criação é obrigatória"),
})

export const eventSchema = z.object({
  id: z.string(),
  title: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
  slug: z.string().min(3, "Slug deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  longDescription: z.string().optional(),
  date: z.string().min(1, "Data é obrigatória"),
  time: z.string().min(1, "Horário é obrigatório"),
  location: z.string().min(1, "Local é obrigatório"),
  kind: z.enum(["evento", "programacao"], {
    message: "Selecione se é um evento ou uma programação",
  }),
  type: z.enum(["online", "presencial", "hibrido"]),
  image: z.string().min(1, "Imagem é obrigatória"),
  price: z.coerce.number().optional(),
  available: z.boolean().default(true),
  featured: z.boolean().default(false),
  category: categorySchema,
  tags: z.array(tagSchema).default([]),
})

export const coordinatorSchema = z.object({
  id: z.string(),
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  slug: z.string().min(3, "Slug deve ter pelo menos 3 caracteres"),
  avatar: z.string().min(1, "Avatar é obrigatório"),
  role: z.string().min(1, "Cargo é obrigatório"),
  bio: z.string().min(10, "Bio deve ter pelo menos 10 caracteres"),
  specialties: z.array(z.string().min(1)).default([]),
  education: z.array(z.string().min(1)).default([]),
  socialLinks: z
    .object({
      linkedin: z.string().optional(),
      lattes: z.string().optional(),
    })
    .optional(),
})

export const testimonialSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Nome é obrigatório"),
  role: z.string().min(1, "Função é obrigatória"),
  avatar: z.string().min(1, "Avatar é obrigatório"),
  content: z.string().min(10, "Conteúdo deve ter pelo menos 10 caracteres"),
  rating: z.coerce.number().min(0).max(5).optional(),
  featured: z.boolean().default(false),
  createdAt: z.string().min(1, "Data é obrigatória"),
})

export const cartelSchema = z.object({
  id: z.string(),
  name: z.string().min(3, "Nome do cartel é obrigatório"),
  slug: z.string().min(3, "Slug é obrigatório"),
  description: z.string().optional(),
  meetingDay: z.string().min(1, "Dia do encontro é obrigatório"),
  meetingTime: z.string().min(1, "Horário do encontro é obrigatório"),
  frequency: z.string().min(1, "Frequência é obrigatória"),
  moreOneName: z.string().min(1, "Nome do Mais Um é obrigatório"),
  moreOneWhatsapp: z.string().min(8, "WhatsApp do Mais Um é obrigatório"),
  available: z.boolean().default(true),
  createdAt: z.string().min(1, "Data de criação é obrigatória"),
})

export const analystSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Nome do analista é obrigatório"),
  state: z.string().min(1, "Estado é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  whatsapp: z.string().min(8, "WhatsApp é obrigatório"),
  available: z.boolean().default(true),
  createdAt: z.string().min(1, "Data de cadastro é obrigatória"),
})

export const supervisionSchema = z.object({
  id: z.string(),
  supervisorName: z.string().min(2, "Nome do supervisor é obrigatório"),
  date: z.string().min(1, "Data é obrigatória"),
  time: z.string().min(1, "Horário é obrigatório"),
  frequency: z.string().min(1, "Frequência é obrigatória"),
  whatsapp: z.string().min(8, "WhatsApp é obrigatório"),
  description: z.string().optional(),
  available: z.boolean().default(true),
  createdAt: z.string().min(1, "Data de cadastro é obrigatória"),
})

export const formacaoContentSchema = z.object({
  id: z.string(),
  key: z.enum(["nossa-proposta", "analises-intro", "supervisoes-intro"]),
  content: z.string().min(1, "Conteúdo é obrigatório"),
  updatedAt: z.string().min(1, "Data de atualização é obrigatória"),
})

export const socialLinkSchema = z.object({
  label: z.string().min(1, "Nome da rede é obrigatório"),
  href: z.string().min(1, "URL é obrigatória"),
  icon: z.string().min(1, "Ícone é obrigatório"),
})

export const siteConfigSchema = z.object({
  title: z.string().min(3, "Título do site é obrigatório"),
  shortName: z.string().min(1, "Nome curto é obrigatório"),
  description: z.string().min(10, "Descrição é obrigatória"),
  url: z.string().min(1, "URL é obrigatória"),
  email: z.string().email("E-mail inválido"),
  whatsapp: z.string().min(1, "WhatsApp é obrigatório"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  address: z.string().min(1, "Endereço é obrigatório"),
  socialLinks: z.array(socialLinkSchema).default([]),
  seo: z.object({
    titleTemplate: z.string().min(1, "Template de título é obrigatório"),
    defaultDescription: z.string().min(1, "Descrição padrão é obrigatória"),
    ogImage: z.string().min(1, "Imagem OG é obrigatória"),
  }),
})

export type BlogPostFormData = z.infer<typeof blogPostSchema>
export type CourseFormData = z.infer<typeof courseSchema>
export type EventFormData = z.infer<typeof eventSchema>
export type CoordinatorFormData = z.infer<typeof coordinatorSchema>
export type CartelFormData = z.infer<typeof cartelSchema>
export type TestimonialFormData = z.infer<typeof testimonialSchema>
export type SiteConfigFormData = z.infer<typeof siteConfigSchema>
export type AnalystFormData = z.infer<typeof analystSchema>
export type SupervisionFormData = z.infer<typeof supervisionSchema>
export type FormacaoContentFormData = z.infer<typeof formacaoContentSchema>
