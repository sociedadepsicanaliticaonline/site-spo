import type { NavigationItem } from "@/types"

export const mainNavigation: NavigationItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "sobre", label: "Sobre", href: "/sobre" },
  {
    id: "formacao",
    label: "Formação",
    href: "#",
    children: [
      { id: "nossa-proposta", label: "Nossa Proposta", href: "/formacao/nossa-proposta" },
      { id: "analises", label: "Análises", href: "/formacao/analises" },
      { id: "supervisoes", label: "Supervisões", href: "/formacao/supervisoes" },
      { id: "seminarios", label: "Seminários", href: "/seminarios" },
      { id: "carteis", label: "Cartéis", href: "/carteis" },
    ],
  },
  { id: "eventos", label: "Eventos", href: "/eventos" },
  { id: "nossa-revista", label: "Nossa (Re)Vista", href: "/nossa-revista" },
  { id: "nossos-livros", label: "Nossos Livros", href: "/nossos-livros" },
]
