import type { Event } from "@/types"

export const events: Event[] = [
  {
    id: "evento-1",
    title: "Webinário: O Mal-estar na Civilização hoje",
    slug: "webinario-o-mal-estar-na-civilizacao-hoje",
    description:
      "Uma discussão contemporânea sobre os conceitos freudianos aplicados à sociedade atual, abordando violência, consumo e laços sociais.",
    longDescription:
      "Neste webinário, convidamos psicanalistas e pensadores contemporâneos para uma reflexão sobre a atualidade do texto freudiano 'O Mal-estar na Civilização'. Partindo da premissa de que o mal-estar é estrutural à vida em sociedade, discutiremos como as transformações culturais das últimas décadas - a digitalização da vida, o declínio das instituições tradicionais, a crise da autoridade - reconfiguram as formas de sofrimento e as saídas sintomáticas encontradas pelos sujeitos.",
    date: "2024-09-15",
    time: "19:30",
    location: "Online via Zoom",
    kind: "evento",
    type: "online",
    image: "/images/events/event-01.jpg",
    available: true,
    featured: true,
    category: { id: "cat-3", name: "Webinário", slug: "webinario" },
    tags: [
      { id: "tag-1", name: "Freud", slug: "freud" },
      { id: "tag-7", name: "Cultura", slug: "cultura" },
    ],
  },
  {
    id: "evento-2",
    title: "Jornada Clínica: Casos Difíceis",
    slug: "jornada-clinica-casos-dificeis",
    description:
      "Encontro exclusivo para alunos SPO com discussão de casos clínicos complexos e impasses na direção do tratamento.",
    longDescription:
      "A Jornada Clínica SPO é um evento anual que reúne alunos e professores para discussão aprofundada de casos clínicos que apresentaram impasses significativos ao longo do tratamento. Cada caso é apresentado pelo analista responsável e discutido por um debatedor convidado, seguido de debate aberto com a plateia. O evento é gratuito para alunos matriculados.",
    date: "2024-09-22",
    time: "09:00",
    location: "Auditório SPO (Online)",
    kind: "evento",
    type: "online",
    image: "/images/events/event-02.jpg",
    price: 0,
    available: true,
    featured: true,
    category: { id: "cat-4", name: "Jornada", slug: "jornada" },
    tags: [
      { id: "tag-8", name: "Clínica", slug: "clinica" },
      { id: "tag-9", name: "Casos", slug: "casos" },
    ],
  },
  {
    id: "evento-3",
    title: "Congresso Internacional de Psicanálise",
    slug: "congresso-internacional-de-psicanalise",
    description:
      "A SPO estará presente no Congresso Internacional com mesa redonda sobre formação do psicanalista na era digital.",
    longDescription:
      "A Sociedade Psicanalítica Online participará do Congresso Internacional de Psicanálise com uma mesa redonda intitulada 'A Formação do Psicanalista na Era Digital: Desafios e Possibilidades'. O evento contará com representantes de sociedades psicanalíticas do Brasil, Argentina, França e Inglaterra.",
    date: "2024-10-05",
    time: "10:00",
    location: "Centro de Convenções - SP",
    kind: "evento",
    type: "presencial",
    image: "/images/events/event-03.jpg",
    price: 250,
    available: true,
    featured: true,
    category: { id: "cat-5", name: "Congresso", slug: "congresso" },
    tags: [
      { id: "tag-10", name: "Formação", slug: "formacao" },
      { id: "tag-11", name: "Internacional", slug: "internacional" },
    ],
  },
  {
    id: "evento-4",
    title: "Grupo de Estudos: As Psicoses",
    slug: "grupo-de-estudos-as-psicoses",
    description:
      "Grupo de estudos sobre o diagnóstico diferencial e manejo clínico das psicoses na psicanálise.",
    date: "2024-10-10",
    time: "19:00",
    location: "Online via Zoom",
    kind: "programacao",
    type: "online",
    image: "/images/events/event-04.jpg",
    available: true,
    featured: false,
    category: { id: "cat-6", name: "Grupo de Estudos", slug: "grupo-de-estudos" },
    tags: [
      { id: "tag-12", name: "Psicoses", slug: "psicoses" },
      { id: "tag-13", name: "Diagnóstico", slug: "diagnostico" },
    ],
  },
  {
    id: "evento-5",
    title: "Lançamento de Livro: Clínica do Contemporâneo",
    slug: "lancamento-de-livro-clinica-do-contemporaneo",
    description:
      "Lançamento do novo livro da profa. Dra. Ana Lúcia Costa com sessão de autógrafos e debate.",
    date: "2024-10-20",
    time: "18:00",
    location: "Livraria Linha do Tempo - São Paulo",
    kind: "evento",
    type: "hibrido",
    image: "/images/events/event-05.jpg",
    available: true,
    featured: false,
    category: { id: "cat-7", name: "Lançamento", slug: "lancamento" },
    tags: [
      { id: "tag-14", name: "Livro", slug: "livro" },
      { id: "tag-15", name: "Publicação", slug: "publicacao" },
    ],
  },
]

export function getUpcomingEvents(): Event[] {
  return events.filter((event) => event.available && event.featured)
}

export function getEventos(): Event[] {
  return events.filter((event) => event.kind === "evento")
}

export function getProgramacoes(): Event[] {
  return events.filter((event) => event.kind === "programacao")
}

export function getPastEvents(): Event[] {
  return events.filter((event) => !event.available || !event.featured)
}

export function getEventBySlug(slug: string): Event | undefined {
  return events.find((event) => event.slug === slug)
}
