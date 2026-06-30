"use client"

import type { FieldError } from "react-hook-form"
import { cn } from "@/lib/utils"

interface FormFieldProps {
  label: string
  error?: FieldError
  children: React.ReactNode
  className?: string
  required?: boolean
}

function FormField({ label, error, children, className, required }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="body-sm font-medium text-text">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="body-sm text-accent" role="alert">
          {error.message}
        </p>
      )}
    </div>
  )
}

export { FormField }
