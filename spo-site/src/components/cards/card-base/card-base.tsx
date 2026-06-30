import { cn } from "@/lib/utils"

export interface CardBaseProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: "none" | "sm" | "md" | "lg"
  variant?: "default" | "surface" | "highlight" | "primary-dark"
}

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
}

const variants = {
  default: "bg-white border border-border",
  surface: "bg-surface border border-border",
  highlight: "bg-white border-2 border-primary",
  "primary-dark": "bg-primary-dark text-white border border-primary-dark/20",
}

function CardBase({
  children,
  className,
  hover = true,
  padding = "md",
  variant = "default",
}: CardBaseProps) {
  return (
    <div
      className={cn(
        "rounded-xl transition-all duration-300",
        variants[variant],
        paddings[padding],
        hover &&
          "hover:shadow-lg hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </div>
  )
}

export { CardBase }
