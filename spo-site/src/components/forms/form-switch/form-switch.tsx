"use client"

import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

interface FormSwitchProps {
  label: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
  id?: string
}

function FormSwitch({ label, checked, onCheckedChange, className, id }: FormSwitchProps) {
  const switchId = id || label.toLowerCase().replace(/\s+/g, "-")
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <SwitchPrimitive.Root
        id={switchId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="peer h-6 w-11 shrink-0 rounded-full border-2 border-border bg-surface transition-colors data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <SwitchPrimitive.Thumb className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform data-[state=checked]:translate-x-5" />
      </SwitchPrimitive.Root>
      <label htmlFor={switchId} className="body-md text-text cursor-pointer select-none">
        {label}
      </label>
    </div>
  )
}

export { FormSwitch }
