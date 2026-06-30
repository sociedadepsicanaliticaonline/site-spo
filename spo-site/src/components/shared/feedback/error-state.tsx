import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  className?: string
}

function ErrorState({
  title = "Algo deu errado",
  message = "Não foi possível carregar o conteúdo. Tente novamente.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}>
      <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
        <AlertCircle className="h-8 w-8 text-accent" />
      </div>
      <h3 className="heading-md text-text mb-2">{title}</h3>
      <p className="body-md text-text-light max-w-sm mb-6">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          <RefreshCw className="h-4 w-4" />
          Tentar novamente
        </Button>
      )}
    </div>
  )
}

export { ErrorState }
