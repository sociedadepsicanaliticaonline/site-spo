import type { Course } from "@/types"

export const courses: Course[] = [
  {
    id: "curso-1",
    title: "Lacan Sem Pressa",
    slug: "lacan-sem-pressa",
    description:
      "Seminário de leitura comentada dos seminários de Lacan, acompanhando o Seminário 4 sobre a relação de objeto.",
    longDescription:
      "Seguir no estudo da relação de objeto a partir do Seminário 4 de Lacan. O \"Lacan Sem Pressa\" é um seminário de leitura (não-toda) comentada dos seminários de Lacan, onde a palavra pode circular entre os que desejam se colocar em trabalho. Destinado a estudantes, interessados e psicanalistas que pretendam um início ou retorno às leituras (não solitárias) de Lacan fazendo trocas com um grupo sem \"lacanês\".\n\nAo vivo no Google Meet com acesso às gravações.",
    price: 500,
    image: "/images/courses/course-01.jpg",
    category: { id: "cat-1", name: "Teoria", slug: "teoria" },
    instructor: {
      id: "coord-eduardo",
      name: "Eduardo Amaral",
      avatar: "/images/avatars/coordinator-01.jpg",
      role: "Psicanalista",
      bio: "Psicanalista, fundador e diretor da Sociedade Psicanalítica Online.",
    },
    duration: "1 semestre",
    workload: "20h",
    level: "intermediário",
    featured: true,
    available: true,
    tags: [
      { id: "tag-1", name: "Lacan", slug: "lacan" },
      { id: "tag-2", name: "Leitura", slug: "leitura" },
    ],
    createdAt: "2025-12-01",
  },
  {
    id: "curso-2",
    title: "Freud no Nosso Tempo",
    slug: "freud-no-nosso-tempo",
    description:
      "Leitura comentada de duas histórias clínicas de Freud — Schreber e Homem dos Lobos — articuladas à contemporaneidade.",
    longDescription:
      "Este é um seminário de leitura comentada de duas histórias clínicas de Freud, a saber, Schreber e Homem dos Lobos, articuladas à contemporaneidade e ao fazer clínico com a psicose e com a neurose. Todo estudante ou psicanalista que tenha desejo pelo formato de leitura comentada é bem-vindo.\n\nAo vivo no Google Meet com acesso às gravações.",
    price: 500,
    image: "/images/courses/course-02.jpg",
    category: { id: "cat-1", name: "Teoria", slug: "teoria" },
    instructor: {
      id: "coord-eduardo",
      name: "Eduardo Amaral",
      avatar: "/images/avatars/coordinator-01.jpg",
      role: "Psicanalista",
      bio: "Psicanalista, fundador e diretor da Sociedade Psicanalítica Online.",
    },
    duration: "1 semestre",
    workload: "20h",
    level: "intermediário",
    featured: true,
    available: true,
    tags: [
      { id: "tag-3", name: "Freud", slug: "freud" },
      { id: "tag-4", name: "Clínica", slug: "clinica" },
    ],
    createdAt: "2025-12-01",
  },
  {
    id: "curso-3",
    title: "Psicoses: Da Teoria à Direção do Tratamento",
    slug: "psicoses-da-teoria-a-direcao-do-tratamento",
    description:
      "Estudo do conceito de psicose na psicanálise, desde a teoria freudiana até as possibilidades de tratamento.",
    longDescription:
      "Estudo do conceito de psicose na psicanálise, desde a teoria freudiana, passando pela psicose como estrutura em Lacan, a diferenciações entre as desencadeadas e não desencadeadas, até as possibilidades de tratamento, nos casos distintos. Todos que queiram ampliar seu conhecimento teórico sobre as psicoses, bem como o diagnóstico e o manejo na clínica.\n\nAo vivo no Google Meet com acesso às gravações.",
    price: 500,
    image: "/images/courses/course-03.jpg",
    category: { id: "cat-2", name: "Clínica", slug: "clinica" },
    instructor: {
      id: "coord-daniel",
      name: "Daniel Gostautas",
      avatar: "/images/avatars/coordinator-02.jpg",
      role: "Psicanalista",
      bio: "Psicanalista, coordenador de seminário na SPO.",
    },
    duration: "1 semestre",
    workload: "20h",
    level: "avançado",
    featured: true,
    available: true,
    tags: [
      { id: "tag-5", name: "Psicose", slug: "psicose" },
      { id: "tag-6", name: "Diagnóstico", slug: "diagnostico" },
    ],
    createdAt: "2025-12-01",
  },
  {
    id: "curso-4",
    title: "Pfister: Psicanálise e Cristianismo",
    slug: "pfister-psicanalise-e-cristianismo",
    description:
      "Percorrer as linhas fundamentais da leitura original de Oskar Pfister sobre a história do cristianismo.",
    longDescription:
      "\"Um pastor na casa de Freud\". Foi assim que Karin Wondracek se referiu a Oskar Pfister, teólogo que se tornou psicanalista e amigo de Sigmund Freud, com quem se correspondeu durante quase trinta anos. A proposta deste seminário consiste em percorrer algumas linhas fundamentais de sua leitura original da história do cristianismo, compreendendo as articulações que o autor traça entre teologia e psicanálise, em sua abordagem metapsicológica da fé cristã enquanto luta contra a angústia através do amor.\n\nAo vivo pelo Zoom com acesso às gravações.",
    price: 500,
    image: "/images/courses/course-04.jpg",
    category: { id: "cat-4", name: "Cultura", slug: "cultura" },
    instructor: {
      id: "coord-bruno",
      name: "Bruno Albuquerque",
      avatar: "/images/avatars/coordinator-03.jpg",
      role: "Psicanalista",
      bio: "Psicanalista, coordenador de seminário na SPO.",
    },
    duration: "1 semestre",
    workload: "30h",
    level: "intermediário",
    featured: false,
    available: true,
    tags: [
      { id: "tag-7", name: "Pfister", slug: "pfister" },
      { id: "tag-8", name: "Religião", slug: "religiao" },
    ],
    createdAt: "2025-12-01",
  },
  {
    id: "curso-5",
    title: "Sobre o Início dos Atendimentos",
    slug: "sobre-o-inicio-dos-atendimentos",
    description:
      "Construir as bases para os primeiros atendimentos clínicos no ofício de psicanalisar.",
    longDescription:
      "Proporcionar o contato com o fazer clínico, construindo as bases para os primeiros atendimentos e continuidade das sessões no ofício de psicanalisar. Tudo isso através de recursos didáticos como: vinhetas clínicas; leitura de textos; recortes de séries, filmes e vídeos; slides; trocas entre participantes dentre outros, objetivando desenvolver a sua escuta analítica, possibilidades de manejo clínico e tornar a clínica do impossível uma prática que se sustenta.\n\nConteúdo programático:\n\nSessão 1 — Do que é feito um psicanalista?\nSessão 2 — O primeiro analisando\nSessão 3 — Setting psicanalítico: sessões presenciais e sessões on-line\nSessão 4 — Recomendações freudianas a quem pratica a psicanálise\nSessão 5 — Atenção flutuante: anotar ou não anotar as sessões?\nSessão 6 — Entrevistas iniciais e tempo freudiano\nSessão 7 — Entrevistas iniciais e dinheiro\nSessão 8 — Cashback\nSessão 9 — A transferência\nSessão 10 — Transferência: espaço psíquico para trabalhar\nSessão 11 — Divã ou poltrona: uma questão de conforto\nSessão 12 — O amoralismo psicanalítico\nSessão 13 — Intervenções do analista: pontuação\nSessão 14 — Escansão e sessões de tempo variável\nSessão 15 — O corte como operador clínico e o ato analítico\nSessão 16 — Retorno do recalcado, repetição, captura e gozo\nSessão 17 — Contratransferência: a importância da supervisão clínica e da análise pessoal na formação do psicanalista\nSessão 18 — Curar ou não curar\nSessão 19 — O que fazer para ter mais pacientes?\nSessão 20 — E agora que o seminário acabou: balizas para a minha clínica\n\nAo vivo no Google Meet com acesso às gravações.",
    price: 500,
    image: "/images/courses/course-05.jpg",
    category: { id: "cat-2", name: "Clínica", slug: "clinica" },
    instructor: {
      id: "coord-rosangela",
      name: "Rosângela Soares",
      avatar: "/images/avatars/testimonial-01.jpg",
      role: "Psicanalista",
      bio: "Psicanalista, coordenadora de seminário na SPO.",
    },
    duration: "1 semestre",
    workload: "30h",
    level: "intermediário",
    featured: true,
    available: true,
    tags: [
      { id: "tag-9", name: "Atendimento", slug: "atendimento" },
      { id: "tag-10", name: "Formação", slug: "formacao" },
    ],
    createdAt: "2025-12-01",
  },
  {
    id: "curso-6",
    title: "Cultura, Política, Religião e Arte",
    slug: "cultura-politica-religiao-e-arte",
    description:
      "Passar pela obra freudiana em seu diálogo com a ciência sociológica, intercalando os seus textos.",
    longDescription:
      "Passar pela obra freudiana em seu diálogo com a ciência sociológica, intercalando os seus textos e aprofundando o estudo. 3° dos 4 Tempos de Freud — trajetória bienal que consiste em passar por todos os tempos da obra de Freud separada em 4 seminários, 4 semestres, 4 Tempos de Freud.\n\nLeituras: Gradiva de Jensen, Personagens psicopáticos no palco, Romances Familiares, Leonardo da Vinci, Totem e Tabu, O Moisés de Michelangelo, Considerações sobre a guerra e a morte, Psicologia das Massas, O Futuro de uma Ilusão, O Humor, O Mal-estar na cultura, Moisés e a Religião Monoteísta, entre outros.\n\nAo vivo no Google Meet com acesso às gravações.",
    price: 500,
    image: "/images/courses/course-06.jpg",
    category: { id: "cat-4", name: "Cultura", slug: "cultura" },
    instructor: {
      id: "coord-luiz-felipe",
      name: "Luiz Felipe Zanini",
      avatar: "/images/avatars/testimonial-02.jpg",
      role: "Psicanalista",
      bio: "Psicanalista, coordenador do percurso 4 Tempos de Freud na SPO.",
    },
    duration: "1 semestre",
    workload: "40h",
    level: "intermediário",
    featured: false,
    available: true,
    tags: [
      { id: "tag-11", name: "Cultura", slug: "cultura" },
      { id: "tag-12", name: "Freud", slug: "freud" },
    ],
    createdAt: "2025-12-01",
  },
  {
    id: "curso-7",
    title: "Da Angústia Inicial ao Início do Inconsciente",
    slug: "da-angustia-inicial-ao-inicio-do-inconsciente",
    description:
      "Passar pela pré-psicanálise e seu início, intercalando os textos e aprofundando o estudo nas obras de Freud.",
    longDescription:
      "Passar pela pré-psicanálise e também seu início, intercalando os seus textos e aprofundando o estudo nas obras de Freud. 1° dos 4 Tempos de Freud — trajetória bienal que consiste em passar por todos os tempos da obra de Freud separada em 4 seminários, 4 semestres, 4 Tempos de Freud.\n\nLeituras: As neuropsicoses de defesa, Estudos sobre histeria, Cinco lições de psicanálise, A Interpretação dos Sonhos (capítulos I, II, III, VI, VII), Sobre a psicopatologia da vida cotidiana, Os Chistes e sua relação com o inconsciente, Três Ensaios sobre a Teoria da Sexualidade, entre outros.\n\nAo vivo no Google Meet com acesso às gravações.",
    price: 500,
    image: "/images/courses/course-07.jpg",
    category: { id: "cat-1", name: "Teoria", slug: "teoria" },
    instructor: {
      id: "coord-luiz-felipe",
      name: "Luiz Felipe Zanini",
      avatar: "/images/avatars/testimonial-02.jpg",
      role: "Psicanalista",
      bio: "Psicanalista, coordenador do percurso 4 Tempos de Freud na SPO.",
    },
    duration: "1 semestre",
    workload: "40h",
    level: "iniciante",
    featured: true,
    available: true,
    tags: [
      { id: "tag-13", name: "Freud", slug: "freud" },
      { id: "tag-14", name: "Inconsciente", slug: "inconsciente" },
    ],
    createdAt: "2025-12-01",
  },
  {
    id: "curso-8",
    title: "Clínica Lacaniana do Autismo",
    slug: "clinica-lacaniana-do-autismo",
    description:
      "Estudo da clínica do autismo a partir das obras fundamentais da Psicanálise Lacaniana.",
    longDescription:
      "Estudar a clínica do autismo a partir das obras fundamentais da Psicanálise Lacaniana. O foco será na distinção estrutural, no estatuto do Outro e da voz, e nas estratégias de intervenção clínica e política defendidas por Maleval, Laurent e Lefort. O objetivo deste seminário é proporcionar um espaço de reflexão crítica de alto nível, debate teórico sobre os conceitos de Quarta Estrutura, Foraclusão do Furo e Objeto Autístico, valorizando a singularidade do sujeito autista e a ética do cuidado.\n\nMódulos:\n\nMódulo I — Fundamentos Estruturais e o Real\nMódulo II — A Voz, a Enunciação e o Trauma da Língua\nMódulo III — Corpo, Objeto Autístico e Duplo\nMódulo IV — Prática, Educação e o Combate Político\n\nAo vivo no Google Meet com acesso às gravações.",
    price: 500,
    image: "/images/courses/course-08.jpg",
    category: { id: "cat-2", name: "Clínica", slug: "clinica" },
    instructor: {
      id: "coord-lucio",
      name: "Lucio Escobar",
      avatar: "/images/avatars/testimonial-03.jpg",
      role: "Psicanalista",
      bio: "Psicanalista, coordenador de seminário na SPO.",
    },
    duration: "1 semestre",
    workload: "40h",
    level: "avançado",
    featured: true,
    available: true,
    tags: [
      { id: "tag-15", name: "Autismo", slug: "autismo" },
      { id: "tag-16", name: "Lacan", slug: "lacan" },
    ],
    createdAt: "2025-12-01",
  },
]

export function getFeaturedCourses(): Course[] {
  return courses.filter((course) => course.featured)
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug)
}

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id)
}
