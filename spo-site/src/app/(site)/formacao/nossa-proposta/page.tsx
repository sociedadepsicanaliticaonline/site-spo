import { HeroSection } from "@/components/sections/hero-section"
import { BreadcrumbNav } from "@/components/navigation/breadcrumb-nav"
import { Container } from "@/components/layout/container"
import { getFormacaoContentByKey } from "@/db/queries"
import { renderRichText } from "@/utils/sanitize"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Nossa Proposta",
  description:
    "Conheça a proposta de formação continuada da SPO, ancorada na tradição freudo-lacaniana: análise pessoal, supervisão e estudo teórico.",
  alternates: { canonical: `${siteConfig.url}/formacao/nossa-proposta` },
}

export default async function NossaPropostaPage() {
  const content = await getFormacaoContentByKey("nossa-proposta")

  return (
    <>
      <HeroSection
        variant="internal"
        title="Nossa Proposta"
        subtitle="Formação Continuada"
        description="A formação do psicanalista como percurso: análise pessoal, supervisão e estudo teórico, na tradição freudo-lacaniana."
        badge="Tradição Freudo-Lacaniana"
      />

      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">
            <BreadcrumbNav
              items={[
                { label: "Formação", href: "/formacao/nossa-proposta" },
                { label: "Nossa Proposta" },
              ]}
            />

            <article
              className="prose prose-spo max-w-none space-y-5 body-md text-text-light leading-relaxed [&_h2]:heading-md [&_h2]:text-text [&_h2]:mt-8 [&_h3]:heading-sm [&_h3]:text-text [&_h3]:mt-6 [&_p]:mb-4 [&_strong]:text-text [&_strong]:font-semibold [&_em]:italic [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic"
              dangerouslySetInnerHTML={{
                __html: renderRichText(content?.content || ""),
              }}
            />
          </div>
        </Container>
      </section>
    </>
  )
}
