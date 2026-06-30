import { Container } from "@/components/layout/container"
import { SectionHeader } from "@/components/sections/section-header"
import { TestimonialCard } from "@/components/cards/testimonial-card"
import { StaggerContainer, StaggerItem } from "@/components/shared/animations"
import { cn } from "@/lib/utils"
import type { Testimonial } from "@/types"

interface TestimonialsSectionProps {
  title?: string
  subtitle?: string
  description?: string
  testimonials: Testimonial[]
  className?: string
}

function TestimonialsSection({
  title = "Vozes de Nossos Alunos",
  subtitle,
  description,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-white", className)}>
      <Container>
        <SectionHeader title={title} subtitle={subtitle} description={description} />
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}

export { TestimonialsSection }
