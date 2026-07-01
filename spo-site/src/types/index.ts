export interface Author {
  id: string
  name: string
  avatar: string
  role: string
  bio?: string
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface NavigationItem {
  id: string
  label: string
  href: string
  children?: NavigationItem[]
}

export interface Course {
  id: string
  title: string
  slug: string
  description: string
  longDescription?: string
  price: number
  image: string
  category: Category
  instructor: Author
  duration: string
  workload: string
  level: "iniciante" | "intermediário" | "avançado"
  featured: boolean
  available: boolean
  tags: Tag[]
  createdAt: string
}

export interface Event {
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
  category: Category
  tags: Tag[]
}

export interface Coordinator {
  id: string
  name: string
  slug: string
  avatar: string
  role: string
  bio: string
  specialties: string[]
  education: string[]
  socialLinks?: {
    linkedin?: string
    lattes?: string
  }
}

export interface Cartel {
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
}

export interface Analyst {
  id: string
  name: string
  state: string
  city: string
  whatsapp: string
  available: boolean
  createdAt: string
}

export interface Supervision {
  id: string
  supervisorName: string
  date: string
  time: string
  frequency: string
  whatsapp: string
  description?: string
  available: boolean
  createdAt: string
}

export type FormacaoContentKey =
  | "nossa-proposta"
  | "analises-intro"
  | "supervisoes-intro"

export interface FormacaoContent {
  id: string
  key: FormacaoContentKey
  content: string
  updatedAt: string
}

export interface MediaItem {
  id: string
  name: string
  type: "image" | "pdf" | "other"
  mimeType: string
  size: number
  url: string
  uploadedAt: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  avatar: string
  content: string
  rating?: number
  featured?: boolean
  createdAt: string
}

export interface CTA {
  id: string
  title: string
  description: string
  buttonText: string
  buttonHref: string
  variant: "primary" | "accent" | "outline"
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
}

export interface FooterColumn {
  id: string
  title: string
  links: {
    label: string
    href: string
  }[]
}

export interface SocialLink {
  label: string
  href: string
  icon: string
}

export interface SiteConfig {
  title: string
  shortName: string
  description: string
  url: string
  email: string
  whatsapp: string
  phone: string
  address: string
  socialLinks: SocialLink[]
  seo: {
    titleTemplate: string
    defaultDescription: string
    ogImage: string
  }
}
