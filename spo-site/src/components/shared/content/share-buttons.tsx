"use client"

import { Share2, Link2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface ShareButtonsProps {
  url?: string
  title?: string
  className?: string
}

function ShareButtons({ url, title, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "")

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="body-sm text-text-light mr-1">Compartilhar:</span>
      <Button variant="ghost" size="icon-sm" onClick={handleCopy} aria-label="Copiar link">
        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Link2 className="h-4 w-4" />}
      </Button>
    </div>
  )
}

export { ShareButtons }
