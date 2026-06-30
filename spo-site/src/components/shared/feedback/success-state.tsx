import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface SuccessStateProps {
  title?: string
  message?: string
  children?: React.ReactNode
  className?: string
}

function SuccessState({
  title = "Operação concluída!",
  message,
  children,
  className,
}: SuccessStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}>
      <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
        <CheckCircle2 className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="heading-md text-text mb-2">{title}</h3>
      {message && <p className="body-md text-text-light max-w-sm">{message}</p>}
      {children}
    </div>
  )
}

export { SuccessState }
