import { HeroSection } from "@/components/sections/hero-section"
import { CTASection } from "@/components/sections/cta-section"
import { Container } from "@/components/layout/container"
import { StaggerContainer, StaggerItem } from "@/components/shared/animations"
import { CardBase } from "@/components/cards/card-base"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MessageCircle, Repeat } from "lucide-react"
import { getAvailableCartels, getAllCartels } from "@/db/queries"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Cartéis",
  description:
    "Conheça os cartéis disponíveis na SPO. Dispositivos fundamentais da formação psicanalítica em pequenos grupos.",
  alternates: { canonical: `${siteConfig.url}/carteis` },
}

export default async function CarteisPage() {
  const [available, all] = await Promise.all([
    getAvailableCartels(),
    getAllCartels(),
  ])
  const unavailable = all.filter((c) => !c.available)

  return (
    <>
      <HeroSection
        variant="internal"
        title="Cartéis"
        subtitle="Formação em Grupo"
        description="O cartel é um dispositivo fundamental da formação psicanalítica: um pequeno grupo de trabalho que se reúne regularmente para estudar e discutir um tema, produzindo saber a partir da experiência coletiva."
        badge="Dispositivo de Formação"
      />

      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="heading-md text-text">Cartéis Disponíveis</h2>
            <p className="body-lg text-text-light">
              Entre em contato com o(a) "Mais Um" do cartel de seu interesse para saber sobre vagas e processo de inscrição.
            </p>
          </div>

          {available.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {available.map((cartel) => (
                <StaggerItem key={cartel.id}>
                  <CardBase className="group h-full flex flex-col gap-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Badge variant="secondary" className="mb-2">Vagas Abertas</Badge>
                        <h3 className="heading-md text-text group-hover:text-primary transition-colors">
                          {cartel.name}
                        </h3>
                      </div>
                    </div>

                    {cartel.description && (
                      <p className="body-md text-text-light">{cartel.description}</p>
                    )}

                    <div className="space-y-3 pt-4 border-t border-border">
                      <div className="flex items-center gap-3 body-sm text-text-light">
                        <Calendar className="h-4 w-4 text-primary shrink-0" />
                        <span>{cartel.meetingDay}</span>
                      </div>
                      <div className="flex items-center gap-3 body-sm text-text-light">
                        <Clock className="h-4 w-4 text-primary shrink-0" />
                        <span>{cartel.meetingTime}</span>
                      </div>
                      <div className="flex items-center gap-3 body-sm text-text-light">
                        <Repeat className="h-4 w-4 text-primary shrink-0" />
                        <span>{cartel.frequency}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border mt-auto space-y-3">
                      <div>
                        <p className="body-sm text-text-light">Mais Um</p>
                        <p className="body-md font-medium text-text">{cartel.moreOneName}</p>
                      </div>
                      <a
                        href={`https://wa.me/${cartel.moreOneWhatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 w-full justify-center py-2.5 px-4 rounded-lg bg-primary text-white body-md font-medium hover:bg-primary-light transition-all"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Falar pelo WhatsApp
                      </a>
                    </div>
                  </CardBase>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <p className="text-center body-lg text-text-light">
              Nenhum cartel com vagas abertas no momento. Entre em contato para saber sobre novas turmas.
            </p>
          )}
        </Container>
      </section>

      {unavailable.length > 0 && (
        <section className="py-16 md:py-24 bg-surface">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <h2 className="heading-md text-text">Cartéis em Andamento</h2>
              <p className="body-lg text-text-light">
                Cartéis atualmente em funcionamento, sem vagas abertas no momento.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {unavailable.map((cartel) => (
                <CardBase key={cartel.id} className="opacity-75">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="heading-md text-text">{cartel.name}</h3>
                      <Badge variant="outline">Em andamento</Badge>
                    </div>
                    {cartel.description && (
                      <p className="body-md text-text-light">{cartel.description}</p>
                    )}
                    <div className="space-y-2 pt-3 border-t border-border body-sm text-text-light">
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        {cartel.meetingDay} às {cartel.meetingTime}
                      </p>
                      <p className="flex items-center gap-2">
                        <Repeat className="h-4 w-4 text-primary" />
                        {cartel.frequency}
                      </p>
                    </div>
                  </div>
                </CardBase>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection
        variant="vertical"
        title="Quer participar de um cartel?"
        description="Entre em contato com o(a) Mais Um do cartel de seu interesse para saber sobre disponibilidade de vagas."
        cta={{
          id: "cta-carteis",
          title: "",
          description: "",
          buttonText: "Fale pelo WhatsApp",
          buttonHref: `https://wa.me/${siteConfig.whatsapp}`,
          variant: "primary",
        }}
      />
    </>
  )
}
