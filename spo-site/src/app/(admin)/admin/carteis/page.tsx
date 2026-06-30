"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Pencil, Trash2, Plus, Users } from "lucide-react"
import { toast } from "sonner"
import { useAdminCartels } from "@/hooks"
import { PageHeader, SearchFilter, DataTable, ConfirmDeleteModal, StatusBadge } from "@/components/admin"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Cartel } from "@/types"

export default function AdminCarteisPage() {
  const router = useRouter()
  const { carteis, remove } = useAdminCartels()
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filteredCartels = carteis.filter((cartel) => {
    const term = search.toLowerCase()
    return (
      cartel.name.toLowerCase().includes(term) ||
      cartel.moreOneName.toLowerCase().includes(term) ||
      cartel.meetingDay.toLowerCase().includes(term)
    )
  })

  const handleDelete = () => {
    if (!deleteId) return
    remove(deleteId)
    toast.success("Cartel excluído com sucesso!")
    setDeleteId(null)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cartéis"
        description="Gerencie os cartéis disponíveis na SPO."
        action={{
          label: "Novo cartel",
          href: "/admin/carteis/editar/novo",
          icon: <Plus className="h-4 w-4" />,
        }}
      />

      <SearchFilter
        value={search}
        onChange={setSearch}
        placeholder="Buscar por nome, Mais Um ou dia..."
      />

      <DataTable<Cartel>
        columns={[
          {
            key: "name",
            header: "Nome do Cartel",
            cell: (cartel) => (
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-text-light shrink-0" />
                <div>
                  <p className="font-medium text-text">{cartel.name}</p>
                  <p className="body-sm text-text-light">{cartel.slug}</p>
                </div>
              </div>
            ),
          },
          {
            key: "meeting",
            header: "Encontros",
            cell: (cartel) => (
              <div className="space-y-1">
                <Badge variant="secondary">{cartel.meetingDay}</Badge>
                <p className="body-sm text-text-light">
                  {cartel.meetingTime} • {cartel.frequency}
                </p>
              </div>
            ),
          },
          {
            key: "moreOne",
            header: "Mais Um",
            cell: (cartel) => cartel.moreOneName,
          },
          {
            key: "status",
            header: "Status",
            width: "140px",
            cell: (cartel) => (
              <StatusBadge
                active={cartel.available}
                activeLabel="Vagas abertas"
                inactiveLabel="Em andamento"
              />
            ),
          },
        ]}
        items={filteredCartels}
        keyExtractor={(cartel) => cartel.id}
        actions={(cartel) => (
          <>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => router.push(`/admin/carteis/editar/${cartel.id}`)}
              aria-label="Editar"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setDeleteId(cartel.id)}
              aria-label="Excluir"
            >
              <Trash2 className="h-4 w-4 text-accent" />
            </Button>
          </>
        )}
        emptyTitle="Nenhum cartel encontrado"
        emptyDescription="Comece criando um novo cartel."
        emptyAction={
          <Link href="/admin/carteis/editar/novo" className={cn(buttonVariants())}>
            Criar primeiro cartel
          </Link>
        }
      />

      <ConfirmDeleteModal
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Excluir cartel"
        description="Tem certeza que deseja excluir este cartel? Esta ação não pode ser desfeita."
        onConfirm={handleDelete}
      />
    </div>
  )
}
