import type { Testimonial } from "@/types"

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Dra. Helena Souza",
    role: "Psicóloga Clínica",
    avatar: "/images/avatars/testimonial-01.jpg",
    content:
      "A SPO transformou minha visão sobre a clínica. O suporte dos professores e o material teórico são impecáveis.",
    rating: 5,
    featured: true,
    createdAt: "2024-09-10",
  },
  {
    id: "test-2",
    name: "Ricardo Mendes",
    role: "Estudante de Psicanálise",
    avatar: "/images/avatars/testimonial-02.jpg",
    content:
      "A flexibilidade do online permitiu que eu mantivesse meus estudos sem comprometer minha agenda de atendimentos.",
    rating: 5,
    featured: true,
    createdAt: "2024-09-15",
  },
  {
    id: "test-3",
    name: "Ana Paula Klein",
    role: "Analista em Formação",
    avatar: "/images/avatars/testimonial-03.jpg",
    content:
      "Excelência acadêmica pura. Sinto-me parte de uma comunidade real, mesmo à distância.",
    rating: 5,
    featured: false,
    createdAt: "2024-08-20",
  },
]
