"use client"

import { PageHeader } from "@/components/admin"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormacaoContentForm } from "@/components/admin/forms/formacao-content-form"
import { BookOpen, UserCheck, UserCog, ExternalLink } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const sections = [
  {
    key: "nossa-proposta" as const,
    title: "Nossa Proposta",
    description: "Texto introdutório da página /formacao/nossa-proposta.",
    icon: BookOpen,
    pageHref: "/formacao/nossa-proposta",
  },
  {
    key: "analises-intro" as const,
    title: "Análises — Texto introdutório",
    description: "Texto exibido no topo da página /formacao/analises, antes da lista de analistas.",
    icon: UserCheck,
    pageHref: "/formacao/analises",
  },
  {
    key: "supervisoes-intro" as const,
    title: "Supervisões — Texto introdutório",
    description: "Texto exibido no topo da página /formacao/supervisoes, antes da lista de supervisões.",
    icon: UserCog,
    pageHref: "/formacao/supervisoes",
  },
]

export default function AdminFormacaoPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Formação"
        description="Edite os textos das páginas de formação e gerencie listas de analistas e supervisões."
      />

      {sections.map((section) => {
        const Icon = section.icon
        return (
          <Card key={section.key}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                </div>
                <Link
                  href={section.pageHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
                >
                  <ExternalLink className="h-4 w-4" />
                  Ver página
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <FormacaoContentForm contentKey={section.key} />
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
