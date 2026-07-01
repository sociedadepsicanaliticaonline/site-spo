import { notFound } from "next/navigation"
import { Calendar, Clock, MapPin, Tag, ArrowRight } from "lucide-react"
import { HeroSection } from "@/components/sections/hero-section"
import { CTASection } from "@/components/sections/cta-section"
import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { events } from "@/data/events"
import { siteConfig } from "@/config/site"
import { formatDate, formatPrice } from "@/utils/formatters"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const event = events.find((e) => e.slug === slug)
  if (!event) return {}
  return {
    title: event.title,
    description: event.description,
    alternates: { canonical: `${siteConfig.url}/eventos/${slug}` },
  }
}

export default async function EventoSlugPage({ params }: Props) {
  const { slug } = await params
  const event = events.find((e) => e.slug === slug)
  if (!event) notFound()

  const typeLabel = {
    online: "Online",
    presencial: "Presencial",
    hibrido: "Híbrido",
  }

  const kindLabel = {
    evento: "Evento pontual",
    programacao: "Programação recorrente",
  }

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: `${event.date}T${event.time}`,
    location: {
      "@type": "Place",
      name: event.location,
    },
    organizer: {
      "@type": "Organization",
      name: siteConfig.title,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <HeroSection
        variant="event"
        title={event.title}
        subtitle={event.category.name}
        description={event.description}
        cta={event.available ? { id: "cta-evento-detail", title: "", description: "", buttonText: "Inscreva-se", buttonHref: "#inscricao", variant: "primary" } : undefined}
        badge={event.available ? "Inscrições Abertas" : "Evento Realizado"}
      />

      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <h2 className="heading-md text-text">Sobre o Evento</h2>
                <div className="text-text-light body-md leading-relaxed whitespace-pre-line">
                  {event.longDescription || event.description}
                </div>
              </div>

              {event.tags.length > 0 && (
                <div className="border-t border-border pt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="h-5 w-5 text-primary" />
                    <h2 className="heading-md text-text">Tags</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <Badge key={tag.id} variant="secondary">{tag.name}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="sticky top-24 space-y-6">
                <div className="p-6 rounded-xl border border-border bg-surface space-y-4">
                  <div className="flex items-start gap-4">
                    <Calendar className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <div>
                      <p className="body-sm text-text-light">Data</p>
                      <p className="body-md font-medium text-text">{formatDate(event.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <div>
                      <p className="body-sm text-text-light">Horário</p>
                      <p className="body-md font-medium text-text">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <div>
                      <p className="body-sm text-text-light">Local</p>
                      <p className="body-md font-medium text-text">{event.location}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-border bg-surface text-center space-y-4">
                  <p className="body-sm text-text-light">Tipo de entrada</p>
                  <Badge variant={event.kind === "programacao" ? "secondary" : "default"} className="body-md">
                    {kindLabel[event.kind]}
                  </Badge>
                  <p className="body-sm text-text-light pt-2">Modalidade</p>
                  <Badge variant="accent" className="body-md">{typeLabel[event.type]}</Badge>
                  {event.price !== undefined && (
                    <>
                      <p className="body-sm text-text-light mt-4">Investimento</p>
                      <p className="heading-md text-primary">
                        {event.price === 0 ? "Gratuito" : formatPrice(event.price)}
                      </p>
                    </>
                  )}
                  {event.available && (
                    <a
                      href="#inscricao"
                      className="block w-full py-3 px-6 rounded-lg bg-primary text-white body-md font-medium text-center hover:bg-primary-light transition-all mt-4"
                    >
                      Inscreva-se
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {event.available && (
        <section id="inscricao" className="py-16 md:py-24 bg-surface">
          <Container className="max-w-2xl text-center space-y-6">
            <h2 className="heading-lg text-text">Inscrição</h2>
            <p className="body-lg text-text-light">
              Para se inscrever neste evento, entre em contato conosco através do formulário de contato
              ou diretamente pelo WhatsApp.
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
      )}

      <CTASection
        variant="horizontal"
        title="Confira outros eventos"
        description="Acompanhe a agenda completa da SPO."
        cta={{ id: "cta-evento-slug", title: "", description: "", buttonText: "Ver Todos os Eventos", buttonHref: "/eventos", variant: "primary" }}
      />
    </>
  )
}
