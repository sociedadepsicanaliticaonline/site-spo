"use client"

import { useParams } from "next/navigation"
import { useAdminEvents } from "@/hooks"
import { PageHeader } from "@/components/admin"
import { Spinner } from "@/components/ui/spinner"
import { EventForm } from "@/components/admin/forms/event-form"
import { EmptyState } from "@/components/ui/empty-state"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function AdminEventoFormPage() {
  const params = useParams()
  const id = params.id as string
  const isNew = id === "novo"
  const { isLoaded, getById } = useAdminEvents()

  const event = isNew ? undefined : getById(id)

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!isNew && !event) {
    return (
      <EmptyState
        title="Evento não encontrado"
        description="O evento que você tentou editar não existe."
        action={
          <Link href="/admin/eventos" className={cn(buttonVariants())}>
            Voltar para eventos
          </Link>
        }
      />
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={isNew ? "Novo evento" : "Editar evento"}
        description={isNew ? "Crie um novo evento na agenda." : `Editando: ${event?.title}`}
        backHref="/admin/eventos"
      />
      <EventForm event={event} />
    </div>
  )
}
