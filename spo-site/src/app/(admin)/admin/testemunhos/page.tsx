"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Pencil, Trash2, Plus, Quote, Star } from "lucide-react"
import { toast } from "sonner"
import { useAdminTestimonials } from "@/hooks"
import { PageHeader, SearchFilter, DataTable, ConfirmDeleteModal, StatusBadge } from "@/components/admin"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Testimonial } from "@/types"

export default function AdminTestemunhosPage() {
  const router = useRouter()
  const { testimonials, remove } = useAdminTestimonials()
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = testimonials.filter((t) => {
    const term = search.toLowerCase()
    return (
      t.name.toLowerCase().includes(term) ||
      t.role.toLowerCase().includes(term) ||
      t.content.toLowerCase().includes(term)
    )
  })

  const handleDelete = () => {
    if (!deleteId) return
    remove(deleteId)
    toast.success("Testemunho excluído com sucesso!")
    setDeleteId(null)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Testemunhos"
        description="Gerencie os depoimentos dos alunos exibidos no site."
        action={{
          label: "Novo testemunho",
          href: "/admin/testemunhos/editar/novo",
          icon: <Plus className="h-4 w-4" />,
        }}
      />

      <SearchFilter
        value={search}
        onChange={setSearch}
        placeholder="Buscar por nome, função ou conteúdo..."
      />

      <DataTable<Testimonial>
        columns={[
          {
            key: "name",
            header: "Nome",
            cell: (t) => (
              <div className="flex items-center gap-3">
                <Quote className="h-4 w-4 text-text-light shrink-0" />
                <div>
                  <p className="font-medium text-text">{t.name}</p>
                  <p className="body-sm text-text-light">{t.role}</p>
                </div>
              </div>
            ),
          },
          {
            key: "content",
            header: "Depoimento",
            cell: (t) => (
              <p className="body-sm text-text-light line-clamp-2 max-w-md">{t.content}</p>
            ),
          },
          {
            key: "rating",
            header: "Avaliação",
            width: "140px",
            cell: (t) =>
              t.rating ? (
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3.5 w-3.5",
                        i < t.rating! ? "fill-yellow-400 text-yellow-400" : "text-border"
                      )}
                    />
                  ))}
                </div>
              ) : (
                <span className="body-sm text-text-light">—</span>
              ),
          },
          {
            key: "status",
            header: "Status",
            width: "120px",
            cell: (t) => (
              <StatusBadge
                active={t.featured ?? false}
                activeLabel="Destaque"
                inactiveLabel="Padrão"
              />
            ),
          },
        ]}
        items={filtered}
        keyExtractor={(t) => t.id}
        actions={(t) => (
          <>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => router.push(`/admin/testemunhos/editar/${t.id}`)}
              aria-label="Editar"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setDeleteId(t.id)}
              aria-label="Excluir"
            >
              <Trash2 className="h-4 w-4 text-accent" />
            </Button>
          </>
        )}
        emptyTitle="Nenhum testemunho encontrado"
        emptyDescription="Comece adicionando um depoimento de aluno."
        emptyAction={
          <Link href="/admin/testemunhos/editar/novo" className={cn(buttonVariants())}>
            Criar primeiro testemunho
          </Link>
        }
      />

      <ConfirmDeleteModal
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Excluir testemunho"
        description="Tem certeza que deseja excluir este testemunho? Esta ação não pode ser desfeita."
        onConfirm={handleDelete}
      />
    </div>
  )
}
