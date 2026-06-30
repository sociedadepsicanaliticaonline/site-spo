"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { courseSchema, type CourseFormData } from "@/lib/schemas"
import { useAdminCourses, useAdminCoordinators } from "@/hooks"
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
import type { Course, Category, Tag, Author } from "@/types"

interface CourseFormProps {
  course?: Course
}

function createTag(name: string): Tag {
  return { id: generateId(), name, slug: slugify(name) }
}

function createCategory(name: string): Category {
  return { id: generateId(), name, slug: slugify(name) }
}

export function CourseForm({ course }: CourseFormProps) {
  const router = useRouter()
  const { save, create } = useAdminCourses()
  const { coordinators } = useAdminCoordinators()

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
      title: "",
      slug: "",
      description: "",
      longDescription: "",
      price: 0,
      image: "",
      category: { id: "", name: "", slug: "" },
      instructor: { id: "", name: "", avatar: "", role: "" },
      duration: "",
      workload: "",
      level: "intermediário",
      featured: false,
      available: true,
      tags: [],
      createdAt: new Date().toISOString().split("T")[0],
      ...(course || {}),
    },
  })

  const title = watch("title")
  const slug = watch("slug")

  useEffect(() => {
    if (!course && title && !slug) {
      setValue("slug", slugify(title), { shouldValidate: true })
    }
  }, [title, slug, setValue, course])

  const coordinatorOptions = coordinators.map((c) => ({
    value: c.id,
    label: c.name,
  }))

  const handleInstructorChange = (coordinatorId: string) => {
    const selected = coordinators.find((c) => c.id === coordinatorId)
    if (selected) {
      const instructor: Author = {
        id: selected.id,
        name: selected.name,
        avatar: selected.avatar,
        role: selected.role,
        bio: selected.bio,
      }
      setValue("instructor", instructor, { shouldValidate: true })
    }
  }

  const onSubmit = (data: CourseFormData) => {
    try {
      if (course) {
        save(data as Course)
        toast.success("Seminário atualizado com sucesso!")
      } else {
        create(data as Omit<Course, "id">)
        toast.success("Seminário criado com sucesso!")
      }
      router.push("/admin/seminarios")
    } catch {
      toast.error("Erro ao salvar o seminário.")
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
              <Controller
                name="level"
                control={control}
                render={({ field }) => (
                  <FormSelect
                    label="Nível"
                    value={field.value}
                    onValueChange={field.onChange}
                    options={[
                      { value: "iniciante", label: "Iniciante" },
                      { value: "intermediário", label: "Intermediário" },
                      { value: "avançado", label: "Avançado" },
                    ]}
                    error={errors.level}
                  />
                )}
              />
            </div>
            <FormSelect
              label="Coordenador"
              value={watch("instructor.id")}
              onValueChange={handleInstructorChange}
              options={coordinatorOptions}
              placeholder="Selecione um coordenador"
            />
            {errors.instructor?.name && (
              <p className="body-sm text-accent">{errors.instructor.name.message}</p>
            )}
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
