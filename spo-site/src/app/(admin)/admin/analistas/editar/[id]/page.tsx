"use client"

import { useParams } from "next/navigation"
import { useAdminAnalysts } from "@/hooks"
import { PageHeader } from "@/components/admin"
import { Spinner } from "@/components/ui/spinner"
import { AnalystForm } from "@/components/admin/forms/analyst-form"
import { EmptyState } from "@/components/ui/empty-state"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function AdminAnalistaFormPage() {
  const params = useParams()
  const id = params.id as string
  const isNew = id === "novo"
  const { isLoaded, getById } = useAdminAnalysts()

  const analyst = isNew ? undefined : getById(id)

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!isNew && !analyst) {
    return (
      <EmptyState
        title="Analista não encontrado"
        description="O analista que você tentou editar não existe."
        action={
          <Link href="/admin/analistas" className={cn(buttonVariants())}>
            Voltar para analistas
          </Link>
        }
      />
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={isNew ? "Novo analista" : "Editar analista"}
        description={isNew ? "Adicione um analista credenciado pela SPO." : `Editando: ${analyst?.name}`}
        backHref="/admin/analistas"
      />
      <AnalystForm analyst={analyst} />
    </div>
  )
}
