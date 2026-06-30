import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: "div" | "section" | "article" | "main"
}

function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={cn("container-site", className)}>
      {children}
    </Tag>
  )
}

export { Container }
