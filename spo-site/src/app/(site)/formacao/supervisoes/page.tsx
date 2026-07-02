import { Calendar, Clock, MessageCircle, Repeat, UserCog } from "lucide-react"

import { HeroSection } from "@/components/sections/hero-section"
import { CTASection } from "@/components/sections/cta-section"
import { BreadcrumbNav } from "@/components/navigation/breadcrumb-nav"
import { Container } from "@/components/layout/container"
import { StaggerContainer, StaggerItem } from "@/components/shared/animations"
import { CardBase } from "@/components/cards/card-base"
import { Badge } from "@/components/ui/badge"
import { getAvailableSupervisions, getFormacaoContentByKey } from "@/db/queries"
import { renderRichText } from "@/utils/sanitize"
import { formatDate } from "@/utils/formatters"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Supervisões",
  description:
    "A importância da supervisão na formação do psicanalista e a lista de supervisões oferecidas pela SPO.",
  alternates: { canonical: `${siteConfig.url}/formacao/supervisoes` },
}

export default async function SupervisoesPage() {
  const [available, content] = await Promise.all([
    getAvailableSupervisions(),
    getFormacaoContentByKey("supervisoes-intro"),
  ])

  return (
    <>
      <HeroSection
        variant="internal"
        title="Supervisões"
        subtitle="Supervisão Clínica"
        description="A supervisão é um dos pilares da formação psicanalítica. Conheça os grupos de supervisão oferecidos pela SPO."
        badge="Pilar da Formação"
      />

      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8 mb-16">
            <BreadcrumbNav
              items={[
                { label: "Formação", href: "/formacao/nossa-proposta" },
                { label: "Supervisões" },
              ]}
            />
            <article
              className="prose prose-spo space-y-5 body-md text-text-light leading-relaxed [&_h2]:heading-md [&_h2]:text-text [&_h2]:mt-8 [&_h3]:heading-sm [&_h3]:text-text [&_h3]:mt-6 [&_p]:mb-4 [&_strong]:text-text [&_strong]:font-semibold [&_em]:italic [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic"
              dangerouslySetInnerHTML={{
                __html: renderRichText(content?.content || ""),
              }}
            />
          </div>

          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary caption font-medium">
              <UserCog className="h-4 w-4" />
              Grupos de supervisão
            </div>
            <h2 className="heading-md text-text">Supervisões oferecidas</h2>
            <p className="body-lg text-text-light">
              Entre em contato com o(a) supervisor(a) para saber sobre vagas e processo de inscrição.
            </p>
          </div>

          {available.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {available.map((supervision) => (
                <StaggerItem key={supervision.id}>
                  <CardBase className="group h-full flex flex-col gap-6">
                    <div>
                      <Badge variant="secondary" className="mb-2">Vagas Abertas</Badge>
                      <h3 className="heading-sm text-text group-hover:text-primary transition-colors">
                        Supervisão com {supervision.supervisorName}
                      </h3>
                    </div>

                    {supervision.description && (
                      <p className="body-md text-text-light">{supervision.description}</p>
                    )}

                    <div className="space-y-3 pt-4 border-t border-border">
                      <div className="flex items-center gap-3 body-sm text-text-light">
                        <Calendar className="h-4 w-4 text-primary shrink-0" />
                        <span>{formatDate(supervision.date)}</span>
                      </div>
                      <div className="flex items-center gap-3 body-sm text-text-light">
                        <Clock className="h-4 w-4 text-primary shrink-0" />
                        <span>{supervision.time}</span>
                      </div>
                      <div className="flex items-center gap-3 body-sm text-text-light">
                        <Repeat className="h-4 w-4 text-primary shrink-0" />
                        <span>{supervision.frequency}</span>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/${supervision.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pt-4 border-t border-border mt-auto inline-flex items-center gap-2 w-full justify-center py-2.5 px-4 rounded-lg bg-primary text-white body-md font-medium hover:bg-primary-light transition-all"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Falar pelo WhatsApp
                    </a>
                  </CardBase>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <p className="text-center body-lg text-text-light">
              Nenhum grupo de supervisão com vagas abertas no momento. Entre em contato para saber sobre novas turmas.
            </p>
          )}
        </Container>
      </section>

      <CTASection
        variant="vertical"
        title="Quer participar de uma supervisão?"
        description="Entre em contato com o(a) supervisor(a) do grupo de seu interesse para saber sobre disponibilidade de vagas."
        cta={{
          id: "cta-supervisoes",
          title: "",
          description: "",
          buttonText: "Fale conosco",
          buttonHref: `https://wa.me/${siteConfig.whatsapp}`,
          variant: "primary",
        }}
      />
    </>
  )
}
