import { Calendar, Repeat } from "lucide-react"

import { HeroSection } from "@/components/sections/hero-section"
import { CTASection } from "@/components/sections/cta-section"
import { Container } from "@/components/layout/container"
import { SectionHeader } from "@/components/sections/section-header"
import { StaggerContainer, StaggerItem } from "@/components/shared/animations"
import { EventCard } from "@/components/cards/event-card"
import { getEventos, getProgramacoes } from "@/data/events"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Eventos",
  description: "Agenda de eventos, webinários, jornadas e programações da Sociedade Psicanalítica Online.",
  alternates: { canonical: `${siteConfig.url}/eventos` },
}

export default function EventosPage() {
  const allEventos = getEventos()
  const allProgramacoes = getProgramacoes()

  const upcomingEventos = allEventos.filter((e) => e.available)
  const pastEventos = allEventos.filter((e) => !e.available)
  const programacoesAtivas = allProgramacoes.filter((p) => p.available)

  return (
    <>
      <HeroSection
        variant="internal"
        title="Eventos"
        subtitle="Agenda SPO"
        description="Webinários, jornadas, grupos de estudo, congressos e programações recorrentes. Acompanhe a agenda completa da SPO."
        badge={`${upcomingEventos.length + programacoesAtivas.length} atividades disponíveis`}
      />

      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary caption font-medium">
              <Calendar className="h-4 w-4" />
              Eventos
            </div>
            <h2 className="heading-md text-text">Próximos Eventos</h2>
            <p className="body-lg text-text-light">
              Encontros pontuais com inscrições abertas. Confira datas e garanta sua vaga.
            </p>
          </div>

          {upcomingEventos.length > 0 ? (
            <StaggerContainer className="space-y-4">
              {upcomingEventos.map((event) => (
                <StaggerItem key={event.id}>
                  <EventCard event={event} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <p className="text-center body-lg text-text-light">
              Nenhum evento com inscrições abertas no momento.
            </p>
          )}
        </Container>
      </section>

      {pastEventos.length > 0 && (
        <section className="py-16 md:py-24 bg-surface">
          <Container>
            <SectionHeader
              title="Eventos Anteriores"
              subtitle="Arquivo"
              description="Registro dos eventos já realizados pela SPO."
            />
            <StaggerContainer className="space-y-4">
              {pastEventos.map((event) => (
                <StaggerItem key={event.id}>
                  <EventCard event={event} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Container>
        </section>
      )}

      <section className="py-16 md:py-24 bg-white border-t border-border">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent caption font-medium">
              <Repeat className="h-4 w-4" />
              Programações
            </div>
            <h2 className="heading-md text-text">Programações Recorrentes</h2>
            <p className="body-lg text-text-light">
              Atividades com frequência regular — geralmente semanais. Entre em contato para saber sobre novas turmas e disponibilidade de vagas.
            </p>
          </div>

          {programacoesAtivas.length > 0 ? (
            <StaggerContainer className="space-y-4">
              {programacoesAtivas.map((event) => (
                <StaggerItem key={event.id}>
                  <EventCard event={event} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <p className="text-center body-lg text-text-light">
              Nenhuma programação com vagas abertas no momento. Entre em contato para saber sobre novas turmas.
            </p>
          )}
        </Container>
      </section>

      <CTASection
        variant="horizontal"
        title="Quer propor um evento ou programação?"
        description="A SPO está aberta a parcerias e propostas de eventos acadêmicos."
        cta={{ id: "cta-eventos", title: "", description: "", buttonText: "Entre em Contato", buttonHref: `https://wa.me/${siteConfig.whatsapp}`, variant: "primary" }}
      />
    </>
  )
}
