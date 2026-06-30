import type { Cartel } from "@/types"

export const carteis: Cartel[] = [
  {
    id: "cartel-1",
    name: "Cartel do Ato Analítico",
    slug: "cartel-do-ato-analitico",
    description:
      "Cartel dedicado ao estudo e discussão sobre o ato analítico na clínica contemporânea, articulando teoria e prática.",
    meetingDay: "Terça-feira",
    meetingTime: "20:00",
    frequency: "Quinzenal",
    moreOneName: "Eduardo Amaral",
    moreOneWhatsapp: "5511999990001",
    available: true,
    createdAt: "2025-01-15",
  },
  {
    id: "cartel-2",
    name: "Cartel sobre as Psicoses",
    slug: "cartel-sobre-as-psicoses",
    description:
      "Investigação dos conceitos fundamentais das psicoses a partir de Freud e Lacan, com foco na direção do tratamento.",
    meetingDay: "Quinta-feira",
    meetingTime: "19:30",
    frequency: "Semanal",
    moreOneName: "Daniel Gostautas",
    moreOneWhatsapp: "5511999990002",
    available: true,
    createdAt: "2025-02-01",
  },
  {
    id: "cartel-3",
    name: "Cartel: Leitura de Freud",
    slug: "cartel-leitura-de-freud",
    description:
      "Leitura comentada de textos fundamentais de Freud, articulando os conceitos clássicos às questões da clínica atual.",
    meetingDay: "Sábado",
    meetingTime: "10:00",
    frequency: "Quinzenal",
    moreOneName: "Luiz Felipe Zanini",
    moreOneWhatsapp: "5511999990003",
    available: true,
    createdAt: "2025-02-20",
  },
  {
    id: "cartel-4",
    name: "Cartel: Clínica com Crianças",
    slug: "cartel-clinica-com-criancas",
    description:
      "Espaço de discussão sobre os desafios e impasses da clínica psicanalítica com crianças e adolescentes.",
    meetingDay: "Quarta-feira",
    meetingTime: "18:30",
    frequency: "Semanal",
    moreOneName: "Rosângela Soares",
    moreOneWhatsapp: "5511999990004",
    available: false,
    createdAt: "2025-03-10",
  },
]

export function getCartelBySlug(slug: string): Cartel | undefined {
  return carteis.find((cartel) => cartel.slug === slug)
}

export function getAvailableCartels(): Cartel[] {
  return carteis.filter((cartel) => cartel.available)
}
