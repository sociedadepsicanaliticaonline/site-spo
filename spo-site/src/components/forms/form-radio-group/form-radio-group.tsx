"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import type { FieldError } from "react-hook-form"

interface RadioOption {
  value: string
  label: string
}

interface FormRadioGroupProps {
  label: string
  error?: FieldError
  options: RadioOption[]
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  required?: boolean
}

function FormRadioGroup({
  label,
  error,
  options,
  value,
  onValueChange,
  className,
  required,
}: FormRadioGroupProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="body-sm font-medium text-text">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <RadioGroup value={value} onValueChange={onValueChange}>
        {options.map((opt) => (
          <div key={opt.value} className="flex items-center gap-3">
            <RadioGroupItem value={opt.value} id={opt.value} />
            <label htmlFor={opt.value} className="body-md text-text cursor-pointer select-none">
              {opt.label}
            </label>
          </div>
        ))}
      </RadioGroup>
      {error && (
        <p className="body-sm text-accent" role="alert">
          {error.message}
        </p>
      )}
    </div>
  )
}

export { FormRadioGroup }
