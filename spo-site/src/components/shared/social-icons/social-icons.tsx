import { Globe, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SocialLink } from "@/types"

interface SocialIconsProps {
  links: SocialLink[]
  className?: string
  variant?: "default" | "light"
  size?: "sm" | "md"
}

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
}

const iconMap: Record<string, React.ReactNode> = {
  instagram: <ExternalLink className="h-4 w-4" />,
  youtube: <ExternalLink className="h-4 w-4" />,
  linkedin: <ExternalLink className="h-4 w-4" />,
  default: <Globe className="h-4 w-4" />,
}

function SocialIcons({ links, className, variant = "default", size = "md" }: SocialIconsProps) {
  return (
    <div className={cn("flex gap-3", className)}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center justify-center rounded-lg transition-colors",
            sizeMap[size],
            variant === "default"
              ? "bg-surface text-text-light hover:bg-primary hover:text-white"
              : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
          )}
          aria-label={link.label}
        >
          {iconMap[link.icon] || iconMap.default}
        </a>
      ))}
    </div>
  )
}

export { SocialIcons }
