"use client"

import { useState, useCallback } from "react"
import {
  getAdminData,
  saveAdminData,
  generateId,
} from "@/lib/admin-store"
import type { MediaItem } from "@/types"

const STORAGE_KEY = "media"

const MAX_IMAGE_SIZE = 2 * 1024 * 1024
const MAX_PDF_SIZE = 3 * 1024 * 1024

export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error("Falha ao ler arquivo"))
    reader.readAsDataURL(file)
  })
}

function resizeImage(file: File, maxWidth = 1600): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const ratio = Math.min(1, maxWidth / img.width)
      const canvas = document.createElement("canvas")
      canvas.width = img.width * ratio
      canvas.height = img.height * ratio
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        URL.revokeObjectURL(url)
        return reject(new Error("Canvas não suportado"))
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url)
          if (blob) resolve(blob)
          else reject(new Error("Falha ao converter imagem"))
        },
        "image/jpeg",
        0.85
      )
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error("Falha ao carregar imagem"))
    }
    img.src = url
  })
}

export interface UploadResult {
  success: boolean
  item?: MediaItem
  error?: string
}

export function useAdminMedia() {
  const [items, setItems] = useState<MediaItem[]>(() =>
    getAdminData(STORAGE_KEY, [] as MediaItem[])
  )

  const refresh = useCallback(() => {
    setItems(getAdminData(STORAGE_KEY, [] as MediaItem[]))
  }, [])

  const upload = useCallback(
    async (file: File): Promise<UploadResult> => {
      try {
        const isImage = file.type.startsWith("image/")
        const isPdf = file.type === "application/pdf"

        if (!isImage && !isPdf) {
          return { success: false, error: "Tipo de arquivo não suportado. Use imagens ou PDFs." }
        }

        if (isImage && file.size > MAX_IMAGE_SIZE) {
          return { success: false, error: "Imagem muito grande (máx. 2MB)." }
        }
        if (isPdf && file.size > MAX_PDF_SIZE) {
          return { success: false, error: "PDF muito grande (máx. 3MB)." }
        }

        let dataUrl: string

        if (isImage) {
          const blob = await resizeImage(file)
          dataUrl = await readFileAsDataURL(new File([blob], file.name, { type: "image/jpeg" }))
        } else {
          dataUrl = await readFileAsDataURL(file)
        }

        const item: MediaItem = {
          id: generateId(),
          name: file.name,
          type: isImage ? "image" : "pdf",
          mimeType: isImage ? "image/jpeg" : file.type,
          size: file.size,
          url: dataUrl,
          uploadedAt: new Date().toISOString(),
        }

        const current = getAdminData<MediaItem>(STORAGE_KEY, [])
        const updated = [item, ...current]
        saveAdminData(STORAGE_KEY, updated)
        setItems(updated)
        return { success: true, item }
      } catch (err) {
        return {
          success: false,
          error: err instanceof Error ? err.message : "Erro ao processar arquivo",
        }
      }
    },
    []
  )

  const remove = useCallback((id: string) => {
    const current = getAdminData<MediaItem>(STORAGE_KEY, [])
    const updated = current.filter((m) => m.id !== id)
    saveAdminData(STORAGE_KEY, updated)
    setItems(updated)
  }, [])

  return {
    items,
    isLoaded: true,
    upload,
    remove,
    refresh,
  }
}
