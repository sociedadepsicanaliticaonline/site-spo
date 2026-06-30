"use client"

import { forwardRef } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { FieldError } from "react-hook-form"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: FieldError
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-")
    return (
      <div className="space-y-2">
        <label htmlFor={inputId} className="body-sm font-medium text-text">
          {label}
          {props.required && <span className="text-accent ml-1">*</span>}
        </label>
        <Input
          ref={ref}
          id={inputId}
          className={cn(error && "border-accent focus-visible:ring-accent", className)}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="body-sm text-accent" role="alert">
            {error.message}
          </p>
        )}
      </div>
    )
  }
)
FormInput.displayName = "FormInput"

export { FormInput }
