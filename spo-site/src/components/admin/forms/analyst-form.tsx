"use client"

import { useRouter } from "next/navigation"
import { useForm, Controller, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { analystSchema, type AnalystFormData } from "@/lib/schemas"
import { useAdminAnalysts } from "@/hooks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormInput, FormCheckbox } from "@/components/forms"
import { AdminFormLayout } from "@/components/admin"
import type { Analyst } from "@/types"

interface AnalystFormProps {
  analyst?: Analyst
}

export function AnalystForm({ analyst }: AnalystFormProps) {
  const router = useRouter()
  const { save, create } = useAdminAnalysts()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AnalystFormData>({
    resolver: zodResolver(analystSchema) as Resolver<AnalystFormData>,
    defaultValues: {
      name: "",
      state: "",
      city: "",
      whatsapp: "",
      available: true,
      createdAt: new Date().toISOString().split("T")[0],
      ...(analyst || {}),
    },
  })

  const onSubmit = (data: AnalystFormData) => {
    try {
      if (analyst) {
        save(data as Analyst)
        toast.success("Analista atualizado com sucesso!")
      } else {
        create(data as Omit<Analyst, "id">)
        toast.success("Analista criado com sucesso!")
      }
      router.push("/admin/analistas")
    } catch {
      toast.error("Erro ao salvar o analista.")
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
                    label="Aceita novos analisandos"
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
                {analyst ? "Salvar alterações" : "Adicionar analista"}
              </Button>
            </CardContent>
          </Card>
        }
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações do Analista</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormInput
              label="Nome completo"
              placeholder="Nome do analista"
              error={errors.name}
              {...register("name")}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Cidade"
                placeholder="Ex: São Paulo"
                error={errors.city}
                {...register("city")}
              />
              <FormInput
                label="Estado (UF)"
                placeholder="Ex: SP"
                error={errors.state}
                {...register("state")}
              />
            </div>
            <FormInput
              label="WhatsApp (somente números com DDI/DDD)"
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
