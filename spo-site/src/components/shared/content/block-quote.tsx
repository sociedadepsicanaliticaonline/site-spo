import { Quote } from "lucide-react"
import { cn } from "@/lib/utils"

interface BlockQuoteProps {
  children: React.ReactNode
  author?: string
  className?: string
}

function BlockQuote({ children, author, className }: BlockQuoteProps) {
  return (
    <blockquote className={cn("relative pl-8 py-4 my-8 border-l-4 border-primary", className)}>
      <Quote className="absolute -top-2 left-2 h-6 w-6 text-primary/20" />
      <div className="heading-md text-text italic font-serif leading-relaxed">
        {children}
      </div>
      {author && (
        <footer className="mt-4 body-sm text-text-light font-medium">
          &mdash; {author}
        </footer>
      )}
    </blockquote>
  )
}

export { BlockQuote }
