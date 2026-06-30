"use client"

import { useParams } from "next/navigation"
import { useAdminCourses } from "@/hooks"
import { PageHeader } from "@/components/admin"
import { Spinner } from "@/components/ui/spinner"
import { CourseForm } from "@/components/admin/forms/course-form"
import { EmptyState } from "@/components/ui/empty-state"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function AdminSeminarioFormPage() {
  const params = useParams()
  const id = params.id as string
  const isNew = id === "novo"
  const { isLoaded, getById } = useAdminCourses()

  const course = isNew ? undefined : getById(id)

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!isNew && !course) {
    return (
      <EmptyState
        title="Seminário não encontrado"
        description="O seminário que você tentou editar não existe."
        action={
          <Link href="/admin/seminarios" className={cn(buttonVariants())}>
            Voltar para seminários
          </Link>
        }
      />
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={isNew ? "Novo seminário" : "Editar seminário"}
        description={isNew ? "Crie um novo seminário de formação." : `Editando: ${course?.title}`}
        backHref="/admin/seminarios"
      />
      <CourseForm course={course} />
    </div>
  )
}
