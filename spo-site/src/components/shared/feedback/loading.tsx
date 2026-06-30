import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

interface LoadingProps {
  text?: string
  className?: string
  fullPage?: boolean
}

function Loading({ text = "Carregando...", className, fullPage = false }: LoadingProps) {
  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        <div className="flex flex-col items-center gap-3">
          <Spinner size="lg" />
          <p className="body-md text-text-light">{text}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col items-center justify-center py-16 gap-3", className)}>
      <Spinner size="lg" />
      <p className="body-md text-text-light">{text}</p>
    </div>
  )
}

export { Loading }
