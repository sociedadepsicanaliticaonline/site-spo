import type { VariantProps } from "class-variance-authority"
import type { buttonVariants } from "./button"

export type ButtonVariantProps = VariantProps<typeof buttonVariants>

export type ButtonVariant =
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "link"
  | "accent"
  | "danger"

export type ButtonSize = "default" | "sm" | "lg" | "xl" | "icon"
