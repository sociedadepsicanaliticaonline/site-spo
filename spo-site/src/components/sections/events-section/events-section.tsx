import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import { SectionHeader } from "@/components/sections/section-header"
import { EventCard } from "@/components/cards/event-card"
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/shared/animations"
import { cn } from "@/lib/utils"
import type { Event } from "@/types"

interface EventsSectionProps {
  title?: string
  subtitle?: string
  description?: string
  events: Event[]
  showAllLink?: boolean
  className?: string
}

function EventsSection({
  title = "Agenda SPO",
  subtitle,
  description,
  events,
  showAllLink = true,
  className,
}: EventsSectionProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-white", className)}>
      <Container>
        <SectionHeader title={title} subtitle={subtitle} description={description} />
        <StaggerContainer className="space-y-4">
          {events.map((event) => (
            <StaggerItem key={event.id}>
              <EventCard event={event} variant="featured" />
            </StaggerItem>
          ))}
        </StaggerContainer>
        {showAllLink && (
          <FadeIn direction="up">
            <div className="text-center mt-12">
              <Link
                href="/eventos"
                className="inline-flex items-center gap-2 text-primary font-bold body-md hover:gap-3 transition-all"
              >
                Ver todos os eventos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        )}
      </Container>
    </section>
  )
}

export { EventsSection }
