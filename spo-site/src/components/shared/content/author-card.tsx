import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Author } from "@/types"

interface AuthorCardProps {
  author: Author
  className?: string
  variant?: "default" | "compact"
}

function AuthorCard({ author, className, variant = "default" }: AuthorCardProps) {
  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <Avatar className="h-8 w-8">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback className="body-sm">{author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="body-sm font-medium text-text">{author.name}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Avatar className="h-12 w-12">
        <AvatarImage src={author.avatar} alt={author.name} />
        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="body-md font-medium text-text">{author.name}</p>
        <p className="body-sm text-text-light">{author.role}</p>
      </div>
    </div>
  )
}

export { AuthorCard }
