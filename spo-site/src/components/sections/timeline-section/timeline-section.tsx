import { Container } from "@/components/layout/container"
import { SectionHeader } from "@/components/sections/section-header"
import { FadeIn } from "@/components/shared/animations"
import { cn } from "@/lib/utils"

interface TimelineItem {
  year: string
  title: string
  description: string
}

interface TimelineSectionProps {
  title?: string
  subtitle?: string
  description?: string
  items: TimelineItem[]
  className?: string
}

function TimelineSection({
  title = "Nossa História",
  subtitle,
  description,
  items,
  className,
}: TimelineSectionProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-white", className)}>
      <Container>
        <SectionHeader title={title} subtitle={subtitle} description={description} />
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            <div className="space-y-12">
              {items.map((item, index) => (
                <FadeIn key={item.year} delay={index * 0.1}>
                  <div className="relative flex flex-col md:flex-row gap-4 md:gap-8">
                    <div className={cn(
                      "md:w-1/2 flex md:justify-end",
                      index % 2 === 0 ? "md:text-right" : "md:order-2 md:text-left"
                    )}>
                      <div className="space-y-2">
                        <span className="inline-block caption text-primary font-bold">{item.year}</span>
                        <h3 className="heading-md text-text">{item.title}</h3>
                        <p className="body-md text-text-light">{item.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-4 border-white -translate-x-1.5 md:-translate-x-1.5 mt-2" />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export { TimelineSection }
