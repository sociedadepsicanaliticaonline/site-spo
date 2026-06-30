import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReadingTimeProps {
  time: string
  className?: string
}

function ReadingTime({ time, className }: ReadingTimeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 body-sm text-text-light", className)}>
      <Clock className="h-3.5 w-3.5" />
      {time} de leitura
    </span>
  )
}

export { ReadingTime }
