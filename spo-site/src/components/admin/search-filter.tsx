"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SearchFilterProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchFilter({
  value,
  onChange,
  placeholder = "Buscar...",
  className,
}: SearchFilterProps) {
  return (
    <div className={cn("relative max-w-md", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-light" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  )
}
