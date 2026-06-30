import { notFound } from "next/navigation"
import Image from "next/image"
import { Calendar, Clock, BarChart3, BookOpen, Tag, ArrowRight } from "lucide-react"
import { HeroSection } from "@/components/sections/hero-section"
import { CTASection } from "@/components/sections/cta-section"
import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { courses } from "@/data/courses"
import { siteConfig } from "@/config/site"
import { formatPrice } from "@/utils/formatters"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const course = courses.find((c) => c.slug === slug)
  if (!course) return {}
  return {
    title: course.title,
    description: course.description,
    alternates: { canonical: `${siteConfig.url}/seminarios/${slug}` },
  }
}

export default async function CursoSlugPage({ params }: Props) {
  const { slug } = await params
  const course = courses.find((c) => c.slug === slug)
  if (!course) notFound()

  const levelLabel = {
    iniciante: "Iniciante",
    intermediário: "Intermediário",
    avançado: "Avançado",
  }

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.title,
      sameAs: siteConfig.url,
    },
    instructor: {
      "@type": "Person",
      name: course.instructor.name,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <HeroSection
        variant="course"
        title={course.title}
        subtitle={course.category.name}
        description={course.description}
        cta={{ id: "cta-curso-detail", title: "", description: "", buttonText: "Matricule-se Agora", buttonHref: "#matricula", variant: "primary" }}
        badge={course.available ? "Inscrições Abertas" : "Em Breve"}
      />

      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <div className="space-y-4">
                <h2 className="heading-md text-text">Sobre o Seminário</h2>
                <div className="prose prose-lg max-w-none text-text-light body-md leading-relaxed whitespace-pre-line">
                  {course.longDescription}
                </div>
              </div>

              <div className="border-t border-border pt-8">
                <h2 className="heading-md text-text mb-4">Informações Gerais</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="p-4 rounded-xl bg-surface text-center space-y-2">
                    <Clock className="h-5 w-5 text-primary mx-auto" />
                    <p className="body-sm text-text-light">Duração</p>
                    <p className="body-md font-medium text-text">{course.duration}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface text-center space-y-2">
                    <BookOpen className="h-5 w-5 text-primary mx-auto" />
                    <p className="body-sm text-text-light">Carga Horária</p>
                    <p className="body-md font-medium text-text">{course.workload}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface text-center space-y-2">
                    <BarChart3 className="h-5 w-5 text-primary mx-auto" />
                    <p className="body-sm text-text-light">Nível</p>
                    <p className="body-md font-medium text-text">{levelLabel[course.level]}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface text-center space-y-2">
                    <Calendar className="h-5 w-5 text-primary mx-auto" />
                    <p className="body-sm text-text-light">Investimento</p>
                    <p className="heading-md text-primary">{formatPrice(course.price)}</p>
                  </div>
                </div>
              </div>

              {course.tags.length > 0 && (
                <div className="border-t border-border pt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="h-5 w-5 text-primary" />
                    <h2 className="heading-md text-text">Tags</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <Badge key={tag.id} variant="secondary">{tag.name}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div className="sticky top-24 space-y-8">
                <div className="p-6 rounded-xl border border-border bg-surface text-center space-y-4">
                  <p className="body-sm text-text-light">Investimento</p>
                  <p className="display-md text-primary font-bold">{formatPrice(course.price)}</p>
                  <p className="body-sm text-text-light">à vista no PIX</p>
                  <p className="body-md text-text">ou 6x de R$ 100,00 no cartão</p>
                  <div className="space-y-2 pt-2">
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp}`}
                      className="block w-full py-3 px-6 rounded-lg bg-primary text-white body-md font-medium text-center hover:bg-primary-light transition-all"
                    >
                      Matricule-se pelo WhatsApp
                    </a>
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp}`}
                      className="block w-full py-3 px-6 rounded-lg border-2 border-primary text-primary body-md font-medium text-center hover:bg-primary/5 transition-all"
                    >
                      Tire suas Dúvidas
                    </a>
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-border bg-surface">
                  <h3 className="heading-sm text-text mb-4">Coordenação</h3>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                      <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="body-md font-medium text-text">{course.instructor.name}</p>
                      <p className="body-sm text-text-light">{course.instructor.role}</p>
                    </div>
                  </div>
                  {course.instructor.bio && (
                    <p className="body-sm text-text-light mt-3 pt-3 border-t border-border">
                      {course.instructor.bio}
                    </p>
                  )}
                </div>

                <div className="p-6 rounded-xl border border-border bg-surface">
                  <h3 className="heading-sm text-text mb-3">Categoria</h3>
                  <Badge variant="secondary" className="body-sm">{course.category.name}</Badge>
                  <h3 className="heading-sm text-text mt-6 mb-3">Disponibilidade</h3>
                  <p className={`body-md font-medium ${course.available ? "text-green-600" : "text-text-light"}`}>
                    {course.available ? "Vagas disponíveis" : "Em breve"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="matricula" className="py-16 md:py-24 bg-surface">
        <Container className="max-w-2xl text-center space-y-6">
          <h2 className="heading-lg text-text">Matrícula</h2>
          <p className="body-lg text-text-light">
            Para se matricular neste seminário, entre em contato conosco através do formulário de contato
            ou diretamente pelo WhatsApp. Nossa equipe irá orientá-lo sobre o processo de matrícula
            e formas de pagamento.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              className="inline-flex items-center gap-2 py-3 px-8 rounded-lg bg-primary text-white body-lg font-medium hover:bg-primary-light transition-all"
            >
              Fale Conosco <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              className="inline-flex items-center gap-2 py-3 px-8 rounded-lg border-2 border-primary text-primary body-lg font-medium hover:bg-primary/5 transition-all"
            >
              WhatsApp
            </a>
          </div>
        </Container>
      </section>

      <CTASection
        variant="vertical"
        title="Conheça Outros Seminários"
        description="Explore nossa grade completa de seminários de formação em psicanálise."
        cta={{ id: "cta-curso-slug", title: "", description: "", buttonText: "Ver Todos os Seminários", buttonHref: "/seminarios", variant: "primary" }}
      />
    </>
  )
}
