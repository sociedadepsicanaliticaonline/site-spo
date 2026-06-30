"use client"

import { useParams } from "next/navigation"
import { useAdminCartels } from "@/hooks"
import { PageHeader } from "@/components/admin"
import { Spinner } from "@/components/ui/spinner"
import { CartelForm } from "@/components/admin/forms/cartel-form"
import { EmptyState } from "@/components/ui/empty-state"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function AdminCartelFormPage() {
  const params = useParams()
  const id = params.id as string
  const isNew = id === "novo"
  const { isLoaded, getById } = useAdminCartels()

  const cartel = isNew ? undefined : getById(id)

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!isNew && !cartel) {
    return (
      <EmptyState
        title="Cartel não encontrado"
        description="O cartel que você tentou editar não existe."
        action={
          <Link href="/admin/carteis" className={cn(buttonVariants())}>
            Voltar para cartéis
          </Link>
        }
      />
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={isNew ? "Novo cartel" : "Editar cartel"}
        description={isNew ? "Crie um novo cartel para a SPO." : `Editando: ${cartel?.name}`}
        backHref="/admin/carteis"
      />
      <CartelForm cartel={cartel} />
    </div>
  )
}
