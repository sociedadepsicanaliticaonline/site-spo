"use client"

import { useParams } from "next/navigation"
import { useAdminTestimonials } from "@/hooks"
import { PageHeader } from "@/components/admin"
import { Spinner } from "@/components/ui/spinner"
import { TestimonialForm } from "@/components/admin/forms/testimonial-form"
import { EmptyState } from "@/components/ui/empty-state"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function AdminTestemunhoFormPage() {
  const params = useParams()
  const id = params.id as string
  const isNew = id === "novo"
  const { isLoaded, getById } = useAdminTestimonials()

  const testimonial = isNew ? undefined : getById(id)

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!isNew && !testimonial) {
    return (
      <EmptyState
        title="Testemunho não encontrado"
        description="O testemunho que você tentou editar não existe."
        action={
          <Link href="/admin/testemunhos" className={cn(buttonVariants())}>
            Voltar para testemunhos
          </Link>
        }
      />
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={isNew ? "Novo testemunho" : "Editar testemunho"}
        description={isNew ? "Adicione um novo depoimento." : `Editando: ${testimonial?.name}`}
        backHref="/admin/testemunhos"
      />
      <TestimonialForm testimonial={testimonial} />
    </div>
  )
}
