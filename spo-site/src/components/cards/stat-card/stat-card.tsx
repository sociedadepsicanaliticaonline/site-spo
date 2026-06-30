import { cn } from "@/lib/utils"
import { CardBase } from "@/components/cards/card-base"

interface StatCardProps {
  value: string
  label: string
  icon?: React.ReactNode
  variant?: "default" | "primary" | "accent"
  className?: string
}

const variants = {
  default: "bg-surface",
  primary: "bg-primary-dark text-white",
  accent: "bg-accent text-white",
}

function StatCard({ value, label, icon, variant = "default", className }: StatCardProps) {
  return (
    <CardBase
      padding="lg"
      variant="surface"
      hover={false}
      className={cn("text-center", variants[variant], className)}
    >
      <div className="space-y-2">
        {icon && <div className="text-3xl mb-2">{icon}</div>}
        <p
          className={cn(
            "font-heading text-4xl font-bold leading-none",
            variant === "default" ? "text-primary" : "text-white"
          )}
        >
          {value}
        </p>
        <p
          className={cn(
            "caption font-medium",
            variant === "default" ? "text-text-light" : "text-white/70"
          )}
        >
          {label}
        </p>
      </div>
    </CardBase>
  )
}

export { StatCard }
