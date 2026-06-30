"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { blogPostSchema, type BlogPostFormData } from "@/lib/schemas"
import { useAdminBlog } from "@/hooks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormInput, FormTextarea, FormCheckbox } from "@/components/forms"
import {
  AdminFormLayout,
  ImagePreview,
  TagInput,
} from "@/components/admin"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { Input } from "@/components/ui/input"
import { slugify } from "@/utils/formatters"
import { generateId } from "@/lib/admin-store"
import type { BlogPost, Category, Tag } from "@/types"

interface BlogPostFormProps {
  post?: BlogPost
}

function createTag(name: string): Tag {
  return {
    id: generateId(),
    name,
    slug: slugify(name),
  }
}

function createCategory(name: string): Category {
  return {
    id: generateId(),
    name,
    slug: slugify(name),
  }
}

export function BlogPostForm({ post }: BlogPostFormProps) {
  const router = useRouter()
  const { save, create } = useAdminBlog()

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema) as Resolver<BlogPostFormData>,
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image: "",
      author: {
        id: "",
        name: "",
        avatar: "",
        role: "",
      },
      category: {
        id: "",
        name: "",
        slug: "",
      },
      tags: [],
      publishedAt: new Date().toISOString().split("T")[0],
      featured: false,
      readingTime: "",
      ...(post ? { ...post, content: post.content || "" } : {}),
    },
  })

  const title = watch("title")
  const slug = watch("slug")

  useEffect(() => {
    if (!post && title && !slug) {
      setValue("slug", slugify(title), { shouldValidate: true })
    }
  }, [title, slug, setValue, post])

  const onSubmit = (data: BlogPostFormData) => {
    try {
      if (post) {
        save(data as BlogPost)
        toast.success("Post atualizado com sucesso!")
      } else {
        create(data as Omit<BlogPost, "id">)
        toast.success("Post criado com sucesso!")
      }
      router.push("/admin/blog")
    } catch {
      toast.error("Erro ao salvar o post.")
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
              <FormInput
                label="Data de publicação"
                type="date"
                error={errors.publishedAt}
                {...register("publishedAt")}
              />
              <FormInput
                label="Tempo de leitura"
                placeholder="Ex: 8 min"
                error={errors.readingTime}
                {...register("readingTime")}
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
                {post ? "Salvar alterações" : "Publicar post"}
              </Button>
            </CardContent>
          </Card>
        }
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações do Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormInput
              label="Título"
              placeholder="Título do post"
              error={errors.title}
              {...register("title")}
            />
            <FormInput
              label="Slug"
              placeholder="slug-do-post"
              error={errors.slug}
              {...register("slug")}
            />
            <FormTextarea
              label="Resumo"
              placeholder="Breve resumo do post"
              error={errors.excerpt}
              {...register("excerpt")}
            />
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  label="Conteúdo"
                  value={field.value || ""}
                  onChange={field.onChange}
                  error={!!errors.content}
                />
              )}
            />
            {errors.content && (
              <p className="body-sm text-accent">{errors.content.message}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Autor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormInput
              label="Nome do autor"
              placeholder="Nome"
              error={errors.author?.name}
              {...register("author.name")}
            />
            <FormInput
              label="Cargo"
              placeholder="Ex: Psicanalista"
              error={errors.author?.role}
              {...register("author.role")}
            />
            <ImagePreview
              label="Avatar do autor"
              value={watch("author.avatar")}
              onChange={(value) => setValue("author.avatar", value, { shouldValidate: true })}
              placeholder="/images/avatars/author.jpg"
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
            {errors.tags && <p className="body-sm text-accent">{errors.tags.message}</p>}
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
                  placeholder="/images/blog/post-01.jpg"
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
