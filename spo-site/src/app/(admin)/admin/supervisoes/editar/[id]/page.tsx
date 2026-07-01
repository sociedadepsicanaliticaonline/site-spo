"use client"

import { useParams } from "next/navigation"
import { useAdminSupervisions } from "@/hooks"
import { PageHeader } from "@/components/admin"
import { Spinner } from "@/components/ui/spinner"
import { SupervisionForm } from "@/components/admin/forms/supervision-form"
import { EmptyState } from "@/components/ui/empty-state"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function AdminSupervisaoFormPage() {
  const params = useParams()
  const id = params.id as string
  const isNew = id === "novo"
  const { isLoaded, getById } = useAdminSupervisions()

  const supervision = isNew ? undefined : getById(id)

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!isNew && !supervision) {
    return (
      <EmptyState
        title="Supervisão não encontrada"
        description="A supervisão que você tentou editar não existe."
        action={
          <Link href="/admin/supervisoes" className={cn(buttonVariants())}>
            Voltar para supervisões
          </Link>
        }
      />
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={isNew ? "Nova supervisão" : "Editar supervisão"}
        description={
          isNew
            ? "Crie um novo grupo de supervisão."
            : `Editando: Supervisão com ${supervision?.supervisorName}`
        }
        backHref="/admin/supervisoes"
      />
      <SupervisionForm supervision={supervision} />
    </div>
  )
}
