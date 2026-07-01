import type { FooterColumn } from "@/types"

export const footerColumns: FooterColumn[] = [
  {
    id: "navegacao",
    title: "Navegação",
    links: [
      { label: "Home", href: "/" },
      { label: "Sobre", href: "/sobre" },
      { label: "Eventos", href: "/eventos" },
    ],
  },
  {
    id: "formacao",
    title: "Formação",
    links: [
      { label: "Nossa Proposta", href: "/formacao/nossa-proposta" },
      { label: "Análises", href: "/formacao/analises" },
      { label: "Supervisões", href: "/formacao/supervisoes" },
      { label: "Seminários", href: "/seminarios" },
      { label: "Cartéis", href: "/carteis" },
    ],
  },
  {
    id: "institucional",
    title: "Institucional",
    links: [
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
