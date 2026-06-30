import type { FooterColumn } from "@/types"

export const footerColumns: FooterColumn[] = [
  {
    id: "navegacao",
    title: "Navegação",
    links: [
      { label: "Home", href: "/" },
      { label: "Seminários", href: "/seminarios" },
      { label: "Sobre", href: "/sobre" },
      { label: "Blog", href: "/blog" },
      { label: "Eventos", href: "/eventos" },
    ],
  },
  {
    id: "institucional",
    title: "Institucional",
    links: [
      { label: "Cartéis", href: "/carteis" },
      { label: "Nossa (Re)Vista", href: "/nossa-revista" },
      { label: "Nossos Livros", href: "/nossos-livros" },
      { label: "Produção Psicanalítica", href: "/producao-psicanalitica" },
    ],
  },
  {
    id: "suporte",
    title: "Suporte",
    links: [
      { label: "Política de Privacidade", href: "/politica-de-privacidade" },
      { label: "Termos de Uso", href: "/termos-de-uso" },
    ],
  },
]
