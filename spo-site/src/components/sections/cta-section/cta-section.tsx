import { CTA } from "@/components/shared/cta"
import type { CTAVariant } from "@/components/shared/cta"
import type { CTA as CTAType } from "@/types"

interface CTASectionProps {
  variant?: CTAVariant
  title: string
  description?: string
  cta: CTAType
  secondaryCta?: CTAType
  className?: string
}

function CTASection({
  variant = "horizontal",
  title,
  description,
  cta,
  secondaryCta,
  className,
}: CTASectionProps) {
  return (
    <CTA
      variant={variant}
      title={title}
      description={description}
      buttonText={cta.buttonText}
      buttonHref={cta.buttonHref}
      secondaryButtonText={secondaryCta?.buttonText}
      secondaryButtonHref={secondaryCta?.buttonHref}
      className={className}
    />
  )
}

export { CTASection }
