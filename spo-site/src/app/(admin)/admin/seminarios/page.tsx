"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Pencil, Trash2, Plus, GraduationCap } from "lucide-react"
import { toast } from "sonner"
import { useAdminCourses } from "@/hooks"
import { PageHeader, SearchFilter, DataTable, ConfirmDeleteModal, StatusBadge } from "@/components/admin"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/utils/formatters"
import type { Course } from "@/types"

export default function AdminSeminariosPage() {
  const router = useRouter()
  const { courses, remove } = useAdminCourses()
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filteredCourses = courses.filter((course) => {
    const term = search.toLowerCase()
    return (
      course.title.toLowerCase().includes(term) ||
      course.instructor.name.toLowerCase().includes(term) ||
      course.category.name.toLowerCase().includes(term)
    )
  })

  const handleDelete = () => {
    if (!deleteId) return
    remove(deleteId)
    toast.success("Seminário excluído com sucesso!")
    setDeleteId(null)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Seminários"
        description="Gerencie os seminários e cursos de formação."
        action={{
          label: "Novo seminário",
          href: "/admin/seminarios/editar/novo",
          icon: <Plus className="h-4 w-4" />,
        }}
      />

      <SearchFilter
        value={search}
        onChange={setSearch}
        placeholder="Buscar por título, coordenador ou categoria..."
      />

      <DataTable<Course>
        columns={[
          {
            key: "title",
            header: "Título",
            cell: (course) => (
              <div className="flex items-center gap-3">
                <GraduationCap className="h-4 w-4 text-text-light shrink-0" />
                <div>
                  <p className="font-medium text-text">{course.title}</p>
                  <p className="body-sm text-text-light">{course.slug}</p>
                </div>
              </div>
            ),
          },
          {
            key: "category",
            header: "Categoria",
            cell: (course) => <Badge variant="secondary">{course.category.name}</Badge>,
          },
          {
            key: "instructor",
            header: "Coordenador",
            cell: (course) => course.instructor.name,
          },
          {
            key: "price",
            header: "Investimento",
            cell: (course) => formatPrice(course.price),
          },
          {
            key: "status",
            header: "Status",
            width: "120px",
            cell: (course) => (
              <div className="flex flex-wrap gap-1">
                <StatusBadge active={course.available} activeLabel="Aberto" inactiveLabel="Fechado" />
                {course.featured && <Badge variant="default">Destaque</Badge>}
              </div>
            ),
          },
        ]}
        items={filteredCourses}
        keyExtractor={(course) => course.id}
        actions={(course) => (
          <>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => router.push(`/admin/seminarios/editar/${course.id}`)}
              aria-label="Editar"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setDeleteId(course.id)}
              aria-label="Excluir"
            >
              <Trash2 className="h-4 w-4 text-accent" />
            </Button>
          </>
        )}
        emptyTitle="Nenhum seminário encontrado"
        emptyDescription="Comece criando um novo seminário."
        emptyAction={
          <Link href="/admin/seminarios/editar/novo" className={cn(buttonVariants())}>
            Criar primeiro seminário
          </Link>
        }
      />

      <ConfirmDeleteModal
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Excluir seminário"
        description="Tem certeza que deseja excluir este seminário? Esta ação não pode ser desfeita."
        onConfirm={handleDelete}
      />
    </div>
  )
}
