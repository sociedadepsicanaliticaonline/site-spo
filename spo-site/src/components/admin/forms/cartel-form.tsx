"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { cartelSchema, type CartelFormData } from "@/lib/schemas"
import { useAdminCartels } from "@/hooks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormInput, FormTextarea, FormCheckbox, FormSelect } from "@/components/forms"
import { AdminFormLayout } from "@/components/admin"
import { slugify } from "@/utils/formatters"
import type { Cartel } from "@/types"

interface CartelFormProps {
  cartel?: Cartel
}

const days = [
  { value: "Segunda-feira", label: "Segunda-feira" },
  { value: "Terça-feira", label: "Terça-feira" },
  { value: "Quarta-feira", label: "Quarta-feira" },
  { value: "Quinta-feira", label: "Quinta-feira" },
  { value: "Sexta-feira", label: "Sexta-feira" },
  { value: "Sábado", label: "Sábado" },
  { value: "Domingo", label: "Domingo" },
]

const frequencies = [
  { value: "Semanal", label: "Semanal" },
  { value: "Quinzenal", label: "Quinzenal" },
  { value: "Mensal", label: "Mensal" },
]

export function CartelForm({ cartel }: CartelFormProps) {
  const router = useRouter()
  const { save, create } = useAdminCartels()

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CartelFormData>({
    resolver: zodResolver(cartelSchema) as Resolver<CartelFormData>,
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      meetingDay: "",
      meetingTime: "",
      frequency: "Semanal",
      moreOneName: "",
      moreOneWhatsapp: "",
      available: true,
      createdAt: new Date().toISOString().split("T")[0],
      ...(cartel || {}),
    },
  })

  const name = watch("name")
  const slug = watch("slug")

  useEffect(() => {
    if (!cartel && name && !slug) {
      setValue("slug", slugify(name), { shouldValidate: true })
    }
  }, [name, slug, setValue, cartel])

  const onSubmit = (data: CartelFormData) => {
    try {
      if (cartel) {
        save(data as Cartel)
        toast.success("Cartel atualizado com sucesso!")
      } else {
        create(data as Omit<Cartel, "id">)
        toast.success("Cartel criado com sucesso!")
      }
      router.push("/admin/carteis")
    } catch {
      toast.error("Erro ao salvar o cartel.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AdminFormLayout
        sidebar={
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Disponibilidade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Controller
                name="available"
                control={control}
                render={({ field }) => (
                  <FormCheckbox
                    label="Cartel com vagas abertas"
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
                {cartel ? "Salvar alterações" : "Criar cartel"}
              </Button>
            </CardContent>
          </Card>
        }
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações do Cartel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormInput
              label="Nome do Cartel"
              placeholder="Ex: Cartel sobre as Psicoses"
              error={errors.name}
              {...register("name")}
            />
            <FormInput
              label="Slug"
              placeholder="slug-do-cartel"
              error={errors.slug}
              {...register("slug")}
            />
            <FormTextarea
              label="Descrição"
              placeholder="Descreva o cartel, seus objetivos e temas de estudo"
              rows={5}
              error={errors.description}
              {...register("description")}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Encontros</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="meetingDay"
                control={control}
                render={({ field }) => (
                  <FormSelect
                    label="Dia dos encontros"
                    value={field.value}
                    onValueChange={field.onChange}
                    options={days}
                    placeholder="Selecione o dia"
                    error={errors.meetingDay}
                  />
                )}
              />
              <FormInput
                label="Horário"
                type="time"
                error={errors.meetingTime}
                {...register("meetingTime")}
              />
            </div>
            <Controller
              name="frequency"
              control={control}
              render={({ field }) => (
                <FormSelect
                  label="Frequência"
                  value={field.value}
                  onValueChange={field.onChange}
                  options={frequencies}
                  error={errors.frequency}
                />
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mais Um</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormInput
              label="Nome do Mais Um"
              placeholder="Nome completo"
              error={errors.moreOneName}
              {...register("moreOneName")}
            />
            <FormInput
              label="WhatsApp (somente números com DDI/DDD)"
              placeholder="5511999999999"
              error={errors.moreOneWhatsapp}
              {...register("moreOneWhatsapp")}
            />
            <p className="body-sm text-text-light">
              Formato: 55 (Brasil) + DDD + número. Exemplo: 5511999999999
            </p>
          </CardContent>
        </Card>
      </AdminFormLayout>
    </form>
  )
}
