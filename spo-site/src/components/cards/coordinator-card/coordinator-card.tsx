import Image from "next/image"
import { ExternalLink, BookOpen } from "lucide-react"
import { CardBase } from "@/components/cards/card-base"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Coordinator } from "@/types"

interface CoordinatorCardProps {
  coordinator: Coordinator
  className?: string
}

function CoordinatorCard({ coordinator, className }: CoordinatorCardProps) {
  return (
    <CardBase className={cn("group", className)}>
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative h-24 w-24 rounded-full overflow-hidden ring-4 ring-surface">
          <Image
            src={coordinator.avatar}
            alt={coordinator.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
        <div>
          <h3 className="heading-md text-text group-hover:text-primary transition-colors">
            {coordinator.name}
          </h3>
          <p className="body-sm text-primary font-medium mt-1">{coordinator.role}</p>
        </div>
        <p className="body-md text-text-light line-clamp-3">{coordinator.bio}</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {coordinator.specialties.slice(0, 3).map((spec) => (
            <Badge key={spec} variant="secondary">
              {spec}
            </Badge>
          ))}
        </div>
        <div className="pt-2 space-y-1.5 w-full">
          {coordinator.education.slice(0, 2).map((edu) => (
            <p key={edu} className="body-sm text-text-light flex items-center gap-2 justify-center">
              <BookOpen className="h-3.5 w-3.5 shrink-0 text-primary" />
              {edu}
            </p>
          ))}
        </div>
        {coordinator.socialLinks?.lattes && (
          <a
            href={coordinator.socialLinks.lattes}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 body-sm text-primary font-medium hover:underline mt-2"
          >
            Currículo Lattes <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </CardBase>
  )
}

export { CoordinatorCard }
