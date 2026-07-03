"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { eventSchema, type EventFormData } from "@/lib/schemas"
import { useAdminEvents } from "@/hooks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormInput, FormTextarea, FormCheckbox, FormSelect } from "@/components/forms"
import {
  AdminFormLayout,
  ImagePreview,
} from "@/components/admin"
import { slugify } from "@/utils/formatters"
import type { Event } from "@/types"

interface EventFormProps {
  event?: Event
}

export function EventForm({ event }: EventFormProps) {
  const router = useRouter()
  const { save, create } = useAdminEvents()

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema) as Resolver<EventFormData>,
    defaultValues: {
      id: "",
      title: "",
      slug: "",
      description: "",
      longDescription: "",
      date: new Date().toISOString().split("T")[0],
      time: "",
      location: "",
      kind: "evento",
      type: "online",
      image: "",
      price: undefined,
      available: true,
      featured: false,
      ...(event || {}),
    },
  })

  const title = watch("title")
  const slug = watch("slug")

  useEffect(() => {
    if (!event && title && !slug) {
      setValue("slug", `${slugify(title)}-${Date.now().toString(36)}`, { shouldValidate: true })
    }
  }, [title, slug, setValue, event])

  const onSubmit = async (data: EventFormData) => {
    try {
      if (event) {
        await save(data as Event)
        toast.success("Evento atualizado com sucesso!")
      } else {
        await create(data as Omit<Event, "id">)
        toast.success("Evento criado com sucesso!")
      }
      router.push("/admin/eventos")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao salvar o evento."
      toast.error(message)
    }
  }

  const onError = () => {
    toast.error("Corrija os erros no formulário antes de salvar.")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <AdminFormLayout
        sidebar={
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Publicação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Controller
                name="available"
                control={control}
                render={({ field }) => (
                  <FormCheckbox
                    label="Inscrições abertas"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="featured"
                control={control}
                render={({ field }) => (
                  <FormCheckbox
                    label="Destacar na home"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Button type="submit" className="w-full" loading={isSubmitting}>
                {event ? "Salvar alterações" : "Criar evento"}
              </Button>
            </CardContent>
          </Card>
        }
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações do Evento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormInput
              label="Título"
              placeholder="Título do evento"
              error={errors.title}
              {...register("title")}
            />
            <FormInput
              label="Slug"
              placeholder="slug-do-evento"
              error={errors.slug}
              {...register("slug")}
            />
            <FormTextarea
              label="Descrição curta"
              placeholder="Breve descrição"
              error={errors.description}
              {...register("description")}
            />
            <FormTextarea
              label="Descrição longa"
              placeholder="Descrição completa do evento"
              rows={10}
              error={errors.longDescription}
              {...register("longDescription")}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Data e Local</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Data"
                type="date"
                error={errors.date}
                {...register("date")}
              />
              <FormInput
                label="Horário"
                type="time"
                error={errors.time}
                {...register("time")}
              />
            </div>
            <FormInput
              label="Local"
              placeholder="Ex: Online via Zoom"
              error={errors.location}
              {...register("location")}
            />
            <Controller
              name="kind"
              control={control}
              render={({ field }) => (
                <FormSelect
                  label="Tipo de entrada"
                  value={field.value}
                  onValueChange={field.onChange}
                  options={[
                    { value: "evento", label: "Evento (ocorre uma única vez)" },
                    { value: "programacao", label: "Programação (recorrente)" },
                  ]}
                  error={errors.kind}
                />
              )}
            />
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <FormSelect
                  label="Modalidade"
                  value={field.value}
                  onValueChange={field.onChange}
                  options={[
                    { value: "online", label: "Online" },
                    { value: "presencial", label: "Presencial" },
                    { value: "hibrido", label: "Híbrido" },
                  ]}
                  error={errors.type}
                />
              )}
            />
            <FormInput
              label="Preço (R$)"
              type="number"
              min={0}
              step="0.01"
              error={errors.price}
              {...register("price")}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Imagem de capa</CardTitle>
          </CardHeader>
          <CardContent>
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <ImagePreview
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="/images/events/event-01.jpg"
                />
              )}
            />
            {errors.image && <p className="body-sm text-accent mt-2">{errors.image.message}</p>}
          </CardContent>
        </Card>
      </AdminFormLayout>
    </form>
  )
}
