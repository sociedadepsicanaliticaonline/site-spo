export const NAVIGATION_ITEMS = [
  { id: "home", label: "Home", href: "/" },
  { id: "sobre", label: "Sobre", href: "/sobre" },
  { id: "coordenadores", label: "Coordenadores", href: "/coordenadores" },
  { id: "seminarios", label: "Seminários", href: "/seminarios" },
  { id: "eventos", label: "Eventos", href: "/eventos" },
  { id: "carteis", label: "Cartéis", href: "/carteis" },
  { id: "blog", label: "Blog", href: "/blog" },
] as const

export const FOOTER_NAVIGATION = {
  navegacao: {
    title: "Navegação",
    links: [
      { label: "Home", href: "/" },
      { label: "Seminários", href: "/seminarios" },
      { label: "Sobre", href: "/sobre" },
      { label: "Blog", href: "/blog" },
      { label: "Eventos", href: "/eventos" },
    ],
  },
  institucional: {
    title: "Institucional",
    links: [
      { label: "Coordenadores", href: "/coordenadores" },
      { label: "Cartéis", href: "/carteis" },
      { label: "Produção Psicanalítica", href: "/producao-psicanalitica" },
    ],
  },
  suporte: {
    title: "Suporte",
    links: [
      { label: "Política de Privacidade", href: "/politica-de-privacidade" },
      { label: "Termos de Uso", href: "/termos-de-uso" },
    ],
  },
} as const
