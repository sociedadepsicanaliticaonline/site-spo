import { HeroSection } from "@/components/sections/hero-section"
import { CTASection } from "@/components/sections/cta-section"
import { Container } from "@/components/layout/container"
import { SectionHeader } from "@/components/sections/section-header"
import { StaggerContainer, StaggerItem } from "@/components/shared/animations"
import { EventCard } from "@/components/cards/event-card"
import { events } from "@/data/events"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Eventos",
  description: "Agenda de eventos, webinários e jornadas da Sociedade Psicanalítica Online.",
  alternates: { canonical: `${siteConfig.url}/eventos` },
}

export default function EventosPage() {
  const upcomingEvents = events.filter((e) => e.available)
  const pastEvents = events.filter((e) => !e.available)

  return (
    <>
      <HeroSection
        variant="internal"
        title="Eventos"
        subtitle="Agenda SPO"
        description="Webinários, jornadas, grupos de estudo e congressos. Acompanhe a agenda completa de eventos da SPO."
        badge="Próximos eventos"
      />

      <section className="py-16 md:py-24 bg-white">
        <Container>
          <SectionHeader
            title="Próximos Eventos"
            subtitle="Agenda"
            description="Eventos agendados com inscrições abertas."
          />
          <StaggerContainer className="space-y-4">
            {upcomingEvents.map((event) => (
              <StaggerItem key={event.id}>
                <EventCard event={event} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {pastEvents.length > 0 && (
        <section className="py-16 md:py-24 bg-surface">
          <Container>
            <SectionHeader
              title="Eventos Anteriores"
              subtitle="Arquivo"
              description="Registro dos eventos já realizados pela SPO."
            />
            <StaggerContainer className="space-y-4">
              {pastEvents.map((event) => (
                <StaggerItem key={event.id}>
                  <EventCard event={event} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Container>
        </section>
      )}

      <CTASection
        variant="horizontal"
        title="Quer propor um evento?"
        description="A SPO está aberta a parcerias e propostas de eventos acadêmicos."
        cta={{ id: "cta-eventos", title: "", description: "", buttonText: "Entre em Contato", buttonHref: `https://wa.me/${siteConfig.whatsapp}`, variant: "primary" }}
      />
    </>
  )
}
