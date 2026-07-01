import type { Analyst } from "@/types"

export const analysts: Analyst[] = [
  {
    id: "analista-1",
    name: "Eduardo Amaral",
    state: "SP",
    city: "São Paulo",
    whatsapp: "5511999990001",
    available: true,
    createdAt: "2025-01-10",
  },
  {
    id: "analista-2",
    name: "Camila Wosgrau",
    state: "RS",
    city: "Porto Alegre",
    whatsapp: "5551999990002",
    available: true,
    createdAt: "2025-01-12",
  },
  {
    id: "analista-3",
    name: "Daniel Gostautas",
    state: "PR",
    city: "Curitiba",
    whatsapp: "5541999990003",
    available: true,
    createdAt: "2025-01-20",
  },
  {
    id: "analista-4",
    name: "Rosângela Soares",
    state: "RJ",
    city: "Rio de Janeiro",
    whatsapp: "5521999990004",
    available: true,
    createdAt: "2025-02-05",
  },
  {
    id: "analista-5",
    name: "Luiz Felipe Zanini",
    state: "MG",
    city: "Belo Horizonte",
    whatsapp: "5531999990005",
    available: true,
    createdAt: "2025-02-18",
  },
  {
    id: "analista-6",
    name: "Bruno Albuquerque",
    state: "BA",
    city: "Salvador",
    whatsapp: "5571999990006",
    available: false,
    createdAt: "2025-03-01",
  },
]

export function getAvailableAnalysts(): Analyst[] {
  return analysts.filter((analyst) => analyst.available)
}

export function getAnalystById(id: string): Analyst | undefined {
  return analysts.find((analyst) => analyst.id === id)
}
