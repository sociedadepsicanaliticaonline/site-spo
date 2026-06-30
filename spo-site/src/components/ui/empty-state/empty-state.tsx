import { cn } from "@/lib/utils"
import { Inbox } from "lucide-react"

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4 text-center",
        className
      )}
    >
      <div className="mb-4 text-text-light">
        {icon || <Inbox className="h-12 w-12" />}
      </div>
      <h3 className="heading-md text-text mb-2">{title}</h3>
      {description && (
        <p className="body-md text-text-light max-w-sm mb-6">{description}</p>
      )}
      {action}
    </div>
  )
}

export { EmptyState }
