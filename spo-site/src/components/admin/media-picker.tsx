"use client"

import { useState } from "react"
import { Search, Check, FileText, Image as ImageIcon } from "lucide-react"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from "@/components/ui/modal"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAdminMedia } from "@/hooks/use-admin-media"
import { cn } from "@/lib/utils"

interface MediaPickerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (url: string) => void
  accept?: "image" | "pdf" | "all"
  title?: string
}

export function MediaPicker({
  open,
  onOpenChange,
  onSelect,
  accept = "all",
  title = "Selecionar da biblioteca",
}: MediaPickerProps) {
  const { items } = useAdminMedia()
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = items.filter((item) => {
    if (accept !== "all" && item.type !== accept) return false
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleSelect = () => {
    if (selected) {
      onSelect(selected)
      setSelected(null)
      setSearch("")
      onOpenChange(false)
    }
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-3xl max-h-[80vh] flex flex-col">
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription>
            Escolha um arquivo já enviado para a biblioteca de mídia.
          </ModalDescription>
        </ModalHeader>

        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-light" />
            <Input
              type="text"
              placeholder="Buscar por nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-10 border border-border rounded-lg bg-surface">
              <ImageIcon className="h-10 w-10 text-text-light mx-auto mb-2" />
              <p className="body-md text-text-light">
                Nenhum arquivo disponível na biblioteca.
              </p>
              <p className="body-sm text-text-light mt-1">
                Faça upload na seção &quot;Mídia&quot; do painel.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 overflow-y-auto pr-1 flex-1">
              {filtered.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelected(item.url)}
                  className={cn(
                    "group rounded-lg border-2 overflow-hidden transition-all text-left bg-white",
                    selected === item.url
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="aspect-square bg-surface flex items-center justify-center overflow-hidden">
                    {item.type === "image" ? (
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FileText className="h-8 w-8 text-text-light" />
                    )}
                  </div>
                  <div className="p-2 space-y-1">
                    <p className="body-sm font-medium text-text truncate" title={item.name}>
                      {item.name}
                    </p>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      {item.type === "image" ? "IMG" : "PDF"}
                    </Badge>
                  </div>
                  {selected === item.url && (
                    <div className="absolute top-1 right-1 bg-primary text-white rounded-full p-0.5">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-border mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSelect} disabled={!selected}>
            Selecionar
          </Button>
        </div>
      </ModalContent>
    </Modal>
  )
}
