import { notFound } from "next/navigation"
import { CourseCard } from "@/components/cards/course-card"
import { CTASection } from "@/components/sections/cta-section"
import { Container } from "@/components/layout/container"
import { StaggerContainer, StaggerItem } from "@/components/shared/animations"
import { HeroSection } from "@/components/sections/hero-section"
import { getAllCourses, getCourseBySlug } from "@/db/queries"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const course = await getCourseBySlug(slug)
  if (!course) return {}
  return {
    title: course.title,
    description: course.description,
    alternates: { canonical: `${siteConfig.url}/seminarios/${slug}` },
  }
}

export default async function SeminarioSlugPage({ params }: Props) {
  const { slug } = await params
  const course = await getCourseBySlug(slug)
  if (!course) notFound()
  const allCourses = await getAllCourses()
  const related = allCourses
    .filter((c) => c.id !== course.id && c.category.id === course.category.id)
    .slice(0, 3)

  return (
    <>
      <HeroSection
        variant="internal"
        title={course.title}
        subtitle={course.category.name}
        description={course.description}
        badge={course.available ? "Inscrições Abertas" : "Encerrado"}
      />

      <section className="py-16 md:py-24 bg-white">
        <Container className="max-w-3xl space-y-8">
          <div className="space-y-4">
            <h2 className="heading-md text-text">Sobre o Seminário</h2>
            <div className="text-text-light body-md leading-relaxed whitespace-pre-line">
              {course.longDescription || course.description}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 p-6 rounded-xl border border-border bg-surface">
            <div>
              <p className="body-sm text-text-light">Duração</p>
              <p className="body-md font-medium text-text">{course.duration}</p>
            </div>
            <div>
              <p className="body-sm text-text-light">Carga horária</p>
              <p className="body-md font-medium text-text">{course.workload}</p>
            </div>
            <div>
              <p className="body-sm text-text-light">Nível</p>
              <p className="body-md font-medium text-text capitalize">{course.level}</p>
            </div>
            <div>
              <p className="body-sm text-text-light">Investimento</p>
              <p className="body-md font-medium text-text">
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(course.price)}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="py-16 md:py-24 bg-surface">
          <Container>
            <h2 className="heading-md text-text mb-8">Outros seminários</h2>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {related.map((c) => (
                <StaggerItem key={c.id}>
                  <CourseCard course={c} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Container>
        </section>
      )}

      <CTASection
        variant="banner"
        title="Quer saber mais sobre este seminário?"
        description="Entre em contato conosco para tirar dúvidas e fazer sua inscrição."
        cta={{ id: "cta-sem-slug", title: "", description: "", buttonText: "Fale Conosco", buttonHref: `https://wa.me/${siteConfig.whatsapp}`, variant: "primary" }}
      />
    </>
  )
}
