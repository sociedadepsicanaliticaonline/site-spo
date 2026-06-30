import { HeroSection } from "@/components/sections/hero-section"
import { CTASection } from "@/components/sections/cta-section"
import { Container } from "@/components/layout/container"
import { SectionHeader } from "@/components/sections/section-header"
import { StaggerContainer, StaggerItem } from "@/components/shared/animations"
import { CoordinatorCard } from "@/components/cards/coordinator-card"
import { coordinators } from "@/data/coordinators"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Coordenadores",
  description: "Conheça a equipe de coordenadores e professores da Sociedade Psicanalítica Online.",
  alternates: { canonical: `${siteConfig.url}/coordenadores` },
}

export default function CoordenadoresPage() {
  return (
    <>
      <HeroSection
        variant="internal"
        title="Coordenadores"
        subtitle="Equipe SPO"
        description="Conheça os profissionais que coordenam nossos seminários e programas de formação, responsáveis pela transmissão rigorosa do saber psicanalítico."
        badge="Corpo Docente"
      />

      <section className="py-16 md:py-24 bg-white">
        <Container>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coordinators.map((coordinator) => (
              <StaggerItem key={coordinator.id}>
                <CoordinatorCard coordinator={coordinator} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      <CTASection
        variant="horizontal"
        title="Quer fazer parte do nosso corpo docente?"
        description="A SPO está sempre aberta a novos talentos. Entre em contato conosco."
        cta={{ id: "cta-coord", title: "", description: "", buttonText: "Entre em Contato", buttonHref: `https://wa.me/${siteConfig.whatsapp}`, variant: "primary" }}
      />
    </>
  )
}
