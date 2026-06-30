import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/layout/container"
import type { CTAProps, CTAVariant } from "./cta.types"

const variantStyles: Record<CTAVariant, string> = {
  horizontal: "bg-primary-dark text-white",
  vertical: "bg-primary-dark text-white text-center",
  banner: "bg-gradient-to-r from-primary-dark via-primary-dark to-primary text-white",
  card: "bg-white border border-border rounded-xl shadow-sm",
  newsletter: "bg-surface border border-border rounded-xl",
}

function CTA({
  variant = "horizontal",
  title,
  description,
  buttonText,
  buttonHref,
  secondaryButtonText,
  secondaryButtonHref,
  className,
}: CTAProps) {
  const isCard = variant === "card" || variant === "newsletter"

  const content = (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-center justify-between gap-6",
        variant === "vertical" && "md:flex-col text-center",
        isCard && "p-8 md:p-10",
        !isCard && "py-16 md:py-20"
      )}
    >
      <div className={cn("space-y-3", variant === "vertical" && "mx-auto")}>
        <h2
          className={cn(
            "heading-lg",
            isCard ? "text-text" : "text-white"
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "body-lg max-w-xl",
              isCard ? "text-text-light" : "text-white/70"
            )}
          >
            {description}
          </p>
        )}
      </div>
      <div className={cn("flex gap-4 shrink-0", variant === "vertical" && "justify-center")}>
        <Link
          href={buttonHref}
          className="inline-flex items-center justify-center gap-2 h-13 px-8 py-3 rounded-lg bg-primary text-white body-lg font-medium hover:bg-primary-light transition-all shadow-sm"
        >
          {buttonText}
          <ArrowRight className="h-4 w-4" />
        </Link>
        {secondaryButtonText && secondaryButtonHref && (
          <Link
            href={secondaryButtonHref}
            className={cn(
              "inline-flex items-center justify-center gap-2 h-13 px-8 py-3 rounded-lg border-2 body-lg font-medium transition-all",
              isCard
                ? "border-primary text-primary hover:bg-primary/5"
                : "border-white/30 text-white hover:bg-white/10"
            )}
          >
            {secondaryButtonText}
          </Link>
        )}
      </div>
    </div>
  )

  if (isCard) {
    return <div className={cn(variantStyles[variant], className)}>{content}</div>
  }

  return (
    <section className={cn(variantStyles[variant], className)}>
      <Container>{content}</Container>
    </section>
  )
}

export { CTA }
