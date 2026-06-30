import { HeroSection } from "@/components/sections/hero-section"
import { CTASection } from "@/components/sections/cta-section"
import { Container } from "@/components/layout/container"
import { SectionHeader } from "@/components/sections/section-header"
import { StaggerContainer, StaggerItem } from "@/components/shared/animations"
import { BlogCard } from "@/components/cards/blog-card"
import { blogPosts } from "@/data/blog"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "Artigos, ensaios e reflexões sobre psicanálise escritos por nossos professores e colaboradores.",
  alternates: { canonical: `${siteConfig.url}/blog` },
}

export default function BlogPage() {
  return (
    <>
      <HeroSection
        variant="internal"
        title="Blog"
        subtitle="Artigos & Reflexões"
        description="Artigos, ensaios e reflexões sobre psicanálise, clínica e cultura, escritos por nossos professores e colaboradores."
        badge="Conteúdo exclusivo"
      />

      <section className="py-16 md:py-24 bg-surface">
        <Container>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post) => (
              <StaggerItem key={post.id}>
                <BlogCard post={post} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      <CTASection
        variant="vertical"
        title="Quer contribuir com o blog?"
        description="Professores e alunos da SPO podem enviar artigos para publicação. Entre em contato."
        cta={{ id: "cta-blog", title: "", description: "", buttonText: "Saiba Como", buttonHref: `https://wa.me/${siteConfig.whatsapp}`, variant: "primary" }}
      />
    </>
  )
}
