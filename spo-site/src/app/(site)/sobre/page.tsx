import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { TimelineSection } from "@/components/sections/timeline-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { CalloutSection } from "@/components/sections/callout-section"
import { CTASection } from "@/components/sections/cta-section"
import { BookOpen, Users, Globe, Heart } from "lucide-react"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a história, missão e valores da Sociedade Psicanalítica Online.",
  alternates: { canonical: `${siteConfig.url}/sobre` },
}

export default function SobrePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.title,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/og-image.svg`,
    description:
      "A Sociedade Psicanalítica Online (SPO) oferece formação psicanalítica de excelência, combinando o rigor teórico dos textos fundamentais com a sensibilidade clínica.",
    foundingDate: "2014",
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <HeroSection
        variant="internal"
        title="Sobre a SPO"
        subtitle="Nossa História"
        description="A Sociedade Psicanalítica Online nasceu da convicção de que a psicanálise pode e deve ser transmitida com rigor e profundidade, utilizando as ferramentas do mundo contemporâneo sem abrir mão da ética que a funda."
        badge="Desde 2014"
      />

      <CalloutSection
        quote="A psicanálise é um saber que se transmite não pela repetição, mas pela singularidade de cada encontro clínico e de cada percurso de formação."
        author="Dra. Ana Lúcia Costa — Coordenadora de Ensino"
      />

      <AboutSection
        title="Nossa Missão"
        subtitle="Propósito"
        description="Oferecer formação psicanalítica de excelência, combinando o rigor teórico dos textos fundamentais com a sensibilidade clínica que a prática exige."
        features={[
          { title: "Missão", description: "Transmitir a psicanálise com rigor ético e excelência acadêmica, formando profissionais capazes de sustentar uma clínica comprometida com o desejo e a singularidade." },
          { title: "Visão", description: "Ser referência nacional em formação psicanalítica online, reconhecida pela qualidade do ensino e pela seriedade da transmissão." },
          { title: "Valores", description: "Compromisso ético, rigor teórico, respeito à singularidade, transparência e responsabilidade social." },
        ]}
        light
      />

      <AboutSection
        title="Nossa Abordagem"
        subtitle="Fundamentos Teóricos"
        description="A SPO se orienta pela psicanálise freudiana e suas principais vertentes contemporâneas, com ênfase no pensamento de Freud, Lacan e seus comentadores."
        features={[
          { title: "Freud", description: "Estudo sistemático da obra freudiana, dos textos pré-psicanalíticos às grandes metapsicologias." },
          { title: "Lacan", description: "O retorno a Freud proposto por Lacan, seus seminários e a formalização da teoria psicanalítica." },
          { title: "Contemporâneos", description: "Diálogo com autores atuais que pensam a psicanálise no contexto da cultura contemporânea." },
        ]}
        reverse
      />

      <TimelineSection
        title="Nossa Trajetória"
        subtitle="Linha do Tempo"
        description="Marcos importantes na história da Sociedade Psicanalítica Online."
        items={[
          { year: "2014", title: "Fundação da SPO", description: "A SPO é fundada por um grupo de psicanalistas com o objetivo de oferecer formação online de qualidade." },
          { year: "2016", title: "Primeira Turma de Formação", description: "Lançamento do primeiro seminário regular de formação em psicanálise, com 30 alunos matriculados." },
          { year: "2018", title: "Expansão do Corpo Docente", description: "Ampliação do quadro de professores e coordenadores, com profissionais de todo o Brasil." },
          { year: "2020", title: "Adaptação ao Ensino Digital", description: "Aperfeiçoamento da plataforma de ensino e adoção de novas tecnologias para o aprendizado remoto." },
          { year: "2022", title: "Reconhecimento Nacional", description: "A SPO alcança alunos em todos os estados brasileiros e recebe reconhecimento de sociedades psicanalíticas." },
          { year: "2024", title: "Novos Cursos e Eventos", description: "Lançamento de novos seminários e programas de supervisão clínica, consolidando a SPO como referência." },
        ]}
      />

      <FeaturesSection
        title="Diferenciais SPO"
        subtitle="Por que escolher a SPO?"
        description="O que faz da SPO uma escolha única para sua formação psicanalítica."
        features={[
          {
            icon: <BookOpen className="h-6 w-6" />,
            title: "Corpo Docente Qualificado",
            description: "Professores com vasta experiência clínica e acadêmica, doutores e mestres em psicanálise.",
          },
          {
            icon: <Users className="h-6 w-6" />,
            title: "Turmas Reduzidas",
            description: "Grupos pequenos que garantem acompanhamento personalizado e discussão aprofundada.",
          },
          {
            icon: <Globe className="h-6 w-6" />,
            title: "Flexibilidade Online",
            description: "Aulas gravadas e ao vivo, com acesso 24h à plataforma e materiais complementares.",
          },
          {
            icon: <Heart className="h-6 w-6" />,
            title: "Comunidade Ativa",
            description: "Fóruns, grupos de estudo e eventos que mantêm a comunidade SPO viva e conectada.",
          },
        ]}
        columns={4}
      />

      <CTASection
        variant="banner"
        title="Faça Parte da Nossa História"
        description="Venha construir sua trajetória na psicanálise com a SPO."
        cta={{ id: "cta-sobre", title: "", description: "", buttonText: "Conheça Nossos Seminários", buttonHref: "/seminarios", variant: "primary" }}
      />
    </>
  )
}
