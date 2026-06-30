import { HeroSection } from "@/components/sections/hero-section"
import { CTASection } from "@/components/sections/cta-section"
import { Container } from "@/components/layout/container"
import { CardBase } from "@/components/cards/card-base"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, FileText } from "lucide-react"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nossa (Re)Vista",
  description:
    "A (Re)Vista da Sociedade Psicanalítica Online: publicação periódica dedicada à reflexão psicanalítica, com artigos, entrevistas e ensaios.",
  alternates: { canonical: `${siteConfig.url}/nossa-revista` },
}

const issues = [
  {
    id: "revista-01",
    title: "Edição #1 — O Ato Analítico",
    subtitle: "Sobre a invenção do psicanalista",
    publishedAt: "2025-03-15",
    description:
      "Primeira edição reunindo contribuições de professores e alunos sobre a clínica do ato e a posição do analista.",
    cover: "/images/avatars/coordinator-01.jpg",
    pages: 84,
  },
  {
    id: "revista-02",
    title: "Edição #2 — As Psicoses Hoje",
    subtitle: "Clínica e estrutura",
    publishedAt: "2025-06-20",
    description:
      "Artigos sobre o diagnóstico diferencial das psicoses, a direção do tratamento e os impasses clínicos contemporâneos.",
    cover: "/images/avatars/coordinator-02.jpg",
    pages: 92,
  },
  {
    id: "revista-03",
    title: "Edição #3 — Freud no Nosso Tempo",
    subtitle: "Leituras da obra freudiana",
    publishedAt: "2025-09-10",
    description:
      "Releituras dos textos fundamentais de Freud à luz das questões da clínica e da cultura atuais.",
    cover: "/images/avatars/coordinator-03.jpg",
    pages: 78,
  },
]

export default function NossaRevistaPage() {
  return (
    <>
      <HeroSection
        variant="internal"
        title="Nossa (Re)Vista"
        subtitle="Publicação da SPO"
        description="A (Re)Vista da Sociedade Psicanalítica Online é uma publicação periódica dedicada à reflexão psicanalítica. Reúne artigos, ensaios, entrevistas e traduções produzidos por professores, alunos e colaboradores da SPO."
        badge="Edições semestrais"
      />

      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="heading-md text-text">Edições publicadas</h2>
            <p className="body-lg text-text-light">
              Conheça as edições da (Re)Vista e acesse os artigos publicados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {issues.map((issue) => (
              <CardBase key={issue.id} className="group overflow-hidden flex flex-col">
                <div className="relative h-56 bg-primary-dark overflow-hidden">
                  <img
                    src={issue.cover}
                    alt={issue.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-60 transition-all duration-500"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <Badge variant="secondary" className="w-fit mb-2 bg-white/20 text-white border-white/30">
                      {issue.publishedAt.split("-").reverse().join("/")}
                    </Badge>
                    <p className="caption text-white/70">Edição</p>
                    <h3 className="heading-md text-white">{issue.title}</h3>
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <p className="body-sm text-text-light font-medium">{issue.subtitle}</p>
                  <p className="body-md text-text-light flex-1">{issue.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="body-sm text-text-light flex items-center gap-1.5">
                      <FileText className="h-4 w-4" />
                      {issue.pages} páginas
                    </span>
                    <a
                      href="#"
                      className="text-primary font-medium body-md hover:gap-2 inline-flex items-center gap-1 transition-all"
                    >
                      Ler edição →
                    </a>
                  </div>
                </div>
              </CardBase>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-surface">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary caption font-medium">
                <BookOpen className="h-4 w-4" />
                Sobre a publicação
              </div>
              <h2 className="heading-lg text-text">Uma revista feita por quem pratica a psicanálise</h2>
              <p className="body-lg text-text-light">
                A (Re)Vista é organizada por uma comissão editorial composta por professores e alunos da SPO. Os artigos passam por revisão cega por pares e são publicados em acesso aberto.
              </p>
              <ul className="space-y-3 body-md text-text-light">
                <li className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-text">Periodicidade:</strong> semestral</span>
                </li>
                <li className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-text">Formato:</strong> digital (PDF) e impresso sob demanda</span>
                </li>
                <li className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-text">Acesso:</strong> aberto e gratuito</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <CardBase className="p-6">
                <h3 className="heading-sm text-text mb-2">Quer contribuir?</h3>
                <p className="body-md text-text-light mb-4">
                  Professores, alunos e colaboradores podem submeter artigos para avaliação do nosso conselho editorial.
                </p>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  className="inline-flex items-center gap-2 py-2.5 px-4 rounded-lg bg-primary text-white body-md font-medium hover:bg-primary-light transition-all"
                >
                  Submeter artigo
                </a>
              </CardBase>
              <CardBase className="p-6 bg-primary/5 border-primary/20">
                <h3 className="heading-sm text-text mb-2">Normas de publicação</h3>
                <p className="body-md text-text-light">
                  Os textos devem ter entre 3.000 e 8.000 caracteres, seguir as normas da ABNT e ser inéditos.
                </p>
              </CardBase>
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        variant="vertical"
        title="Assine e receba as próximas edições"
        description="Cadastre-se para ser notificado quando uma nova edição da (Re)Vista for publicada."
        cta={{
          id: "cta-revista",
          title: "",
          description: "",
          buttonText: "Quero assinar",
          buttonHref: `https://wa.me/${siteConfig.whatsapp}`,
          variant: "primary",
        }}
      />
    </>
  )
}
