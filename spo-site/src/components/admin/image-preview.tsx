"use client"

import Image from "next/image"
import { Input } from "@/components/ui/input"
import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImagePreviewProps {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  className?: string
}

export function ImagePreview({
  value,
  onChange,
  label = "Imagem",
  placeholder = "/images/example.jpg",
  className,
}: ImagePreviewProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <label className="body-sm font-medium text-text">{label}</label>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-40 aspect-video sm:aspect-square rounded-lg border border-border bg-surface overflow-hidden flex items-center justify-center shrink-0">
          {value ? (
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              onError={(e) => {
                ;(e.target as HTMLImageElement).style.display = "none"
              }}
            />
          ) : (
            <div className="flex flex-col items-center text-text-light">
              <ImageIcon className="h-8 w-8 mb-1" />
              <span className="body-sm">Sem imagem</span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
          <p className="body-sm text-text-light mt-2">
            Cole a URL da imagem. Recomendado: imagens em /images/...
          </p>
        </div>
      </div>
    </div>
  )
}
