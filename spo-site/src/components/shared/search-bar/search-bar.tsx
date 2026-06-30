"use client"

import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  className?: string
  onSearch?: (query: string) => void
  placeholder?: string
}

function SearchBar({ className, onSearch, placeholder = "Buscar..." }: SearchBarProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <div className={cn("relative", className)}>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center h-10 w-10 rounded-lg text-text-light hover:text-primary hover:bg-surface transition-colors"
          aria-label="Abrir busca"
        >
          <Search className="h-5 w-5" />
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-48 md:w-64"
            aria-label="Campo de busca"
          />
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              setQuery("")
            }}
            className="flex items-center justify-center h-10 w-10 rounded-lg text-text-light hover:text-primary hover:bg-surface transition-colors"
            aria-label="Fechar busca"
          >
            <X className="h-5 w-5" />
          </button>
        </form>
      )}
    </div>
  )
}

export { SearchBar }
