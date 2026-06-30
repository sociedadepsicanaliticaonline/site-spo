import { Tag } from "@/components/ui/tag"
import { cn } from "@/lib/utils"

interface CategoryChipProps {
  label: string
  className?: string
  variant?: "default" | "accent" | "outline"
}

function CategoryChip({ label, className, variant = "default" }: CategoryChipProps) {
  return (
    <Tag variant={variant} className={cn("caption font-medium", className)}>
      {label}
    </Tag>
  )
}

export { CategoryChip }
