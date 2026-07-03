"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { courseSchema, type CourseFormData } from "@/lib/schemas"
import { useAdminCourses } from "@/hooks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormInput, FormTextarea, FormCheckbox } from "@/components/forms"
import {
  AdminFormLayout,
  ImagePreview,
} from "@/components/admin"
import { Input } from "@/components/ui/input"
import { slugify } from "@/utils/formatters"
import { generateId } from "@/lib/admin-store"
import type { Course } from "@/types"

interface CourseFormProps {
  course?: Course
}

export function CourseForm({ course }: CourseFormProps) {
  const router = useRouter()
  const { save, create } = useAdminCourses()

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema) as Resolver<CourseFormData>,
    defaultValues: {
      id: "",
      title: "",
      slug: "",
      description: "",
      longDescription: "",
      price: 0,
      image: "",
      instructorName: "",
      duration: "",
      workload: "",
      featured: false,
      available: true,
      createdAt: new Date().toISOString().split("T")[0],
      ...(course || {}),
    },
  })

  const title = watch("title")
  const slug = watch("slug")

  useEffect(() => {
    if (!course && title && !slug) {
      setValue("slug", `${slugify(title)}-${Date.now().toString(36)}`, { shouldValidate: true })
    }
  }, [title, slug, setValue, course])

  const onSubmit = async (data: CourseFormData) => {
    try {
      if (course) {
        await save(data as Course)
        toast.success("Seminário atualizado com sucesso!")
      } else {
        await create(data as Omit<Course, "id">)
        toast.success("Seminário criado com sucesso!")
      }
      router.push("/admin/seminarios")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao salvar o seminário."
      toast.error(message)
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
              <FormInput
                label="Data de criação"
                type="date"
                error={errors.createdAt}
                {...register("createdAt")}
              />
              <Button type="submit" className="w-full" loading={isSubmitting}>
                {course ? "Salvar alterações" : "Criar seminário"}
              </Button>
            </CardContent>
          </Card>
        }
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações do Seminário</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormInput
              label="Título"
              placeholder="Título do seminário"
              error={errors.title}
              {...register("title")}
            />
            <FormInput
              label="Slug"
              placeholder="slug-do-seminario"
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
              placeholder="Descrição completa do seminário"
              rows={10}
              error={errors.longDescription}
              {...register("longDescription")}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Detalhes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Duração"
                placeholder="Ex: 1 semestre"
                error={errors.duration}
                {...register("duration")}
              />
              <FormInput
                label="Carga horária"
                placeholder="Ex: 20h"
                error={errors.workload}
                {...register("workload")}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Preço (R$)"
                type="number"
                min={0}
                step="0.01"
                error={errors.price}
                {...register("price")}
              />
              <FormInput
                label="Coordenador"
                placeholder="Nome do coordenador"
                error={errors.instructorName}
                {...register("instructorName")}
              />
            </div>
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
                  placeholder="/images/courses/course-01.jpg"
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
