import { cn } from "@/lib/utils"
import { CardBase } from "@/components/cards/card-base"

interface InfoCardProps {
  icon?: React.ReactNode
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
}

function InfoCard({ icon, title, description, children, className }: InfoCardProps) {
  return (
    <CardBase className={cn("space-y-3", className)}>
      {icon && <div className="text-primary">{icon}</div>}
      <h3 className="heading-md text-text">{title}</h3>
      {description && <p className="body-md text-text-light">{description}</p>}
      {children}
    </CardBase>
  )
}

export { InfoCard }
