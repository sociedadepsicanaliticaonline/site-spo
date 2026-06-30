export type CTAVariant = "horizontal" | "vertical" | "banner" | "card" | "newsletter"

export interface CTAProps {
  variant?: CTAVariant
  title: string
  description?: string
  buttonText: string
  buttonHref: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  className?: string
}
