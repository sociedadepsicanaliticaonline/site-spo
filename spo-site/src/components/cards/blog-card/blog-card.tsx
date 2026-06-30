import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { CardBase } from "@/components/cards/card-base"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { formatDate } from "@/utils/formatters"
import type { BlogPost } from "@/types"

interface BlogCardProps {
  post: BlogPost
  variant?: "default" | "featured"
  className?: string
}

function BlogCard({ post, variant = "default", className }: BlogCardProps) {
  if (variant === "featured") {
    return (
      <CardBase padding="none" className={cn("overflow-hidden group", className)}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-full min-h-[280px] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">{post.category.name}</Badge>
              <p className="body-sm text-text-light flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readingTime}
                </span>
              </p>
              <h3 className="heading-md text-text group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="body-md text-text-light line-clamp-3">{post.excerpt}</p>
            </div>
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-border">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="body-sm font-medium text-text">{post.author.name}</p>
                  <p className="body-sm text-text-light">{post.author.role}</p>
                </div>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="flex items-center gap-1 text-primary font-medium body-md hover:gap-2 transition-all"
              >
                Ler <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </CardBase>
    )
  }

  return (
    <CardBase padding="none" className={cn("overflow-hidden group", className)}>
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-3">
          <Badge variant="secondary">{post.category.name}</Badge>
          <span className="body-sm text-text-light">{post.readingTime}</span>
        </div>
        <h3 className="heading-md text-text group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="body-md text-text-light line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center gap-3 pt-3 border-t border-border">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback className="body-sm">{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="body-sm font-medium text-text">{post.author.name}</p>
            <p className="body-sm text-text-light">{formatDate(post.publishedAt)}</p>
          </div>
        </div>
      </div>
    </CardBase>
  )
}

export { BlogCard }
