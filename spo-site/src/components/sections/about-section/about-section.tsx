import Image from "next/image"
import { Container } from "@/components/layout/container"
import { SectionHeader } from "@/components/sections/section-header"
import { FadeIn, SlideIn } from "@/components/shared/animations"
import { cn } from "@/lib/utils"

interface AboutSectionProps {
  title: string
  subtitle?: string
  description: string
  image?: string
  features?: { title: string; description: string }[]
  reverse?: boolean
  className?: string
  light?: boolean
}

function AboutSection({
  title,
  subtitle,
  description,
  image,
  features,
  reverse = false,
  className,
  light = false,
}: AboutSectionProps) {
  return (
    <section className={cn("py-16 md:py-24", light ? "bg-primary-dark text-white" : "bg-white", className)}>
      <Container>
        <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center", reverse && "lg:direction-rtl")}>
          <FadeIn direction={reverse ? "right" : "left"}>
            <div className={cn("space-y-6", reverse && "lg:order-2")}>
              <SectionHeader
                title={title}
                subtitle={subtitle}
                description={description}
                align="left"
                light={light}
                className="mb-0"
              />
              {features && (
                <div className="space-y-4 mt-8">
                  {features.map((feature) => (
                    <div key={feature.title} className="flex gap-4">
                      <div className={cn("w-1 shrink-0 rounded-full", light ? "bg-white/30" : "bg-primary")} />
                      <div>
                        <h3 className={cn("heading-md mb-1", light ? "text-white" : "text-text")}>
                          {feature.title}
                        </h3>
                        <p className={cn("body-md", light ? "text-white/70" : "text-text-light")}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>
          {image && (
            <SlideIn direction={reverse ? "left" : "right"}>
              <div className={cn("relative rounded-2xl overflow-hidden", reverse && "lg:order-1")}>
                <Image
                  src={image}
                  alt={title}
                  width={640}
                  height={480}
                  className="w-full h-auto object-cover rounded-2xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </SlideIn>
          )}
        </div>
      </Container>
    </section>
  )
}

export { AboutSection }
