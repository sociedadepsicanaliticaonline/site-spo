import { cn } from "@/lib/utils"

interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: "white" | "surface" | "primary-dark" | "accent"
  id?: string
}

const backgroundStyles = {
  white: "bg-white",
  surface: "bg-surface",
  "primary-dark": "bg-primary-dark text-white",
  accent: "bg-accent text-white",
}

function Section({ children, className, background = "white", id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        backgroundStyles[background],
        className
      )}
    >
      {children}
    </section>
  )
}

export { Section }
