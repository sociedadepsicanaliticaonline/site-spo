import { Image } from "lucide-react"
import { cn } from "@/lib/utils"

interface PlaceholderProps {
  className?: string
  label?: string
}

function Placeholder({ className, label = "Imagem" }: PlaceholderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-surface rounded-xl text-text-light",
        className
      )}
    >
      <Image className="h-8 w-8 mb-2 opacity-50" />
      <span className="caption">{label}</span>
    </div>
  )
}

export { Placeholder }
