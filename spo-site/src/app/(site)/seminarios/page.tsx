import { HeroSection } from "@/components/sections/hero-section"
import { CTASection } from "@/components/sections/cta-section"
import { Container } from "@/components/layout/container"
import { StaggerContainer, StaggerItem } from "@/components/shared/animations"
import { CourseCard } from "@/components/cards/course-card"
import { getAllCourses } from "@/db/queries"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Seminários",
  description: "Conheça todos os seminários de formação em psicanálise oferecidos pela SPO.",
  alternates: { canonical: `${siteConfig.url}/seminarios` },
}

export default async function CursosPage() {
  const allCourses = await getAllCourses()
  const available = allCourses.filter((c) => c.available)

  return (
    <>
      <HeroSection
        variant="internal"
        title="Nossos Seminários"
        subtitle="Formação Continuada"
        description="Seminários de formação em psicanálise com abordagem teórica e clínica, ministrados por profissionais experientes e reconhecidos."
        badge={`${available.length} seminários disponíveis`}
      />

      <section className="py-16 md:py-24 bg-surface">
        <Container>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {available.map((course) => (
              <StaggerItem key={course.id}>
                <CourseCard course={course} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      <CTASection
        variant="vertical"
        title="Não encontrou o seminário ideal?"
        description="Entre em contato conosco para receber orientação personalizada sobre qual seminário atende melhor suas necessidades."
        cta={{ id: "cta-seminarios", title: "", description: "", buttonText: "Fale Conosco", buttonHref: `https://wa.me/${siteConfig.whatsapp}`, variant: "primary" }}
      />
    </>
  )
}
