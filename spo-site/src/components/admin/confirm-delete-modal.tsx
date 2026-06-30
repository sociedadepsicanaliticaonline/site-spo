"use client"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface ConfirmDeleteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  onConfirm: () => void
  isLoading?: boolean
}

export function ConfirmDeleteModal({
  open,
  onOpenChange,
  title = "Excluir item",
  description = "Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.",
  onConfirm,
  isLoading = false,
}: ConfirmDeleteModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-sm">
        <ModalHeader>
          <div className="mx-auto sm:mx-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6 text-accent" />
          </div>
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription>{description}</ModalDescription>
        </ModalHeader>
        <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            loading={isLoading}
            className="w-full"
          >
            Excluir
          </Button>
        </div>
      </ModalContent>
    </Modal>
  )
}
