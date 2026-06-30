"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Pencil, Trash2, Plus, Users } from "lucide-react"
import { toast } from "sonner"
import { useAdminCoordinators } from "@/hooks"
import { PageHeader, SearchFilter, DataTable, ConfirmDeleteModal } from "@/components/admin"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { Coordinator } from "@/types"

export default function AdminCoordenadoresPage() {
  const router = useRouter()
  const { coordinators, remove } = useAdminCoordinators()
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filteredCoordinators = coordinators.filter((coordinator) => {
    const term = search.toLowerCase()
    return (
      coordinator.name.toLowerCase().includes(term) ||
      coordinator.role.toLowerCase().includes(term) ||
      coordinator.specialties.some((s) => s.toLowerCase().includes(term))
    )
  })

  const handleDelete = () => {
    if (!deleteId) return
    remove(deleteId)
    toast.success("Coordenador excluído com sucesso!")
    setDeleteId(null)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Coordenadores"
        description="Gerencie o corpo docente da SPO."
        action={{
          label: "Novo coordenador",
          href: "/admin/coordenadores/editar/novo",
          icon: <Plus className="h-4 w-4" />,
        }}
      />

      <SearchFilter
        value={search}
        onChange={setSearch}
        placeholder="Buscar por nome, cargo ou especialidade..."
      />

      <DataTable<Coordinator>
        columns={[
          {
            key: "name",
            header: "Nome",
            cell: (coordinator) => (
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-text-light shrink-0" />
                <div>
                  <p className="font-medium text-text">{coordinator.name}</p>
                  <p className="body-sm text-text-light">{coordinator.slug}</p>
                </div>
              </div>
            ),
          },
          {
            key: "role",
            header: "Cargo",
            cell: (coordinator) => coordinator.role,
          },
          {
            key: "specialties",
            header: "Especialidades",
            cell: (coordinator) => (
              <div className="flex flex-wrap gap-1">
                {coordinator.specialties.slice(0, 3).map((spec) => (
                  <Badge key={spec} variant="secondary">
                    {spec}
                  </Badge>
                ))}
              </div>
            ),
          },
        ]}
        items={filteredCoordinators}
        keyExtractor={(coordinator) => coordinator.id}
        actions={(coordinator) => (
          <>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => router.push(`/admin/coordenadores/editar/${coordinator.id}`)}
              aria-label="Editar"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setDeleteId(coordinator.id)}
              aria-label="Excluir"
            >
              <Trash2 className="h-4 w-4 text-accent" />
            </Button>
          </>
        )}
        emptyTitle="Nenhum coordenador encontrado"
        emptyDescription="Comece cadastrando um coordenador."
        emptyAction={
          <Link href="/admin/coordenadores/editar/novo" className={cn(buttonVariants())}>
            Criar primeiro coordenador
          </Link>
        }
      />

      <ConfirmDeleteModal
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Excluir coordenador"
        description="Tem certeza que deseja excluir este coordenador? Esta ação não pode ser desfeita."
        onConfirm={handleDelete}
      />
    </div>
  )
}
