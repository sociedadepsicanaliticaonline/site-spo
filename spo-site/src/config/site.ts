import type { SiteConfig } from "@/types"

export const siteConfig: SiteConfig = {
  title: "Sociedade Psicanalítica Online",
  shortName: "SPO",
  description:
    "Formação e Saber em Psicanálise. A Sociedade Psicanalítica Online dedica-se à transmissão da psicanálise clássica e contemporânea.",
  url: "https://spo.com.br",
  email: "contato@spo.com.br",
  whatsapp: "5522998391755",
  phone: "+55 (11) 99999-9999",
  address: "São Paulo, SP",
  socialLinks: [
    {
      label: "Instagram",
      href: "https://instagram.com/spo",
      icon: "instagram",
    },
    {
      label: "YouTube",
      href: "https://youtube.com/@spo",
      icon: "youtube",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/company/spo",
      icon: "linkedin",
    },
  ],
  seo: {
    titleTemplate: "%s | SPO - Sociedade Psicanalítica Online",
    defaultDescription:
      "Formação e Saber em Psicanálise. Seminários, eventos e conteúdo psicanalítico de alto nível.",
    ogImage: "/images/og-image.jpg",
  },
}
