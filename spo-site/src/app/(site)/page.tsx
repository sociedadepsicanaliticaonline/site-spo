import { siteConfig } from "@/config/site"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { StatsSection } from "@/components/sections/stats-section"
import { CoursesSection } from "@/components/sections/courses-section"
import { EventsSection } from "@/components/sections/events-section"
import { BlogSection } from "@/components/sections/blog-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { CTASection } from "@/components/sections/cta-section"
import { getFeaturedCourses } from "@/data/courses"
import { getUpcomingEvents } from "@/data/events"
import { getFeaturedPosts } from "@/data/blog"
import { testimonials } from "@/data/testimonials"
import { BookOpen, Users, Globe, Heart } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Formação e Saber em Psicanálise",
  description:
    "Dedicamo-nos à transmissão da psicanálise clássica e contemporânea, oferecendo seminários, eventos e supervisão clínica.",
  alternates: { canonical: `${siteConfig.url}` },
  openGraph: {
    title: "SPO — Formação e Saber em Psicanálise",
    description:
      "Formação e Saber em Psicanálise. Seminários, eventos e supervisão clínica para profissionais de todo o Brasil.",
  },
}

export default function HomePage() {
  const featuredCourses = getFeaturedCourses()
  const upcomingEvents = getUpcomingEvents()
  const featuredPosts = getFeaturedPosts()

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.title,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/busca?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HeroSection
        variant="home"
        title="Formação e Saber em Psicanálise"
        subtitle="O analista só se autoriza por si mesmo"
        description="Dedicamo-nos à transmissão da psicanálise clássica e contemporânea, oferecendo seminários, eventos e supervisão clínica para profissionais de todo o Brasil."
        badge="Formação continuada"
        image="/images/hero/lacan.jpg"
        cta={{ id: "cta-1", title: "", description: "", buttonText: "Conheça nossos seminários", buttonHref: "/seminarios", variant: "primary" }}
      />
      <FeaturesSection
        title="Nossos Pilares"
        subtitle="Fundamentos"
        description="A SPO se sustenta em quatro pilares fundamentais que orientam nossa proposta de formação."
        features={[
          {
            icon: <BookOpen className="h-6 w-6" />,
            title: "Formação Teórica",
            description: "Estudo aprofundado dos textos fundamentais da psicanálise, de Freud aos autores contemporâneos.",
          },
          {
            icon: <Users className="h-6 w-6" />,
            title: "Supervisão Clínica",
            description: "Grupos de supervisão para discussão de casos clínicos com psicanalistas experientes.",
          },
          {
            icon: <Globe className="h-6 w-6" />,
            title: "Comunidade Online",
            description: "Ambiente virtual de aprendizagem com fóruns, grupos de estudo e networking profissional.",
          },
          {
            icon: <Heart className="h-6 w-6" />,
            title: "Compromisso Ético",
            description: "Compromisso com a ética psicanalítica e a transmissão rigorosa do saber.",
          },
        ]}
        columns={4}
      />
      <StatsSection
        stats={[
          { value: "+500", label: "Alunos Formados" },
          { value: "+50", label: "Seminários Oferecidos" },
          { value: "+30", label: "Profissionais" },
          { value: "+10", label: "Anos de História" },
        ]}
      />
      <CoursesSection
        title="Seminários em Destaque"
        subtitle="Formação Continuada"
        description="Conheça nossos seminários de formação em psicanálise, com abordagem teórica e clínica."
        courses={featuredCourses}
        featured
      />
      <EventsSection
        title="Próximos Eventos"
        subtitle="Agenda SPO"
        description="Webinários, jornadas e grupos de estudo para aprofundar seu conhecimento."
        events={upcomingEvents}
      />
      <BlogSection
        title="Artigos & Reflexões"
        subtitle="Conteúdo"
        description="Artigos, ensaios e reflexões sobre psicanálise escritos por nossos professores e colaboradores."
        posts={featuredPosts}
        featured
      />
      <TestimonialsSection
        title="O Que Nossos Alunos Dizem"
        subtitle="Depoimentos"
        description="Acompanhe a experiência de quem já passou pela SPO."
        testimonials={testimonials}
      />
      <CTASection
        variant="vertical"
        title="Pronto para Transformar sua Prática Clínica?"
        description="Faça parte da SPO e aprofunde seu conhecimento em psicanálise com uma formação de excelência."
        cta={{ id: "cta-2", title: "", description: "", buttonText: "Inscreva-se Agora", buttonHref: "/seminarios", variant: "primary" }}
      />
    </>
  )
}

