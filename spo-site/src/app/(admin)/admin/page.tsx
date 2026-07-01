"use client"

import Link from "next/link"
import { GraduationCap, Calendar, Settings, ArrowRight, Network, Quote, BookOpen, UserCheck, UserCog } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  useAdminCourses,
  useAdminEvents,
  useAdminCartels,
  useAdminTestimonials,
  useAdminAnalysts,
  useAdminSupervisions,
} from "@/hooks"

const sections = [
  {
    title: "Formação",
    description: "Textos das páginas de formação",
    href: "/admin/formacao",
    icon: BookOpen,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Analistas",
    description: "Analistas credenciados",
    href: "/admin/analistas",
    icon: UserCheck,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Supervisões",
    description: "Grupos de supervisão",
    href: "/admin/supervisoes",
    icon: UserCog,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Seminários",
    description: "Gerencie cursos e seminários",
    href: "/admin/seminarios",
    icon: GraduationCap,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Eventos",
    description: "Gerencie eventos e agenda",
    href: "/admin/eventos",
    icon: Calendar,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    title: "Cartéis",
    description: "Gerencie os cartéis da SPO",
    href: "/admin/carteis",
    icon: Network,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Testemunhos",
    description: "Gerencie depoimentos de alunos",
    href: "/admin/testemunhos",
    icon: Quote,
    color: "text-primary",
    bg: "bg-primary/10",
  },
]

export default function AdminDashboardPage() {
  const { courses, isLoaded: coursesLoaded } = useAdminCourses()
  const { events, isLoaded: eventsLoaded } = useAdminEvents()
  const { carteis, isLoaded: carteisLoaded } = useAdminCartels()
  const { testimonials, isLoaded: testimonialsLoaded } = useAdminTestimonials()
  const { analysts, isLoaded: analystsLoaded } = useAdminAnalysts()
  const { supervisions, isLoaded: supervisionsLoaded } = useAdminSupervisions()

  const counts: Record<string, number | string> = {
    Seminários: coursesLoaded ? courses.length : "—",
    Eventos: eventsLoaded ? events.length : "—",
    Cartéis: carteisLoaded ? carteis.length : "—",
    Testemunhos: testimonialsLoaded ? testimonials.length : "—",
    Analistas: analystsLoaded ? analysts.length : "—",
    Supervisões: supervisionsLoaded ? supervisions.length : "—",
    Formação: "3",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-md text-text">Painel Administrativo</h1>
        <p className="body-md text-text-light">
          Gerencie o conteúdo do site da Sociedade Psicanalítica Online.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <Card key={section.title} className="hover:border-primary transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${section.bg}`}>
                    <Icon className={`h-5 w-5 ${section.color}`} />
                  </div>
                  <span className="heading-md text-text">{counts[section.title]}</span>
                </div>
                <CardTitle className="text-lg mt-3">{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href={section.href}
                  className={cn(buttonVariants({ variant: "outline" }), "w-full inline-flex items-center justify-center gap-2")}
                >
                  Acessar
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Settings className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Informações do Site</CardTitle>
              <CardDescription>Atualize dados de contato, redes sociais e SEO.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Link href="/admin/config" className={cn(buttonVariants())}>
            Editar Configurações
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
