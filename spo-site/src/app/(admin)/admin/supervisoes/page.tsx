"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Pencil, Trash2, Plus, UserCog, Calendar, Clock, Repeat } from "lucide-react"
import { toast } from "sonner"
import { useAdminSupervisions } from "@/hooks"
import { PageHeader, SearchFilter, DataTable, ConfirmDeleteModal, StatusBadge } from "@/components/admin"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatDate } from "@/utils/formatters"
import type { Supervision } from "@/types"

export default function AdminSupervisoesPage() {
  const router = useRouter()
  const { supervisions, remove } = useAdminSupervisions()
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = supervisions.filter((supervision) => {
    const term = search.toLowerCase()
    return (
      supervision.supervisorName.toLowerCase().includes(term) ||
      supervision.frequency.toLowerCase().includes(term) ||
      (supervision.description?.toLowerCase().includes(term) ?? false)
    )
  })

  const handleDelete = () => {
    if (!deleteId) return
    remove(deleteId)
    toast.success("Supervisão excluída com sucesso!")
    setDeleteId(null)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Supervisões"
        description="Gerencie os grupos de supervisão exibidos na página de Supervisões."
        action={{
          label: "Nova supervisão",
          href: "/admin/supervisoes/editar/novo",
          icon: <Plus className="h-4 w-4" />,
        }}
      />

      <SearchFilter
        value={search}
        onChange={setSearch}
        placeholder="Buscar por supervisor, frequência ou descrição..."
      />

      <DataTable<Supervision>
        columns={[
          {
            key: "supervisor",
            header: "Supervisor",
            cell: (supervision) => (
              <div className="flex items-center gap-3">
                <UserCog className="h-4 w-4 text-text-light shrink-0" />
                <p className="font-medium text-text">{supervision.supervisorName}</p>
              </div>
            ),
          },
          {
            key: "schedule",
            header: "Encontros",
            cell: (supervision) => (
              <div className="space-y-1">
                <div className="flex items-center gap-2 body-sm text-text-light">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  <span>{formatDate(supervision.date)}</span>
                </div>
                <div className="flex items-center gap-2 body-sm text-text-light">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  <span>{supervision.time}</span>
                </div>
                <div className="flex items-center gap-2 body-sm text-text-light">
                  <Repeat className="h-3.5 w-3.5 text-primary" />
                  <span>{supervision.frequency}</span>
                </div>
              </div>
            ),
          },
          {
            key: "whatsapp",
            header: "WhatsApp",
            cell: (supervision) => supervision.whatsapp,
          },
          {
            key: "status",
            header: "Status",
            width: "160px",
            cell: (supervision) => (
              <StatusBadge
                active={supervision.available}
                activeLabel="Vagas abertas"
                inactiveLabel="Em andamento"
              />
            ),
          },
        ]}
        items={filtered}
        keyExtractor={(supervision) => supervision.id}
        actions={(supervision) => (
          <>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => router.push(`/admin/supervisoes/editar/${supervision.id}`)}
              aria-label="Editar"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setDeleteId(supervision.id)}
              aria-label="Excluir"
            >
              <Trash2 className="h-4 w-4 text-accent" />
            </Button>
          </>
        )}
        emptyTitle="Nenhuma supervisão cadastrada"
        emptyDescription="Comece criando um grupo de supervisão."
        emptyAction={
          <Link href="/admin/supervisoes/editar/novo" className={cn(buttonVariants())}>
            Criar primeira supervisão
          </Link>
        }
      />

      <ConfirmDeleteModal
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Excluir supervisão"
        description="Tem certeza que deseja excluir esta supervisão? Esta ação não pode ser desfeita."
        onConfirm={handleDelete}
      />
    </div>
  )
}
