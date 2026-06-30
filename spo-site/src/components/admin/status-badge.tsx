import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  active: boolean
  activeLabel?: string
  inactiveLabel?: string
}

export function StatusBadge({
  active,
  activeLabel = "Ativo",
  inactiveLabel = "Inativo",
}: StatusBadgeProps) {
  return (
    <Badge variant={active ? "default" : "outline"}>
      {active ? activeLabel : inactiveLabel}
    </Badge>
  )
}
