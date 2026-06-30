import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  backHref?: string
  action?: {
    label: string
    href: string
    icon?: React.ReactNode
  }
  className?: string
}

export function PageHeader({
  title,
  description,
  backHref,
  action,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6", className)}>
      <div className="space-y-1">
        {backHref && (
          <Link
            href={backHref}
            className="inline-flex items-center gap-1 text-sm text-text-light hover:text-primary transition-colors mb-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar
          </Link>
        )}
        <h1 className="heading-md text-text">{title}</h1>
        {description && <p className="body-md text-text-light">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className={cn(buttonVariants(), "w-full sm:w-auto inline-flex items-center gap-2")}
        >
          {action.icon}
          {action.label}
        </Link>
      )}
    </div>
  )
}
