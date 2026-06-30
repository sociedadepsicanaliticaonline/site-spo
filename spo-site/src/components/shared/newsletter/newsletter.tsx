"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface NewsletterProps {
  variant?: "default" | "light"
  className?: string
}

function Newsletter({ variant = "default", className }: NewsletterProps) {
  const isLight = variant === "light"
  return (
    <div className={cn("flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6", className)}>
      <div className="space-y-1">
        <h3 className={cn("body-md font-medium", isLight ? "text-white" : "text-text")}>
          Newsletter
        </h3>
        <p className={cn("body-sm", isLight ? "text-white/60" : "text-text-light")}>
          Receba novidades e conteúdos exclusivos da SPO.
        </p>
      </div>
      <div className="flex w-full sm:w-auto gap-2">
        <Input
          type="email"
          placeholder="Seu melhor e-mail"
          className={cn(
            isLight && "bg-white/10 border-white/20 text-white placeholder:text-white/40"
          )}
          aria-label="Email para newsletter"
        />
        <Button variant={isLight ? "default" : "default"} size="default" type="submit">
          <Send className="h-4 w-4 sm:hidden" />
          <span className="hidden sm:inline">Inscrever</span>
        </Button>
      </div>
    </div>
  )
}

export { Newsletter }
