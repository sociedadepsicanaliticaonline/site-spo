import { cn } from "@/lib/utils"
import { FadeIn } from "@/components/shared/animations"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  align?: "left" | "center"
  className?: string
  light?: boolean
}

function SectionHeader({
  title,
  subtitle,
  description,
  align = "center",
  className,
  light = false,
}: SectionHeaderProps) {
  return (
    <FadeIn direction="up">
      <div
        className={cn(
          "space-y-4 mb-12 md:mb-16",
          align === "center" && "text-center",
          className
        )}
      >
        {subtitle && (
          <p
            className={cn(
              "caption font-bold tracking-widest",
              light ? "text-white/60" : "text-primary"
            )}
          >
            {subtitle}
          </p>
        )}
        <h2
          className={cn(
            "heading-lg",
            light ? "text-white" : "text-text"
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "body-lg max-w-2xl",
              align === "center" && "mx-auto",
              light ? "text-white/70" : "text-text-light"
            )}
          >
            {description}
          </p>
        )}
        <div
          className={cn(
            "w-16 h-1 rounded-full",
            align === "center" && "mx-auto",
            light ? "bg-white/30" : "bg-primary"
          )}
        />
      </div>
    </FadeIn>
  )
}

export { SectionHeader }
