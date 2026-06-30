"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Pencil, Trash2, Plus, FileText } from "lucide-react"
import { toast } from "sonner"
import { useAdminBlog } from "@/hooks"
import { PageHeader, SearchFilter, DataTable, ConfirmDeleteModal, StatusBadge } from "@/components/admin"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/utils/formatters"
import type { BlogPost } from "@/types"

export default function AdminBlogPage() {
  const router = useRouter()
  const { posts, remove } = useAdminBlog()
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filteredPosts = posts.filter((post) => {
    const term = search.toLowerCase()
    return (
      post.title.toLowerCase().includes(term) ||
      post.author.name.toLowerCase().includes(term) ||
      post.category.name.toLowerCase().includes(term)
    )
  })

  const handleDelete = () => {
    if (!deleteId) return
    remove(deleteId)
    toast.success("Post excluído com sucesso!")
    setDeleteId(null)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Blog"
        description="Gerencie os artigos e reflexões publicados no site."
        action={{
          label: "Novo post",
          href: "/admin/blog/editar/novo",
          icon: <Plus className="h-4 w-4" />,
        }}
      />

      <SearchFilter
        value={search}
        onChange={setSearch}
        placeholder="Buscar por título, autor ou categoria..."
      />

      <DataTable<BlogPost>
        columns={[
          {
            key: "title",
            header: "Título",
            cell: (post) => (
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-text-light shrink-0" />
                <div>
                  <p className="font-medium text-text">{post.title}</p>
                  <p className="body-sm text-text-light">{post.slug}</p>
                </div>
              </div>
            ),
          },
          {
            key: "category",
            header: "Categoria",
            cell: (post) => <Badge variant="secondary">{post.category.name}</Badge>,
          },
          {
            key: "author",
            header: "Autor",
            cell: (post) => post.author.name,
          },
          {
            key: "publishedAt",
            header: "Publicação",
            cell: (post) => formatDate(post.publishedAt),
          },
          {
            key: "status",
            header: "Status",
            width: "100px",
            cell: (post) => <StatusBadge active={post.featured} activeLabel="Destaque" inactiveLabel="Padrão" />,
          },
        ]}
        items={filteredPosts}
        keyExtractor={(post) => post.id}
        actions={(post) => (
          <>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => router.push(`/admin/blog/editar/${post.id}`)}
              aria-label="Editar"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setDeleteId(post.id)}
              aria-label="Excluir"
            >
              <Trash2 className="h-4 w-4 text-accent" />
            </Button>
          </>
        )}
        emptyTitle="Nenhum post encontrado"
        emptyDescription="Comece criando um novo post para o blog."
        emptyAction={
          <Link href="/admin/blog/editar/novo" className={cn(buttonVariants())}>
            Criar primeiro post
          </Link>
        }
      />

      <ConfirmDeleteModal
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Excluir post"
        description="Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita."
        onConfirm={handleDelete}
      />
    </div>
  )
}
