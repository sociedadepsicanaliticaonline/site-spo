"use client"

import { useRouter } from "next/navigation"
import { useForm, Controller, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { supervisionSchema, type SupervisionFormData } from "@/lib/schemas"
import { useAdminSupervisions } from "@/hooks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormInput, FormTextarea, FormCheckbox, FormSelect } from "@/components/forms"
import { AdminFormLayout } from "@/components/admin"
import type { Supervision } from "@/types"

interface SupervisionFormProps {
  supervision?: Supervision
}

const frequencies = [
  { value: "Semanal", label: "Semanal" },
  { value: "Quinzenal", label: "Quinzenal" },
  { value: "Mensal", label: "Mensal" },
]

export function SupervisionForm({ supervision }: SupervisionFormProps) {
  const router = useRouter()
  const { save, create } = useAdminSupervisions()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SupervisionFormData>({
    resolver: zodResolver(supervisionSchema) as Resolver<SupervisionFormData>,
    defaultValues: {
      supervisorName: "",
      date: "",
      time: "",
      frequency: "Semanal",
      whatsapp: "",
      description: "",
      available: true,
      createdAt: new Date().toISOString().split("T")[0],
      ...(supervision || {}),
    },
  })

  const onSubmit = (data: SupervisionFormData) => {
    try {
      if (supervision) {
        save(data as Supervision)
        toast.success("Supervisão atualizada com sucesso!")
      } else {
        create(data as Omit<Supervision, "id">)
        toast.success("Supervisão criada com sucesso!")
      }
      router.push("/admin/supervisoes")
    } catch {
      toast.error("Erro ao salvar a supervisão.")
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
                    label="Vagas abertas"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <FormInput
                label="Data de cadastro"
                type="date"
                error={errors.createdAt}
                {...register("createdAt")}
              />
              <Button type="submit" className="w-full" loading={isSubmitting}>
                {supervision ? "Salvar alterações" : "Criar supervisão"}
              </Button>
            </CardContent>
          </Card>
        }
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações da Supervisão</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormInput
              label="Nome do supervisor"
              placeholder="Ex: Eduardo Amaral"
              error={errors.supervisorName}
              {...register("supervisorName")}
            />
            <FormTextarea
              label="Descrição"
              placeholder="Descreva brevemente o foco e o formato da supervisão"
              rows={4}
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
              <FormInput
                label="Data de início"
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
            <FormInput
              label="WhatsApp para contato (somente números com DDI/DDD)"
              placeholder="5511999999999"
              error={errors.whatsapp}
              {...register("whatsapp")}
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
