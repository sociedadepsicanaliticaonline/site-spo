"use client"

import { useParams } from "next/navigation"
import { useAdminCoordinators } from "@/hooks"
import { PageHeader } from "@/components/admin"
import { Spinner } from "@/components/ui/spinner"
import { CoordinatorForm } from "@/components/admin/forms/coordinator-form"
import { EmptyState } from "@/components/ui/empty-state"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function AdminCoordenadorFormPage() {
  const params = useParams()
  const id = params.id as string
  const isNew = id === "novo"
  const { isLoaded, getById } = useAdminCoordinators()

  const coordinator = isNew ? undefined : getById(id)

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!isNew && !coordinator) {
    return (
      <EmptyState
        title="Coordenador não encontrado"
        description="O coordenador que você tentou editar não existe."
        action={
          <Link href="/admin/coordenadores" className={cn(buttonVariants())}>
            Voltar para coordenadores
          </Link>
        }
      />
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={isNew ? "Novo coordenador" : "Editar coordenador"}
        description={isNew ? "Cadastre um novo coordenador." : `Editando: ${coordinator?.name}`}
        backHref="/admin/coordenadores"
      />
      <CoordinatorForm coordinator={coordinator} />
    </div>
  )
}
