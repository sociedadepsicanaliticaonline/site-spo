import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { CTASection } from "@/components/sections/cta-section"
import { Container } from "@/components/layout/container"
import { SectionHeader } from "@/components/sections/section-header"
import { StaggerContainer, StaggerItem } from "@/components/shared/animations"
import { BlogCard } from "@/components/cards/blog-card"
import { blogPosts } from "@/data/blog"
import { FileText, BookOpen, Video, Podcast } from "lucide-react"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Produção Psicanalítica",
  description: "Produção científica e acadêmica da Sociedade Psicanalítica Online: artigos, livros, palestras e mais.",
  alternates: { canonical: `${siteConfig.url}/producao-psicanalitica` },
}

export default function ProducaoPage() {
  const producaoPosts = blogPosts.filter((post) =>
    ["Teoria", "Novidades"].includes(post.category.name)
  )

  const categories = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Artigos Científicos",
      description: "Produção acadêmica de nossos professores e colaboradores, publicada em revistas especializadas.",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Livros e Capítulos",
      description: "Obras publicadas por membros da SPO sobre temas fundamentais da psicanálise.",
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "Palestras e Conferências",
      description: "Registros de palestras e conferências ministradas por nossos professores em eventos nacionais.",
    },
    {
      icon: <Podcast className="h-6 w-6" />,
      title: "Podcasts e Entrevistas",
      description: "Participações em podcasts e entrevistas sobre psicanálise e cultura contemporânea.",
    },
  ]

  return (
    <>
      <HeroSection
        variant="internal"
        title="Produção Psicanalítica"
        subtitle="Publicações e Pesquisas"
        description="A SPO incentiva e divulga a produção acadêmica de seus professores e alunos, contribuindo para o avanço do saber psicanalítico."
        badge="Produção acadêmica"
      />

      <section className="py-16 md:py-24 bg-white">
        <Container>
          <SectionHeader
            title="Nossas Frentes de Produção"
            subtitle="Áreas de Atuação"
            description="A produção psicanalítica da SPO abrange diferentes formatos e plataformas."
          />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {categories.map((cat) => (
              <StaggerItem key={cat.title}>
                <div className="p-8 rounded-xl border border-border bg-surface group hover:border-primary/30 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/5 text-primary shrink-0">
                      {cat.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="heading-md text-text">{cat.title}</h3>
                      <p className="body-md text-text-light">{cat.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      <AboutSection
        title="Produção de Conteúdo"
        subtitle="Blog e Publicações"
        description="Artigos e reflexões produzidos por nossos professores sobre temas atuais da psicanálise."
      />

      <section className="py-16 md:py-24 bg-surface">
        <Container>
          <SectionHeader
            title="Últimas Publicações"
            subtitle="Artigos Recentes"
            description="Confira os artigos mais recentes publicados por nossos professores."
          />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {producaoPosts.slice(0, 3).map((post) => (
              <StaggerItem key={post.id}>
                <BlogCard post={post} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <Container className="max-w-3xl">
          <SectionHeader
            title="Chamada para Publicação"
            subtitle="Submeta seu Trabalho"
            description="A SPO aceita submissões de artigos, resenhas e ensaios de alunos e ex-alunos para publicação."
          />
          <div className="p-8 rounded-xl border border-border bg-surface">
            <div className="space-y-4">
              <p className="body-lg text-text-light">
                Professores, alunos e ex-alunos da SPO podem submeter trabalhos para publicação.
                Os originais são avaliados pelo conselho editorial e, se aprovados, publicados em nosso site e redes sociais.
              </p>
              <p className="body-md text-text-light">
                <strong className="text-text">Linhas editoriais:</strong> Teoria psicanalítica, clínica contemporânea,
                psicanálise e cultura, resenhas de livros, relatos de experiência clínica.
              </p>
              <p className="body-md text-text-light">
                <strong className="text-text">Normas:</strong> Os textos devem ter entre 3.000 e 8.000 caracteres,
                seguir as normas da ABNT e ser inéditos.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        variant="banner"
        title="Tem um trabalho para publicar?"
        description="Envie seu texto para avaliação do nosso conselho editorial."
        cta={{ id: "cta-producao", title: "", description: "", buttonText: "Submeta seu Artigo", buttonHref: `https://wa.me/${siteConfig.whatsapp}`, variant: "primary" }}
      />
    </>
  )
}
