"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Pencil, Trash2, Plus, UserCheck } from "lucide-react"
import { toast } from "sonner"
import { useAdminAnalysts } from "@/hooks"
import { PageHeader, SearchFilter, DataTable, ConfirmDeleteModal, StatusBadge } from "@/components/admin"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Analyst } from "@/types"

export default function AdminAnalistasPage() {
  const router = useRouter()
  const { analysts, remove } = useAdminAnalysts()
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = analysts.filter((analyst) => {
    const term = search.toLowerCase()
    return (
      analyst.name.toLowerCase().includes(term) ||
      analyst.city.toLowerCase().includes(term) ||
      analyst.state.toLowerCase().includes(term)
    )
  })

  const handleDelete = () => {
    if (!deleteId) return
    remove(deleteId)
    toast.success("Analista excluído com sucesso!")
    setDeleteId(null)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analistas"
        description="Gerencie os analistas credenciados exibidos na página de Análises."
        action={{
          label: "Novo analista",
          href: "/admin/analistas/editar/novo",
          icon: <Plus className="h-4 w-4" />,
        }}
      />

      <SearchFilter
        value={search}
        onChange={setSearch}
        placeholder="Buscar por nome, cidade ou estado..."
      />

      <DataTable<Analyst>
        columns={[
          {
            key: "name",
            header: "Nome",
            cell: (analyst) => (
              <div className="flex items-center gap-3">
                <UserCheck className="h-4 w-4 text-text-light shrink-0" />
                <p className="font-medium text-text">{analyst.name}</p>
              </div>
            ),
          },
          {
            key: "city",
            header: "Cidade",
            cell: (analyst) => analyst.city,
          },
          {
            key: "state",
            header: "UF",
            width: "80px",
            cell: (analyst) => analyst.state,
          },
          {
            key: "whatsapp",
            header: "WhatsApp",
            cell: (analyst) => analyst.whatsapp,
          },
          {
            key: "status",
            header: "Status",
            width: "160px",
            cell: (analyst) => (
              <StatusBadge
                active={analyst.available}
                activeLabel="Aceitando"
                inactiveLabel="Indisponível"
              />
            ),
          },
        ]}
        items={filtered}
        keyExtractor={(analyst) => analyst.id}
        actions={(analyst) => (
          <>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => router.push(`/admin/analistas/editar/${analyst.id}`)}
              aria-label="Editar"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setDeleteId(analyst.id)}
              aria-label="Excluir"
            >
              <Trash2 className="h-4 w-4 text-accent" />
            </Button>
          </>
        )}
        emptyTitle="Nenhum analista cadastrado"
        emptyDescription="Comece adicionando um analista credenciado."
        emptyAction={
          <Link href="/admin/analistas/editar/novo" className={cn(buttonVariants())}>
            Adicionar primeiro analista
          </Link>
        }
      />

      <ConfirmDeleteModal
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Excluir analista"
        description="Tem certeza que deseja excluir este analista? Esta ação não pode ser desfeita."
        onConfirm={handleDelete}
      />
    </div>
  )
}
