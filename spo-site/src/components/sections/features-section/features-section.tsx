import { Container } from "@/components/layout/container"
import { SectionHeader } from "@/components/sections/section-header"
import { HighlightCard } from "@/components/cards/highlight-card"
import { StaggerContainer, StaggerItem } from "@/components/shared/animations"
import { cn } from "@/lib/utils"

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  href?: string
}

interface FeaturesSectionProps {
  title?: string
  subtitle?: string
  description?: string
  features: Feature[]
  columns?: 2 | 3 | 4
  className?: string
}

function FeaturesSection({
  title = "Nossos Pilares",
  subtitle,
  description,
  features,
  columns = 3,
  className,
}: FeaturesSectionProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <section className={cn("py-16 md:py-24 bg-white", className)}>
      <Container>
        <SectionHeader title={title} subtitle={subtitle} description={description} />
        <StaggerContainer className={cn("grid grid-cols-1 gap-6 md:gap-8", gridCols[columns])}>
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <HighlightCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                href={feature.href}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}

export { FeaturesSection }
