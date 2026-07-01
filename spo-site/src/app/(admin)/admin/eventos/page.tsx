"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Pencil, Trash2, Plus, Calendar } from "lucide-react"
import { toast } from "sonner"
import { useAdminEvents } from "@/hooks"
import { PageHeader, SearchFilter, DataTable, ConfirmDeleteModal, StatusBadge } from "@/components/admin"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/utils/formatters"
import type { Event } from "@/types"

const typeLabels = {
  online: "Online",
  presencial: "Presencial",
  hibrido: "Híbrido",
}

const kindLabels = {
  evento: "Evento",
  programacao: "Programação",
}

export default function AdminEventosPage() {
  const router = useRouter()
  const { events, remove } = useAdminEvents()
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filteredEvents = events.filter((event) => {
    const term = search.toLowerCase()
    return (
      event.title.toLowerCase().includes(term) ||
      event.location.toLowerCase().includes(term) ||
      event.category.name.toLowerCase().includes(term)
    )
  })

  const handleDelete = () => {
    if (!deleteId) return
    remove(deleteId)
    toast.success("Evento excluído com sucesso!")
    setDeleteId(null)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Eventos"
        description="Gerencie a agenda de eventos da SPO."
        action={{
          label: "Novo evento",
          href: "/admin/eventos/editar/novo",
          icon: <Plus className="h-4 w-4" />,
        }}
      />

      <SearchFilter
        value={search}
        onChange={setSearch}
        placeholder="Buscar por título, local ou categoria..."
      />

      <DataTable<Event>
        columns={[
          {
            key: "title",
            header: "Título",
            cell: (event) => (
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-text-light shrink-0" />
                <div>
                  <p className="font-medium text-text">{event.title}</p>
                  <p className="body-sm text-text-light">{event.slug}</p>
                </div>
              </div>
            ),
          },
          {
            key: "category",
            header: "Categoria",
            cell: (event) => <Badge variant="secondary">{event.category.name}</Badge>,
          },
          {
            key: "date",
            header: "Data",
            cell: (event) => `${formatDate(event.date)} às ${event.time}`,
          },
          {
            key: "kind",
            header: "Tipo de entrada",
            width: "160px",
            cell: (event) => (
              <Badge variant={event.kind === "programacao" ? "secondary" : "default"}>
                {kindLabels[event.kind]}
              </Badge>
            ),
          },
          {
            key: "type",
            header: "Modalidade",
            cell: (event) => <Badge variant="accent">{typeLabels[event.type]}</Badge>,
          },
          {
            key: "status",
            header: "Status",
            width: "120px",
            cell: (event) => (
              <div className="flex flex-wrap gap-1">
                <StatusBadge active={event.available} activeLabel="Aberto" inactiveLabel="Realizado" />
                {event.featured && <Badge variant="default">Destaque</Badge>}
              </div>
            ),
          },
        ]}
        items={filteredEvents}
        keyExtractor={(event) => event.id}
        actions={(event) => (
          <>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => router.push(`/admin/eventos/editar/${event.id}`)}
              aria-label="Editar"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setDeleteId(event.id)}
              aria-label="Excluir"
            >
              <Trash2 className="h-4 w-4 text-accent" />
            </Button>
          </>
        )}
        emptyTitle="Nenhum evento encontrado"
        emptyDescription="Comece criando um novo evento."
        emptyAction={
          <Link href="/admin/eventos/editar/novo" className={cn(buttonVariants())}>
            Criar primeiro evento
          </Link>
        }
      />

      <ConfirmDeleteModal
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Excluir evento"
        description="Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita."
        onConfirm={handleDelete}
      />
    </div>
  )
}
