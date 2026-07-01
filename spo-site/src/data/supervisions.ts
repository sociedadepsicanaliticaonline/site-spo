import type { Supervision } from "@/types"

export const supervisions: Supervision[] = [
  {
    id: "supervisao-1",
    supervisorName: "Eduardo Amaral",
    date: "2026-02-10",
    time: "20:00",
    frequency: "Semanal",
    whatsapp: "5511999990001",
    description:
      "Supervisão clínica voltada à escuta de casos de neurose e direção do tratamento a partir do referencial lacaniano.",
    available: true,
    createdAt: "2025-12-01",
  },
  {
    id: "supervisao-2",
    supervisorName: "Camila Wosgrau",
    date: "2026-02-12",
    time: "19:00",
    frequency: "Quinzenal",
    whatsapp: "5551999990002",
    description:
      "Grupo de supervisão dedicado à clínica com crianças e adolescentes, com atenção ao setting e à transferência.",
    available: true,
    createdAt: "2025-12-10",
  },
  {
    id: "supervisao-3",
    supervisorName: "Daniel Gostautas",
    date: "2026-02-14",
    time: "10:00",
    frequency: "Semanal",
    whatsapp: "5541999990003",
    description:
      "Supervisão de casos de psicose, com foco no diagnóstico estrutural e nas possibilidades de tratamento.",
    available: true,
    createdAt: "2025-12-15",
  },
  {
    id: "supervisao-4",
    supervisorName: "Luiz Felipe Zanini",
    date: "2026-02-17",
    time: "18:30",
    frequency: "Quinzenal",
    whatsapp: "5531999990005",
    description:
      "Supervisão clínica geral, articulando teoria freudiana e lacaniana à prática do analista em início de percurso.",
    available: true,
    createdAt: "2025-12-20",
  },
  {
    id: "supervisao-5",
    supervisorName: "Rosângela Soares",
    date: "2026-02-19",
    time: "20:30",
    frequency: "Semanal",
    whatsapp: "5521999990004",
    description: "Grupo de supervisão dedicado ao início dos atendimentos clínicos e construção do setting analítico.",
    available: false,
    createdAt: "2026-01-05",
  },
]

export function getAvailableSupervisions(): Supervision[] {
  return supervisions.filter((supervision) => supervision.available)
}

export function getSupervisionById(id: string): Supervision | undefined {
  return supervisions.find((supervision) => supervision.id === id)
}
