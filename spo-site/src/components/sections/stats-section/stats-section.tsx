import { Container } from "@/components/layout/container"
import { StatCard } from "@/components/cards/stat-card"
import { StaggerContainer, StaggerItem } from "@/components/shared/animations"
import { cn } from "@/lib/utils"

interface Stat {
  value: string
  label: string
  icon?: React.ReactNode
}

interface StatsSectionProps {
  stats: Stat[]
  className?: string
  variant?: "default" | "primary-dark"
}

function StatsSection({ stats, className, variant = "primary-dark" }: StatsSectionProps) {
  return (
    <section className={cn("py-16 md:py-20", variant === "primary-dark" ? "bg-primary-dark" : "bg-surface", className)}>
      <Container>
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <StatCard
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
                variant={variant === "primary-dark" ? "primary" : "default"}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}

export { StatsSection }
