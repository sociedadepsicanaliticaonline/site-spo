import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import { SectionHeader } from "@/components/sections/section-header"
import { CourseCard } from "@/components/cards/course-card"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/animations"
import { cn } from "@/lib/utils"
import type { Course } from "@/types"

interface CoursesSectionProps {
  title?: string
  subtitle?: string
  description?: string
  courses: Course[]
  showAllLink?: boolean
  featured?: boolean
  className?: string
}

function CoursesSection({
  title = "Formação Continuada",
  subtitle,
  description,
  courses,
  showAllLink = true,
  featured = false,
  className,
}: CoursesSectionProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-surface", className)}>
      <Container>
        <SectionHeader title={title} subtitle={subtitle} description={description} />
        <StaggerContainer className={cn("grid gap-6 md:gap-8", featured ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3")}>
          {courses.map((course) => (
            <StaggerItem key={course.id}>
              <CourseCard course={course} variant={featured ? "featured" : "default"} />
            </StaggerItem>
          ))}
        </StaggerContainer>
        {showAllLink && (
          <FadeIn direction="up">
            <div className="text-center mt-12">
              <Link
                href="/seminarios"
                className="inline-flex items-center gap-2 text-primary font-bold body-md hover:gap-3 transition-all"
              >
                Ver todos os seminários <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        )}
      </Container>
    </section>
  )
}

export { CoursesSection }
