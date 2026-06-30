import { Hero } from "@/components/shared/hero"
import type { HeroVariant } from "@/components/shared/hero"
import type { CTA } from "@/types"

interface HeroSectionProps {
  variant?: HeroVariant
  title: string
  subtitle?: string
  description?: string
  image?: string
  cta?: CTA
  badge?: string
  className?: string
}

function HeroSection({
  variant = "home",
  title,
  subtitle,
  description,
  image,
  cta,
  badge,
  className,
}: HeroSectionProps) {
  return (
    <Hero
      variant={variant}
      title={title}
      subtitle={subtitle}
      description={description}
      image={image}
      ctaText={cta?.buttonText}
      ctaHref={cta?.buttonHref}
      badge={badge}
      className={className}
    />
  )
}

export { HeroSection }
