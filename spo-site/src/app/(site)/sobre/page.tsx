import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { CalloutSection } from "@/components/sections/callout-section"
import { CTASection } from "@/components/sections/cta-section"
import { Container } from "@/components/layout/container"
import { CardBase } from "@/components/cards/card-base"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Globe, Heart, Calendar, Sparkles } from "lucide-react"
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
    foundingDate: "2020-09-10",
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
        badge="Desde 10 de setembro de 2020"
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

      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary caption font-medium">
                  <Sparkles className="h-4 w-4" />
                  Nossa História
                </div>
                <h2 className="heading-lg text-text">Como tudo começou</h2>
                <p className="body-lg text-text-light">
                  Conheça a origem da Sociedade Psicanalítica Online e o contexto que tornou possível o seu nascimento.
                </p>
              </div>

              <div className="space-y-5 body-md text-text-light leading-relaxed">
                <p>
                  Em 2019, foi descoberto na China um novo coronavírus. Em março de 2020, a Organização Mundial da Saúde decretou a pandemia de COVID-19, e o mundo enfrentou uma das mais difíceis pandemias da história. Decretadas quarentenas, isolamentos e afastamentos sociais, pessoas no mundo inteiro ficaram impossibilitadas de se encontrarem presencialmente.
                </p>
                <p>
                  De 2020 em diante houve um &ldquo;boom&rdquo; de encontros virtuais, estudos híbridos e trabalhos remotos. Ainda naquele ano, as escolas e sociedades de psicanálise tinham praticamente todas as suas atividades interrompidas.
                </p>
                <p>
                  Nesse contexto pandêmico, com afastamento social, e diante da anterior falta de escolas de psicanálise na região de moradia e trabalho de seus fundadores, no dia <strong className="text-text font-semibold">10 de setembro de 2020</strong> nasce a Sociedade Psicanalítica Online. Proposição de <strong className="text-text font-semibold">Eduardo Amaral</strong>, psicanalista fundador e diretor da sociedade.
                </p>
                <p>
                  A SPO não nasce como uma escola de psicanálise, vai se tornando. A princípio, tratava-se de um espaço nas redes (principalmente Instagram), não geográfico, que possibilitava o encontro de psicanalistas e pessoas interessadas na psicanálise para estudo continuado. Essa raiz está viva, fazendo com que a SPO receba, sem nenhum tipo de restrição, analistas membros de outras escolas.
                </p>
                <p>
                  Os seminários estavam ali desde o início, como um pontapé inicial, um passo de largada para a SPO, como sociedade psicanalítica nos moldes de Freud e Lacan. E ainda quando nenhuma outra escola de psicanálise havia possibilitado isso, a psicanalista <strong className="text-text font-semibold">Camila Wosgrau</strong> propõe junto a SPO os dispositivos de cartéis totalmente virtuais, juntando pessoas do Brasil inteiro e mesmo de fora dele.
                </p>
                <p>
                  Atualmente, a Sociedade Psicanalítica Online conta com seminários, cartéis, revista institucional e muitas outras atividades próprias do nosso tempo, como lives, acervo digital no nosso canal YouTube, espaço público e democrático para transmissão, roteiro para os que chegam, formação inicial, orientação de percurso formativo, jornadas e oficinas de leitura. E quem escreve um pouquinho mais da nossa história a cada dia são pessoas como você que chegam por aqui e chegam com desejo suficiente para ficar!
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <CardBase className="p-6 bg-primary text-white border-0">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-3">
                  <Calendar className="h-3 w-3 mr-1" />
                  Fundação
                </Badge>
                <p className="caption text-white/70">Data</p>
                <p className="heading-md text-white">10 de setembro de 2020</p>
                <p className="body-sm text-white/80 mt-4">
                  Nasce a Sociedade Psicanalítica Online, idealizada por <strong className="text-white">Eduardo Amaral</strong>.
                </p>
              </CardBase>

              <CardBase className="p-6">
                <h3 className="heading-sm text-text mb-3">Origem</h3>
                <p className="body-md text-text-light">
                  A SPO surgiu no contexto da pandemia de COVID-19, como resposta à necessidade de espaços de encontro e formação psicanalítica em formato virtual.
                </p>
              </CardBase>

              <CardBase className="p-6">
                <h3 className="heading-sm text-text mb-3">Fundador</h3>
                <div className="space-y-1">
                  <p className="body-md font-medium text-text">Eduardo Amaral</p>
                  <p className="body-sm text-text-light">Psicanalista fundador e diretor da SPO</p>
                </div>
              </CardBase>
            </div>
          </div>
        </Container>
      </section>

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
