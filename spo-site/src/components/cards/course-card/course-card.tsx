import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, BarChart3 } from "lucide-react"
import { CardBase } from "@/components/cards/card-base"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { formatPrice } from "@/utils/formatters"
import type { Course } from "@/types"

interface CourseCardProps {
  course: Course
  variant?: "default" | "featured"
  className?: string
}

const levelColor = {
  iniciante: "bg-green-100 text-green-800",
  intermediário: "bg-yellow-100 text-yellow-800",
  avançado: "bg-red-100 text-red-800",
}

function CourseCard({ course, variant = "default", className }: CourseCardProps) {
  if (variant === "featured") {
    return (
      <CardBase padding="none" className={cn("overflow-hidden group", className)}>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-56 lg:h-full min-h-[260px] overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {course.available && (
              <div className="absolute top-4 right-4">
                <Badge variant="accent">Inscrições Abertas</Badge>
              </div>
            )}
          </div>
          <div className="p-6 lg:p-8 flex flex-col justify-between">
            <div className="space-y-3 lg:space-y-4">
              <Badge variant="secondary">{course.category.name}</Badge>
              <h3 className="heading-md text-text group-hover:text-primary transition-colors">
                {course.title}
              </h3>
              <p className="body-md text-text-light line-clamp-4">
                {course.description}
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-1 body-sm text-text-light">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 shrink-0" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <BarChart3 className="h-4 w-4 shrink-0" />
                  {course.level}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-5 lg:pt-6 mt-5 lg:mt-6 border-t border-border">
              <span className="heading-md text-primary">{formatPrice(course.price)}</span>
              <Link
                href={`/seminarios/${course.slug}`}
                className="flex items-center gap-1 text-primary font-medium body-md hover:gap-2 transition-all whitespace-nowrap"
              >
                Saiba mais <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </CardBase>
    )
  }

  return (
    <CardBase padding="none" className={cn("overflow-hidden group flex flex-col", className)}>
      <div className="relative h-44 sm:h-48 overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {course.available && (
          <div className="absolute top-3 right-3">
            <Badge variant="accent">Disponível</Badge>
          </div>
        )}
      </div>
      <div className="p-5 sm:p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary" className="shrink-0">{course.category.name}</Badge>
          <span className={cn("body-sm px-2 py-0.5 rounded font-medium shrink-0", levelColor[course.level])}>
            {course.level}
          </span>
        </div>
        <h3 className="heading-md text-text group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="body-md text-text-light line-clamp-3">{course.description}</p>
        <div className="flex items-center gap-2 body-sm text-text-light mt-auto">
          <Clock className="h-4 w-4 shrink-0" />
          {course.duration}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="heading-md text-primary">{formatPrice(course.price)}</span>
          <Link
            href={`/seminarios/${course.slug}`}
            className="flex items-center gap-1 text-primary font-medium body-md hover:gap-2 transition-all whitespace-nowrap"
          >
            Detalhes <ArrowRight className="h-4 w-4 shrink-0" />
          </Link>
        </div>
      </div>
    </CardBase>
  )
}

export { CourseCard }
