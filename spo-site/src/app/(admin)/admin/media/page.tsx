"use client"

import { useState, useRef } from "react"
import { Upload, Trash2, Copy, Image as ImageIcon, FileText, Check, X } from "lucide-react"
import { toast } from "sonner"
import { useAdminMedia, readFileAsDataURL } from "@/hooks/use-admin-media"
import { PageHeader, SearchFilter, ConfirmDeleteModal } from "@/components/admin"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { MediaItem } from "@/types"

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export default function AdminMediaPage() {
  const { items, upload, remove } = useAdminMedia()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState("")
  const [uploading, setUploading] = useState(false)
  const [filter, setFilter] = useState<"all" | "image" | "pdf">("all")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filtered = items.filter((item) => {
    if (filter !== "all" && item.type !== filter) return false
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    setUploading(true)
    try {
      for (const file of Array.from(files)) {
        const result = await upload(file)
        if (result.success) {
          toast.success(`"${file.name}" enviado com sucesso!`)
        } else {
          toast.error(result.error || "Erro no upload")
        }
      }
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const handleCopy = async (item: MediaItem) => {
    try {
      await navigator.clipboard.writeText(item.url)
      setCopiedId(item.id)
      toast.success("Link copiado!")
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      toast.error("Não foi possível copiar")
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    remove(deleteId)
    toast.success("Arquivo excluído")
    setDeleteId(null)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Biblioteca de Mídia"
        description="Faça upload de imagens e PDFs para usar nos conteúdos do site."
      />

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center text-center py-8 border-2 border-dashed border-border rounded-lg bg-surface/50">
            <Upload className="h-10 w-10 text-text-light mb-3" />
            <p className="body-md font-medium text-text mb-1">
              Arraste arquivos ou clique para selecionar
            </p>
            <p className="body-sm text-text-light mb-4">
              Imagens (JPG, PNG, WebP) até 2MB • PDFs até 3MB
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,application/pdf"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="media-upload"
            />
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              loading={uploading}
              disabled={uploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              Selecionar arquivos
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={cn(
              "px-3 py-1.5 rounded-lg body-sm font-medium transition-colors",
              filter === "all" ? "bg-primary text-white" : "bg-surface text-text hover:bg-border"
            )}
          >
            Todos ({items.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("image")}
            className={cn(
              "px-3 py-1.5 rounded-lg body-sm font-medium transition-colors",
              filter === "image" ? "bg-primary text-white" : "bg-surface text-text hover:bg-border"
            )}
          >
            Imagens ({items.filter((i) => i.type === "image").length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("pdf")}
            className={cn(
              "px-3 py-1.5 rounded-lg body-sm font-medium transition-colors",
              filter === "pdf" ? "bg-primary text-white" : "bg-surface text-text hover:bg-border"
            )}
          >
            PDFs ({items.filter((i) => i.type === "pdf").length})
          </button>
        </div>
        <SearchFilter
          value={search}
          onChange={setSearch}
          placeholder="Buscar por nome..."
          className="flex-1 max-w-md"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 border border-border rounded-xl bg-white">
          <ImageIcon className="h-12 w-12 text-text-light mx-auto mb-3" />
          <p className="body-md text-text-light">
            {items.length === 0 ? "Nenhum arquivo na biblioteca" : "Nenhum arquivo encontrado"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group rounded-xl border border-border bg-white overflow-hidden hover:border-primary transition-colors"
            >
              <div className="aspect-square bg-surface flex items-center justify-center overflow-hidden">
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-text-light p-4">
                    <FileText className="h-12 w-12 mb-2" />
                    <span className="body-sm">PDF</span>
                  </div>
                )}
              </div>
              <div className="p-3 space-y-2">
                <p className="body-sm font-medium text-text truncate" title={item.name}>
                  {item.name}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{formatBytes(item.size)}</Badge>
                  <Badge variant="outline">{item.type === "image" ? "IMG" : "PDF"}</Badge>
                </div>
                <div className="flex gap-1 pt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(item)}
                    className="flex-1"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 mr-1" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 mr-1" />
                        Copiar link
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setDeleteId(item.id)}
                    aria-label="Excluir"
                  >
                    <Trash2 className="h-4 w-4 text-accent" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDeleteModal
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Excluir arquivo"
        description="Tem certeza que deseja excluir este arquivo da biblioteca? Esta ação não pode ser desfeita."
        onConfirm={handleDelete}
      />
    </div>
  )
}
