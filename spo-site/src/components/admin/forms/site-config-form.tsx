"use client"

import { useRouter } from "next/navigation"
import { useFieldArray, useForm, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Plus, Trash2 } from "lucide-react"
import { siteConfigSchema, type SiteConfigFormData } from "@/lib/schemas"
import { useAdminSiteConfig } from "@/hooks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormInput, FormTextarea } from "@/components/forms"
import { AdminFormLayout, ImagePreview } from "@/components/admin"
import type { SiteConfig } from "@/types"

interface SiteConfigFormProps {
  initialConfig: SiteConfig
}

export function SiteConfigForm({ initialConfig }: SiteConfigFormProps) {
  const router = useRouter()
  const { save } = useAdminSiteConfig()

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SiteConfigFormData>({
    resolver: zodResolver(siteConfigSchema) as Resolver<SiteConfigFormData>,
    defaultValues: {
      ...initialConfig,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  })

  const onSubmit = (data: SiteConfigFormData) => {
    try {
      save(data as SiteConfig)
      toast.success("Configurações salvas com sucesso!")
      router.refresh()
    } catch {
      toast.error("Erro ao salvar as configurações.")
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
                Salvar configurações
              </Button>
            </CardContent>
          </Card>
        }
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Identidade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormInput
              label="Título do site"
              placeholder="Sociedade Psicanalítica Online"
              error={errors.title}
              {...register("title")}
            />
            <FormInput
              label="Nome curto"
              placeholder="SPO"
              error={errors.shortName}
              {...register("shortName")}
            />
            <FormTextarea
              label="Descrição"
              placeholder="Descrição institucional"
              error={errors.description}
              {...register("description")}
            />
            <FormInput
              label="URL do site"
              placeholder="https://spo.com.br"
              error={errors.url}
              {...register("url")}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormInput
              label="E-mail"
              type="email"
              placeholder="contato@spo.com.br"
              error={errors.email}
              {...register("email")}
            />
            <FormInput
              label="WhatsApp"
              placeholder="5511999999999"
              error={errors.whatsapp}
              {...register("whatsapp")}
            />
            <FormInput
              label="Telefone"
              placeholder="+55 (11) 99999-9999"
              error={errors.phone}
              {...register("phone")}
            />
            <FormInput
              label="Endereço"
              placeholder="São Paulo, SP"
              error={errors.address}
              {...register("address")}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">SEO</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormInput
              label="Template de título"
              placeholder="%s | SPO"
              error={errors.seo?.titleTemplate}
              {...register("seo.titleTemplate")}
            />
            <FormTextarea
              label="Descrição padrão"
              placeholder="Descrição para SEO"
              error={errors.seo?.defaultDescription}
              {...register("seo.defaultDescription")}
            />
            <div className="space-y-2">
              <label className="body-sm font-medium text-text">Imagem OG</label>
              <ImagePreview
                value={watch("seo.ogImage")}
                onChange={(value) => setValue("seo.ogImage", value, { shouldValidate: true })}
                placeholder="/images/og-image.jpg"
              />
              {errors.seo?.ogImage && (
                <p className="body-sm text-accent">{errors.seo.ogImage.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Redes Sociais</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ label: "", href: "", icon: "" })}
            >
              <Plus className="h-4 w-4 mr-1" />
              Adicionar
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.length === 0 && (
              <p className="body-md text-text-light">Nenhuma rede social cadastrada.</p>
            )}
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 rounded-lg border border-border bg-surface space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <FormInput
                    label="Rede"
                    placeholder="Instagram"
                    error={errors.socialLinks?.[index]?.label}
                    {...register(`socialLinks.${index}.label`)}
                  />
                  <FormInput
                    label="URL"
                    placeholder="https://instagram.com/spo"
                    error={errors.socialLinks?.[index]?.href}
                    {...register(`socialLinks.${index}.href`)}
                  />
                  <FormInput
                    label="Ícone"
                    placeholder="instagram"
                    error={errors.socialLinks?.[index]?.icon}
                    {...register(`socialLinks.${index}.icon`)}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    className="text-accent"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remover
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </AdminFormLayout>
    </form>
  )
}
