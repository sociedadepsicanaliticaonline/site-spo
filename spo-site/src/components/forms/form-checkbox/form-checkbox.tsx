"use client"

import { forwardRef } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import type { FieldError } from "react-hook-form"

interface FormCheckboxProps {
  label: string
  error?: FieldError
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
  id?: string
}

const FormCheckbox = forwardRef<HTMLButtonElement, FormCheckboxProps>(
  ({ label, error, checked, onCheckedChange, className, id }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-")
    return (
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <Checkbox
            ref={ref}
            id={inputId}
            checked={checked}
            onCheckedChange={onCheckedChange}
            aria-invalid={!!error}
          />
          <label htmlFor={inputId} className="body-md text-text cursor-pointer select-none">
            {label}
          </label>
        </div>
        {error && (
          <p className="body-sm text-accent ml-8" role="alert">
            {error.message}
          </p>
        )}
      </div>
    )
  }
)
FormCheckbox.displayName = "FormCheckbox"

export { FormCheckbox }
