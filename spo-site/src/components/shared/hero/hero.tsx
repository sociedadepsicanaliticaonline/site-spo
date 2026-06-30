import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/layout/container"
import type { HeroProps, HeroVariant } from "./hero.types"
import heroBg from "@/assets/hero.png"

const variantStyles: Record<HeroVariant, {
  section: string
  title: string
  description: string
  badge: string
}> = {
  home: {
    section: "bg-primary-dark text-white min-h-[85vh] flex items-center relative overflow-hidden",
    title: "text-display-lg text-white",
    description: "text-white/80 max-w-2xl",
    badge: "bg-accent text-white",
  },
  internal: {
    section: "bg-primary-dark text-white py-24 md:py-32 relative overflow-hidden",
    title: "heading-xl text-white",
    description: "text-white/70 max-w-xl",
    badge: "bg-accent text-white",
  },
  course: {
    section: "bg-gradient-to-br from-primary-dark via-primary-dark to-primary text-white py-24 md:py-32 relative overflow-hidden",
    title: "heading-xl text-white",
    description: "text-white/70 max-w-xl",
    badge: "bg-accent text-white",
  },
  event: {
    section: "bg-primary-dark text-white py-24 md:py-28 relative overflow-hidden",
    title: "heading-xl text-white",
    description: "text-white/70 max-w-xl",
    badge: "bg-accent text-white",
  },
}

function Hero({
  variant = "home",
  title,
  subtitle,
  description,
  image,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  badge,
  className,
}: HeroProps) {
  const styles = variantStyles[variant]
  const isHome = variant === "home"

  return (
    <section className={cn(styles.section, className)}>
      {isHome && (
        <Image
          src={heroBg}
          alt=""
          fill
          className="object-cover"
          priority
          aria-hidden
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/95 to-primary-dark/60 pointer-events-none z-[1]" />
      <Container className="relative z-10 h-full">
        <div className={cn("flex items-center", isHome ? "min-h-[85vh] py-16" : "")}>
          <div className={cn(isHome ? "" : "max-w-3xl")}>
            {badge && (
              <Badge variant="secondary" className={cn("mb-6", styles.badge)}>
                {badge}
              </Badge>
            )}
            {subtitle && (
              <p className={cn(
                isHome
                  ? "font-heading text-2xl sm:text-3xl lg:text-4xl font-light italic text-white/80 mb-4 leading-snug tracking-wide"
                  : "caption text-white/60 mb-4 tracking-widest"
              )}>
                {subtitle}
              </p>
            )}
            <h1 className={cn("font-heading font-bold leading-tight mb-6", styles.title)}>
              {title}
            </h1>
            {description && (
              <p className={cn("body-lg leading-relaxed mb-8", styles.description)}>
                {description}
              </p>
            )}
            <div className="flex flex-wrap gap-4">
              {ctaText && ctaHref && (
                <Link
                  href={ctaHref}
                  className="inline-flex items-center justify-center gap-2 h-13 px-8 py-3 rounded-lg bg-primary text-white body-lg font-medium hover:bg-primary-light transition-all shadow-sm"
                >
                  {ctaText}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              {secondaryCtaText && secondaryCtaHref && (
                <Link
                  href={secondaryCtaHref}
                  className="inline-flex items-center justify-center gap-2 h-13 px-8 py-3 rounded-lg border-2 border-white/30 text-white body-lg font-medium hover:bg-white/10 transition-all"
                >
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export { Hero }
