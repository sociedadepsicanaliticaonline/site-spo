import { Quote } from "lucide-react"
import { CardBase } from "@/components/cards/card-base"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Testimonial } from "@/types"

interface TestimonialCardProps {
  testimonial: Testimonial
  className?: string
}

function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <CardBase className={cn("relative pt-10", className)}>
      <div className="absolute -top-4 left-8 bg-primary text-white p-2.5 rounded-full">
        <Quote className="h-5 w-5" />
      </div>
      <div className="space-y-6">
        <p className="body-md text-text-light italic leading-relaxed">
          &ldquo;{testimonial.content}&rdquo;
        </p>
        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <Avatar className="h-12 w-12">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="body-sm font-bold text-text uppercase tracking-wide">
              {testimonial.name}
            </p>
            <p className="body-sm text-text-light">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </CardBase>
  )
}

export { TestimonialCard }
