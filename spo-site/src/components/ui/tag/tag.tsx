import * as React from "react"

import { cn } from "@/lib/utils"

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline"
}

function Tag({ className, variant = "default", ...props }: TagProps) {
  const variants = {
    default: "bg-surface text-primary",
    accent: "bg-accent text-white",
    outline: "border border-border text-text-light",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 caption",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Tag }
