import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import { SectionHeader } from "@/components/sections/section-header"
import { BlogCard } from "@/components/cards/blog-card"
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/shared/animations"
import { cn } from "@/lib/utils"
import type { BlogPost } from "@/types"

interface BlogSectionProps {
  title?: string
  subtitle?: string
  description?: string
  posts: BlogPost[]
  showAllLink?: boolean
  featured?: boolean
  className?: string
}

function BlogSection({
  title = "Artigos & Reflexões",
  subtitle,
  description,
  posts,
  showAllLink = true,
  featured = false,
  className,
}: BlogSectionProps) {
  const featuredPost = featured ? posts[0] : null
  const remainingPosts = featured ? posts.slice(1) : posts

  return (
    <section className={cn("py-16 md:py-24 bg-surface", className)}>
      <Container>
        <SectionHeader title={title} subtitle={subtitle} description={description} />
        <StaggerContainer className="space-y-8">
          {featuredPost && (
            <StaggerItem>
              <BlogCard post={featuredPost} variant="featured" />
            </StaggerItem>
          )}
          <div className={cn("grid gap-8", featured ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3")}>
            {remainingPosts.map((post) => (
              <StaggerItem key={post.id}>
                <BlogCard post={post} />
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
        {showAllLink && (
          <FadeIn direction="up">
            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary font-bold body-md hover:gap-3 transition-all"
              >
                Ver todos os artigos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        )}
      </Container>
    </section>
  )
}

export { BlogSection }
