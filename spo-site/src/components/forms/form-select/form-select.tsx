"use client"

import { forwardRef } from "react"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { FieldError } from "react-hook-form"

interface SelectOption {
  value: string
  label: string
}

interface FormSelectProps {
  label: string
  error?: FieldError
  placeholder?: string
  options: SelectOption[]
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  required?: boolean
}

const FormSelect = forwardRef<HTMLButtonElement, FormSelectProps>(
  ({ label, error, placeholder = "Selecione...", options, value, onValueChange, className, required }, ref) => {
    return (
      <div className="space-y-2">
        <label className="body-sm font-medium text-text">
          {label}
          {required && <span className="text-accent ml-1">*</span>}
        </label>
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger
            ref={ref}
            className={cn(error && "border-accent", className)}
            aria-invalid={!!error}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && (
          <p className="body-sm text-accent" role="alert">
            {error.message}
          </p>
        )}
      </div>
    )
  }
)
FormSelect.displayName = "FormSelect"

export { FormSelect }
