"use client"

import { useParams } from "next/navigation"
import { useAdminBlog } from "@/hooks"
import { PageHeader } from "@/components/admin"
import { Spinner } from "@/components/ui/spinner"
import { BlogPostForm } from "@/components/admin/forms/blog-post-form"
import { EmptyState } from "@/components/ui/empty-state"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function AdminBlogFormPage() {
  const params = useParams()
  const id = params.id as string
  const isNew = id === "novo"
  const { isLoaded, getById } = useAdminBlog()

  const post = isNew ? undefined : getById(id)

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!isNew && !post) {
    return (
      <EmptyState
        title="Post não encontrado"
        description="O post que você tentou editar não existe."
        action={
          <Link href="/admin/blog" className={cn(buttonVariants())}>
            Voltar para o blog
          </Link>
        }
      />
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={isNew ? "Novo post" : "Editar post"}
        description={isNew ? "Crie um novo artigo para o blog." : `Editando: ${post?.title}`}
        backHref="/admin/blog"
      />
      <BlogPostForm post={post} />
    </div>
  )
}
