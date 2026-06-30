import Link from "next/link"
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react"
import { CardBase } from "@/components/cards/card-base"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { formatDate, formatDateShort } from "@/utils/formatters"
import type { Event } from "@/types"

interface EventCardProps {
  event: Event
  variant?: "default" | "featured"
  className?: string
}

function EventCard({ event, variant = "default", className }: EventCardProps) {
  if (variant === "featured") {
    return (
      <CardBase className={cn("flex items-center gap-6 p-6 group", className)} hover={false}>
        <div className="flex flex-col items-center text-center bg-primary-dark text-white rounded-xl px-5 py-3 min-w-[80px]">
          <span className="font-heading text-2xl font-bold leading-none">
            {new Date(event.date).getDate()}
          </span>
          <span className="caption text-white/70 mt-1">
            {formatDateShort(event.date).split(" ")[1]}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary" className="caption">{event.category.name}</Badge>
            <Badge variant="accent" className="caption">{event.type}</Badge>
          </div>
          <h4 className="heading-md text-text group-hover:text-primary transition-colors">
            {event.title}
          </h4>
          <p className="body-md text-text-light mt-1 flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(event.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {event.time}
            </span>
          </p>
        </div>
        <Link
          href={`/eventos/${event.slug}`}
          className="shrink-0 flex items-center gap-2 text-primary font-medium body-md hover:gap-3 transition-all"
        >
          Detalhes <ArrowRight className="h-4 w-4" />
        </Link>
      </CardBase>
    )
  }

  return (
    <CardBase className={cn("group", className)}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center text-center bg-primary-dark text-white rounded-lg px-4 py-2 min-w-[64px]">
            <span className="font-heading text-xl font-bold leading-none">
              {new Date(event.date).getDate()}
            </span>
            <span className="caption text-white/70 mt-0.5 text-[10px]">
              {formatDateShort(event.date).split(" ")[1]}
            </span>
          </div>
          <div>
            <Badge variant="secondary" className="mb-1">{event.category.name}</Badge>
            <Badge variant="accent" className="ml-1">{event.type}</Badge>
          </div>
        </div>
        <h3 className="heading-md text-text group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        <p className="body-md text-text-light line-clamp-2">{event.description}</p>
        <div className="space-y-2 body-sm text-text-light">
          <p className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {formatDate(event.date)} às {event.time}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {event.location}
          </p>
        </div>
        <Link
          href={`/eventos/${event.slug}`}
          className="inline-flex items-center gap-1 text-primary font-medium body-md hover:gap-2 transition-all mt-2"
        >
          Saiba mais <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </CardBase>
  )
}

export { EventCard }
