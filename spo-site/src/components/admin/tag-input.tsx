"use client"

import { useState, KeyboardEvent } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface TagInputProps {
  values: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  label?: string
  className?: string
}

export function TagInput({
  values,
  onChange,
  placeholder = "Adicionar...",
  label,
  className,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("")

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addValue()
    }
    if (e.key === "Backspace" && inputValue === "" && values.length > 0) {
      removeValue(values.length - 1)
    }
  }

  const addValue = () => {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    if (values.includes(trimmed)) {
      setInputValue("")
      return
    }
    onChange([...values, trimmed])
    setInputValue("")
  }

  const removeValue = (index: number) => {
    onChange(values.filter((_, i) => i !== index))
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && <label className="body-sm font-medium text-text">{label}</label>}
      <div className="flex flex-wrap gap-2 p-2 rounded-lg border border-border bg-white min-h-[46px]">
        {values.map((value, index) => (
          <Badge key={`${value}-${index}`} variant="secondary" className="gap-1 pr-1">
            {value}
            <button
              type="button"
              onClick={() => removeValue(index)}
              className="ml-1 rounded-full hover:bg-primary/10 p-0.5"
              aria-label={`Remover ${value}`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addValue}
          placeholder={values.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] border-0 bg-transparent px-2 py-1 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      <p className="body-sm text-text-light">Pressione Enter ou vírgula para adicionar</p>
    </div>
  )
}
