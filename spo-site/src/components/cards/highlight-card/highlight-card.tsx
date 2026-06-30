import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CardBase } from "@/components/cards/card-base"
import { cn } from "@/lib/utils"

interface HighlightCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href?: string
  className?: string
}

function HighlightCard({ icon, title, description, href, className }: HighlightCardProps) {
  const content = (
    <div className="space-y-4">
      <div className="text-primary">{icon}</div>
      <h3 className="heading-md text-text">{title}</h3>
      <p className="body-md text-text-light">{description}</p>
      {href && (
        <span className="inline-flex items-center gap-1 text-primary font-medium body-md group-hover:gap-2 transition-all">
          Saiba mais <ArrowRight className="h-4 w-4" />
        </span>
      )}
    </div>
  )

  return (
    <CardBase className={cn("group", className)}>
      {href ? <Link href={href}>{content}</Link> : content}
    </CardBase>
  )
}

export { HighlightCard }
