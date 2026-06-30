export type HeroVariant = "home" | "internal" | "course" | "event"

export interface HeroProps {
  variant?: HeroVariant
  title: string
  subtitle?: string
  description?: string
  image?: string
  ctaText?: string
  ctaHref?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  badge?: string
  className?: string
}
