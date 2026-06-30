import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CTASection } from "@/components/sections/cta-section"
import { BlogCard } from "@/components/cards/blog-card"
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/data/blog"
import { siteConfig } from "@/config/site"
import { formatDate } from "@/utils/formatters"
import { renderRichText } from "@/utils/sanitize"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${siteConfig.url}/blog/${slug}` },
  }
}

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post || !post.content) notFound()

  const relatedPosts = getRelatedPosts(slug)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image ? `${siteConfig.url}${post.image}` : undefined,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.title,
    },
  }

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <section className="bg-primary-dark text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary-dark via-primary-dark to-primary" />
        <Container className="relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors body-md mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o Blog
          </Link>
          <div className="max-w-3xl space-y-6">
            <Badge variant="secondary" className="w-fit border border-white/20 text-white/80">
              {post.category.name}
            </Badge>
            <h1 className="heading-xl text-white font-bold">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 body-md text-white/60">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readingTime} de leitura
              </span>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <Avatar className="h-12 w-12 ring-2 ring-white/20">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback className="text-primary-dark">{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="body-md font-medium text-white">{post.author.name}</p>
                <p className="body-sm text-white/60">{post.author.role}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <Container className="max-w-3xl">
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>

          <div
            className="rich-content max-w-none"
            dangerouslySetInnerHTML={{ __html: renderRichText(post.content || "") }}
          />

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
              {post.tags.map((tag) => (
                <Badge key={tag.id} variant="secondary">{tag.name}</Badge>
              ))}
            </div>
          )}

          <div className="mt-12 p-8 rounded-xl bg-surface border border-border">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="heading-sm text-text">{post.author.name}</p>
                <p className="body-md text-text-light">{post.author.role}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-24 bg-surface">
          <Container>
            <h2 className="heading-lg text-text text-center mb-12">Artigos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {relatedPosts.slice(0, 3).map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection
        variant="vertical"
        title="Gostou do conteúdo?"
        description="Assine nossa newsletter para receber novos artigos e conteúdos exclusivos."
        cta={{ id: "cta-blog-slug", title: "", description: "", buttonText: "Assinar Newsletter", buttonHref: `https://wa.me/${siteConfig.whatsapp}`, variant: "primary" }}
      />
    </article>
  )
}
