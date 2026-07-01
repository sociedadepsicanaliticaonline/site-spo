"use client"

import { useEffect, useState } from "react"
import { useForm, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { formacaoContentSchema, type FormacaoContentFormData } from "@/lib/schemas"
import { useAdminFormacaoContent } from "@/hooks"
import { Button } from "@/components/ui/button"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { Spinner } from "@/components/ui/spinner"
import type { FormacaoContent, FormacaoContentKey } from "@/types"

interface FormacaoContentFormProps {
  contentKey: FormacaoContentKey
}

export function FormacaoContentForm({ contentKey }: FormacaoContentFormProps) {
  const { getByKey, save } = useAdminFormacaoContent()
  const [hydrated, setHydrated] = useState(false)
  const stored = getByKey(contentKey)

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormacaoContentFormData>({
    resolver: zodResolver(formacaoContentSchema) as Resolver<FormacaoContentFormData>,
    defaultValues: {
      id: stored?.id ?? `fc-${contentKey}`,
      key: contentKey,
      content: stored?.content ?? "",
      updatedAt: stored?.updatedAt ?? new Date().toISOString().split("T")[0],
    },
  })

  useEffect(() => {
    const item = getByKey(contentKey)
    if (item) {
      setValue("id", item.id)
      setValue("key", item.key)
      setValue("content", item.content)
      setValue("updatedAt", item.updatedAt)
    }
    setHydrated(true)
  }, [contentKey, getByKey, setValue])

  const content = watch("content")

  const onSubmit = (data: FormacaoContentFormData) => {
    try {
      const item: FormacaoContent = {
        id: data.id || `fc-${contentKey}`,
        key: data.key as FormacaoContentKey,
        content: data.content,
        updatedAt: new Date().toISOString().split("T")[0],
      }
      save(item)
      toast.success("Conteúdo atualizado com sucesso!")
    } catch {
      toast.error("Erro ao salvar o conteúdo.")
    }
  }

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center py-10">
        <Spinner size="md" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <RichTextEditor
        value={content || ""}
        onChange={(value) => setValue("content", value, { shouldValidate: true })}
        error={!!errors.content}
      />
      {errors.content && (
        <p className="body-sm text-accent">{errors.content.message}</p>
      )}
      <div className="flex items-center justify-end">
        <Button type="submit" loading={isSubmitting} disabled={!isDirty && !!stored}>
          {stored ? "Salvar alterações" : "Criar conteúdo"}
        </Button>
      </div>
    </form>
  )
}
