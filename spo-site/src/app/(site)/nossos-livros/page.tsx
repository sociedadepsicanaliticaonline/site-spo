import { HeroSection } from "@/components/sections/hero-section"
import { CTASection } from "@/components/sections/cta-section"
import { Container } from "@/components/layout/container"
import { CardBase } from "@/components/cards/card-base"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, User } from "lucide-react"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nossos Livros",
  description:
    "Livros publicados por professores e membros da Sociedade Psicanalítica Online. Publicações de psicanálise, clínica e cultura.",
  alternates: { canonical: `${siteConfig.url}/nossos-livros` },
}

const books = [
  {
    id: "livro-1",
    title: "Clínica do Contemporâneo",
    author: "Dra. Ana Lúcia Costa",
    role: "Professora SPO",
    year: 2024,
    description:
      "Um livro que reúne ensaios sobre os desafios da clínica psicanalítica na contemporaneidade, abordando temas como a cultura digital, os novos sintomas e a ética do desejo.",
    cover: "/images/avatars/testimonial-01.jpg",
    pages: 240,
  },
  {
    id: "livro-2",
    title: "Leituras de Freud",
    author: "Luiz Felipe Zanini",
    role: "Coordenador SPO",
    year: 2024,
    description:
      "Releituras comentadas dos textos fundamentais de Freud, com ênfase na articulação entre a teoria e a prática clínica.",
    cover: "/images/avatars/testimonial-02.jpg",
    pages: 312,
  },
  {
    id: "livro-3",
    title: "Pfister: Psicanálise e Cristianismo",
    author: "Bruno Albuquerque",
    role: "Coordenador SPO",
    year: 2023,
    description:
      "Estudo sobre a obra do pastor e psicanalista Oskar Pfister, articulando psicanálise e teologia a partir de uma perspectiva metapsicológica da fé cristã.",
    cover: "/images/avatars/testimonial-03.jpg",
    pages: 198,
  },
  {
    id: "livro-4",
    title: "As Psicoses na Clínica",
    author: "Daniel Gostautas",
    role: "Coordenador SPO",
    year: 2023,
    description:
      "Investigação clínica e teórica sobre as psicoses, articulando Freud e Lacan à direção do tratamento dos casos.",
    cover: "/images/avatars/coordinator-01.jpg",
    pages: 276,
  },
]

export default function NossosLivrosPage() {
  return (
    <>
      <HeroSection
        variant="internal"
        title="Nossos Livros"
        subtitle="Publicações SPO"
        description="Livros escritos por professores e membros da Sociedade Psicanalítica Online. Obras de referência para estudantes, profissionais e pesquisadores da psicanálise."
        badge="Acervo editorial"
      />

      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="heading-md text-text">Acervo de publicações</h2>
            <p className="body-lg text-text-light">
              Conheça os livros publicados por nossa equipe de professores e coordenadores.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <CardBase key={book.id} className="group flex flex-col overflow-hidden p-0">
                <div className="relative aspect-[2/3] bg-primary-dark overflow-hidden">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-80 transition-all duration-500"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 text-white bg-gradient-to-t from-primary-dark/80 to-transparent">
                    <Badge variant="secondary" className="w-fit mb-1 bg-white/20 text-white border-white/30 caption">
                      {book.year}
                    </Badge>
                    <h3 className="heading-sm text-white leading-tight">{book.title}</h3>
                  </div>
                </div>
                <div className="p-5 space-y-3 flex-1 flex flex-col">
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="body-md font-medium text-text">{book.author}</p>
                      <p className="body-sm text-text-light">{book.role}</p>
                    </div>
                  </div>
                  <p className="body-sm text-text-light line-clamp-4 flex-1">
                    {book.description}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="body-sm text-text-light flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5" />
                      {book.pages} pp.
                    </span>
                    <a
                      href="#"
                      className="text-primary font-medium body-sm hover:gap-1.5 inline-flex items-center gap-1 transition-all"
                    >
                      Saiba mais →
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
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary caption font-medium">
              <BookOpen className="h-4 w-4" />
              Publicações
            </div>
            <h2 className="heading-lg text-text">Editora SPO</h2>
            <p className="body-lg text-text-light">
              Os livros da SPO são publicados por meio de parcerias com editoras acadêmicas e distribuídos em formato digital e impresso. Nosso conselho editorial avalia cada obra para garantir a qualidade e a coerência com a proposta institucional.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="p-6 rounded-xl bg-white border border-border space-y-2">
                <Calendar className="h-5 w-5 text-primary" />
                <p className="body-sm text-text-light">Lançamentos</p>
                <p className="body-md font-medium text-text">Anuais</p>
              </div>
              <div className="p-6 rounded-xl bg-white border border-border space-y-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <p className="body-sm text-text-light">Formato</p>
                <p className="body-md font-medium text-text">Digital e impresso</p>
              </div>
              <div className="p-6 rounded-xl bg-white border border-border space-y-2">
                <User className="h-5 w-5 text-primary" />
                <p className="body-sm text-text-light">Autores</p>
                <p className="body-md font-medium text-text">Professores SPO</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        variant="horizontal"
        title="Quer publicar com a SPO?"
        description="Entre em contato com nosso conselho editorial para submeter seu projeto de livro."
        cta={{
          id: "cta-livros",
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
