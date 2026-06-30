import { cn } from "@/lib/utils"

interface ProgressProps {
  value: number
  max?: number
  className?: string
  size?: "sm" | "md" | "lg"
  label?: string
}

const sizes = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
}

function Progress({ value, max = 100, className, size = "md", label }: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <div className="flex justify-between body-sm text-text">
          <span>{label}</span>
          <span className="text-text-light">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn("w-full bg-border rounded-full overflow-hidden", sizes[size])}>
        <div
          className={cn("bg-primary rounded-full transition-all duration-500", sizes[size])}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  )
}

export { Progress }
