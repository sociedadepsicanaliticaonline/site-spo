"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { coordinatorSchema, type CoordinatorFormData } from "@/lib/schemas"
import { useAdminCoordinators } from "@/hooks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormInput, FormTextarea } from "@/components/forms"
import { AdminFormLayout, ImagePreview, TagInput } from "@/components/admin"
import { slugify } from "@/utils/formatters"
import type { Coordinator } from "@/types"

interface CoordinatorFormProps {
  coordinator?: Coordinator
}

export function CoordinatorForm({ coordinator }: CoordinatorFormProps) {
  const router = useRouter()
  const { save, create } = useAdminCoordinators()

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CoordinatorFormData>({
    resolver: zodResolver(coordinatorSchema) as Resolver<CoordinatorFormData>,
    defaultValues: {
      name: "",
      slug: "",
      avatar: "",
      role: "",
      bio: "",
      specialties: [],
      education: [],
      socialLinks: {
        linkedin: "",
        lattes: "",
      },
      ...(coordinator || {}),
    },
  })

  const name = watch("name")
  const slug = watch("slug")

  useEffect(() => {
    if (!coordinator && name && !slug) {
      setValue("slug", slugify(name), { shouldValidate: true })
    }
  }, [name, slug, setValue, coordinator])

  const onSubmit = (data: CoordinatorFormData) => {
    try {
      if (coordinator) {
        save(data as Coordinator)
        toast.success("Coordenador atualizado com sucesso!")
      } else {
        create(data as Omit<Coordinator, "id">)
        toast.success("Coordenador criado com sucesso!")
      }
      router.push("/admin/coordenadores")
    } catch {
      toast.error("Erro ao salvar o coordenador.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AdminFormLayout
        sidebar={
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ações</CardTitle>
            </CardHeader>
            <CardContent>
              <Button type="submit" className="w-full" loading={isSubmitting}>
                {coordinator ? "Salvar alterações" : "Criar coordenador"}
              </Button>
            </CardContent>
          </Card>
        }
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormInput
              label="Nome"
              placeholder="Nome completo"
              error={errors.name}
              {...register("name")}
            />
            <FormInput
              label="Slug"
              placeholder="slug-do-coordenador"
              error={errors.slug}
              {...register("slug")}
            />
            <FormInput
              label="Cargo / Função"
              placeholder="Ex: Psicanalista | Diretor SPO"
              error={errors.role}
              {...register("role")}
            />
            <FormTextarea
              label="Bio"
              placeholder="Biografia resumida"
              rows={6}
              error={errors.bio}
              {...register("bio")}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Avatar</CardTitle>
          </CardHeader>
          <CardContent>
            <Controller
              name="avatar"
              control={control}
              render={({ field }) => (
                <ImagePreview
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="/images/avatars/coordinator-01.jpg"
                />
              )}
            />
            {errors.avatar && <p className="body-sm text-accent mt-2">{errors.avatar.message}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Especialidades e Formação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Controller
              name="specialties"
              control={control}
              render={({ field }) => (
                <TagInput
                  label="Especialidades"
                  values={field.value}
                  onChange={field.onChange}
                  placeholder="Adicionar especialidade"
                />
              )}
            />
            {errors.specialties && (
              <p className="body-sm text-accent">{errors.specialties.message}</p>
            )}
            <Controller
              name="education"
              control={control}
              render={({ field }) => (
                <TagInput
                  label="Formação"
                  values={field.value}
                  onChange={field.onChange}
                  placeholder="Adicionar formação"
                />
              )}
            />
            {errors.education && (
              <p className="body-sm text-accent">{errors.education.message}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormInput
              label="LinkedIn"
              placeholder="https://linkedin.com/in/..."
              error={errors.socialLinks?.linkedin}
              {...register("socialLinks.linkedin")}
            />
            <FormInput
              label="Currículo Lattes"
              placeholder="http://lattes.cnpq.br/..."
              error={errors.socialLinks?.lattes}
              {...register("socialLinks.lattes")}
            />
          </CardContent>
        </Card>
      </AdminFormLayout>
    </form>
  )
}
