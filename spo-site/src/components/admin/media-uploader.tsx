"use client"

import { useState, useRef } from "react"
import { Upload, Library, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { MediaPicker } from "./media-picker"
import { useAdminMedia } from "@/hooks/use-admin-media"
import { cn } from "@/lib/utils"

interface MediaUploaderProps {
  value: string
  onChange: (url: string) => void
  accept?: "image" | "pdf" | "all"
  label?: string
  placeholder?: string
  className?: string
  showPreview?: boolean
}

export function MediaUploader({
  value,
  onChange,
  accept = "image",
  label,
  placeholder,
  className,
  showPreview = true,
}: MediaUploaderProps) {
  const [pickerOpen, setPickerOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { upload } = useAdminMedia()

  const isImage = accept === "image"
  const inputAccept = isImage ? "image/*" : accept === "pdf" ? "application/pdf" : "image/*,application/pdf"

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const result = await upload(file)
      if (result.success && result.item) {
        onChange(result.item.url)
        toast.success("Upload concluído!")
      } else {
        toast.error(result.error || "Erro no upload")
      }
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  return (
    <div className={cn("space-y-3", className)}>
      {label && <label className="body-sm font-medium text-text">{label}</label>}

      {showPreview && value && (
        <div className="w-full sm:w-40 aspect-video sm:aspect-square rounded-lg border border-border bg-surface overflow-hidden flex items-center justify-center">
          {value.startsWith("data:image") || value.match(/\.(jpg|jpeg|png|webp|gif|svg)/i) ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center text-text-light">
              <Library className="h-8 w-8 mb-1" />
              <span className="body-sm">Arquivo</span>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept={inputAccept}
          onChange={handleFile}
          className="hidden"
          id="media-inline-upload"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          loading={uploading}
          disabled={uploading}
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
          ) : (
            <Upload className="h-4 w-4 mr-1" />
          )}
          Enviar arquivo
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setPickerOpen(true)}
        >
          <Library className="h-4 w-4 mr-1" />
          Escolher da biblioteca
        </Button>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 px-4 py-2 rounded-lg border border-border bg-white body-md text-text placeholder:text-text-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      />
      <p className="body-sm text-text-light">
        Cole uma URL, envie um novo arquivo ou escolha da biblioteca.
      </p>

      <MediaPicker
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onSelect={onChange}
        accept={accept}
      />
    </div>
  )
}
