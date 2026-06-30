"use client"

import { useRouter } from "next/navigation"
import { useForm, Controller, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { testimonialSchema, type TestimonialFormData } from "@/lib/schemas"
import { useAdminTestimonials } from "@/hooks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormInput, FormTextarea, FormCheckbox, FormSelect } from "@/components/forms"
import { AdminFormLayout } from "@/components/admin"
import { MediaUploader } from "@/components/admin/media-uploader"
import type { Testimonial } from "@/types"

interface TestimonialFormProps {
  testimonial?: Testimonial
}

export function TestimonialForm({ testimonial }: TestimonialFormProps) {
  const router = useRouter()
  const { save, create } = useAdminTestimonials()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema) as Resolver<TestimonialFormData>,
    defaultValues: {
      name: "",
      role: "",
      avatar: "",
      content: "",
      rating: 5,
      featured: false,
      createdAt: new Date().toISOString().split("T")[0],
      ...(testimonial || {}),
    },
  })

  const onSubmit = (data: TestimonialFormData) => {
    try {
      if (testimonial) {
        save(data as Testimonial)
        toast.success("Testemunho atualizado com sucesso!")
      } else {
        create(data as Omit<Testimonial, "id">)
        toast.success("Testemunho criado com sucesso!")
      }
      router.push("/admin/testemunhos")
    } catch {
      toast.error("Erro ao salvar o testemunho.")
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
                label="Data"
                type="date"
                error={errors.createdAt}
                {...register("createdAt")}
              />
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <FormSelect
                    label="Avaliação"
                    value={String(field.value ?? 5)}
                    onValueChange={(v) => field.onChange(Number(v))}
                    options={[
                      { value: "5", label: "5 estrelas" },
                      { value: "4", label: "4 estrelas" },
                      { value: "3", label: "3 estrelas" },
                      { value: "2", label: "2 estrelas" },
                      { value: "1", label: "1 estrela" },
                      { value: "0", label: "Sem avaliação" },
                    ]}
                  />
                )}
              />
              <Button type="submit" className="w-full" loading={isSubmitting}>
                {testimonial ? "Salvar alterações" : "Criar testemunho"}
              </Button>
            </CardContent>
          </Card>
        }
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações do Aluno</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormInput
              label="Nome"
              placeholder="Nome do aluno"
              error={errors.name}
              {...register("name")}
            />
            <FormInput
              label="Função / Cargo"
              placeholder="Ex: Psicóloga Clínica"
              error={errors.role}
              {...register("role")}
            />
            <Controller
              name="avatar"
              control={control}
              render={({ field }) => (
                <MediaUploader
                  label="Avatar"
                  value={field.value}
                  onChange={field.onChange}
                  accept="image"
                  placeholder="https://... ou faça upload"
                />
              )}
            />
            {errors.avatar && (
              <p className="body-sm text-accent">{errors.avatar.message}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Testemunho</CardTitle>
          </CardHeader>
          <CardContent>
            <FormTextarea
              label="Depoimento"
              placeholder="Escreva o testemunho do aluno..."
              rows={6}
              error={errors.content}
              {...register("content")}
            />
          </CardContent>
        </Card>
      </AdminFormLayout>
    </form>
  )
}
