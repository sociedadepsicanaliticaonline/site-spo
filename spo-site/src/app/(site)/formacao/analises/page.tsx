import { MapPin, MessageCircle, UserCheck } from "lucide-react"

import { HeroSection } from "@/components/sections/hero-section"
import { CTASection } from "@/components/sections/cta-section"
import { BreadcrumbNav } from "@/components/navigation/breadcrumb-nav"
import { Container } from "@/components/layout/container"
import { StaggerContainer, StaggerItem } from "@/components/shared/animations"
import { CardBase } from "@/components/cards/card-base"
import { getAvailableAnalysts, getFormacaoContentByKey } from "@/db/queries"
import { renderRichText } from "@/utils/sanitize"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Análises",
  description:
    "A importância da análise pessoal na formação do psicanalista e a lista de analistas credenciados pela SPO.",
  alternates: { canonical: `${siteConfig.url}/formacao/analises` },
}

export default async function AnalisesPage() {
  const [available, content] = await Promise.all([
    getAvailableAnalysts(),
    getFormacaoContentByKey("analises-intro"),
  ])

  return (
    <>
      <HeroSection
        variant="internal"
        title="Análises"
        subtitle="Análise Pessoal"
        description="A análise pessoal é o pilar fundador da formação do psicanalista. Conheça os analistas credenciados pela SPO."
        badge="Pilar da Formação"
      />

      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8 mb-16">
            <BreadcrumbNav
              items={[
                { label: "Formação", href: "/formacao/nossa-proposta" },
                { label: "Análises" },
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
              <UserCheck className="h-4 w-4" />
              Analistas credenciados
            </div>
            <h2 className="heading-md text-text">Analistas da SPO</h2>
            <p className="body-lg text-text-light">
              Entre em contato com o analista de sua preferência para combinar o início do processo.
            </p>
          </div>

          {available.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {available.map((analyst) => (
                <StaggerItem key={analyst.id}>
                  <CardBase className="group h-full flex flex-col gap-5">
                    <div>
                      <h3 className="heading-sm text-text group-hover:text-primary transition-colors">
                        {analyst.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 body-sm text-text-light">
                      <MapPin className="h-4 w-4 text-primary shrink-0" />
                      <span>
                        {analyst.city} — {analyst.state}
                      </span>
                    </div>

                    <a
                      href={`https://wa.me/${analyst.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-2 w-full justify-center py-2.5 px-4 rounded-lg bg-primary text-white body-md font-medium hover:bg-primary-light transition-all"
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
              Nenhum analista credenciado disponível no momento.
            </p>
          )}
        </Container>
      </section>

      <CTASection
        variant="vertical"
        title="Quer iniciar uma análise?"
        description="A análise pessoal é um passo fundamental da formação. Entre em contato com um dos analistas credenciados pela SPO."
        cta={{
          id: "cta-analises",
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
