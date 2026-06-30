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
  TagInput,
} from "@/components/admin"
import { Input } from "@/components/ui/input"
import { slugify } from "@/utils/formatters"
import { generateId } from "@/lib/admin-store"
import type { Event, Category, Tag } from "@/types"

interface EventFormProps {
  event?: Event
}

function createTag(name: string): Tag {
  return { id: generateId(), name, slug: slugify(name) }
}

function createCategory(name: string): Category {
  return { id: generateId(), name, slug: slugify(name) }
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
      title: "",
      slug: "",
      description: "",
      longDescription: "",
      date: new Date().toISOString().split("T")[0],
      time: "",
      location: "",
      type: "online",
      image: "",
      price: undefined,
      available: true,
      featured: false,
      category: { id: "", name: "", slug: "" },
      tags: [],
      ...(event || {}),
    },
  })

  const title = watch("title")
  const slug = watch("slug")

  useEffect(() => {
    if (!event && title && !slug) {
      setValue("slug", slugify(title), { shouldValidate: true })
    }
  }, [title, slug, setValue, event])

  const onSubmit = (data: EventFormData) => {
    try {
      if (event) {
        save(data as Event)
        toast.success("Evento atualizado com sucesso!")
      } else {
        create(data as Omit<Event, "id">)
        toast.success("Evento criado com sucesso!")
      }
      router.push("/admin/eventos")
    } catch {
      toast.error("Erro ao salvar o evento.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              name="type"
              control={control}
              render={({ field }) => (
                <FormSelect
                  label="Tipo"
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
            <CardTitle className="text-lg">Categoria e Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="body-sm font-medium text-text">Categoria</label>
              <Input
                placeholder="Nome da categoria"
                value={watch("category.name")}
                onChange={(e) =>
                  setValue("category", createCategory(e.target.value), { shouldValidate: true })
                }
              />
              {errors.category?.name && (
                <p className="body-sm text-accent">{errors.category.name.message}</p>
              )}
            </div>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <TagInput
                  label="Tags"
                  values={field.value.map((t) => t.name)}
                  onChange={(values) => field.onChange(values.map(createTag))}
                  placeholder="Adicionar tag"
                />
              )}
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
