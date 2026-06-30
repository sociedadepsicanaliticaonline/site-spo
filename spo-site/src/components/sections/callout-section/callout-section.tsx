import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/shared/animations"
import { cn } from "@/lib/utils"

interface CalloutSectionProps {
  quote: string
  author: string
  className?: string
}

function CalloutSection({ quote, author, className }: CalloutSectionProps) {
  return (
    <section className={cn("py-16 md:py-20 bg-surface", className)}>
      <Container className="max-w-3xl text-center">
        <FadeIn>
          <div className="space-y-6">
            <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
            <blockquote className="heading-lg text-text italic font-serif leading-relaxed">
              &ldquo;{quote}&rdquo;
            </blockquote>
            <p className="body-md text-text-light font-medium">&mdash; {author}</p>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

export { CalloutSection }
