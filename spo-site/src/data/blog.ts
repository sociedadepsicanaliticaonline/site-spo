import type { BlogPost } from "@/types"

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "A Ética do Desejo na Clínica Contemporânea",
    slug: "a-etica-do-desejo-na-clinica-contemporanea",
    excerpt:
      "Como a psicanálise responde aos desafios impostos pela cultura da produtividade e hiper-exposição, reafirmando a ética do desejo como bússola clínica.",
    content: `
## O Desafio Contemporâneo

A clínica psicanalítica contemporânea se depara com um paradoxo: nunca se falou tanto em saúde mental, mas nunca o sofrimento psíquico pareceu tão difuso e difícil de nomear. A cultura da produtividade, a hiper-exposição nas redes sociais e a medicalização da vida cotidiana impõem desafios inéditos à escuta analítica.

## A Ética do Desejo

Desde Freud, a psicanálise se orienta por uma ética que não é normativa, mas estrutural. Não se trata de dizer ao analisante como ele deve viver, mas de permitir que ele descubra as determinações inconscientes que o aprisionam. Nesse sentido, a ética do desejo é uma ética da responsabilização subjetiva.

\`\`\`
"Onde o Isso era, o Eu deve advir."
— Sigmund Freud
\`\`\`

## Impasses e Possibilidades

Na clínica atual, nos deparamos com sujeitos que chegam ao consultório queixando-se de cansaço, vazio, falta de sentido. São sintomas que não se encaixam perfeitamente nas categorias clássicas, mas que revelam algo da estrutura do sujeito contemporâneo.

A psicanálise, com seu dispositivo de escuta singular, oferece um espaço onde esses sujeitos podem, pouco a pouco, construir uma narrativa própria, para além dos discursos prontos que a cultura oferece.

## Conclusão

Reafirmar a ética do desejo na clínica contemporânea não é um gesto nostálgico, mas uma aposta na potência transformadora da palavra. Em tempos de respostas rápidas e soluções padronizadas, a psicanálise insiste em fazer perguntas.
    `.trim(),
    image: "/images/blog/blog-01.jpg",
    author: {
      id: "author-1",
      name: "Dra. Helena Souza",
      avatar: "/images/avatars/coordinator-01.jpg",
      role: "Psicanalista",
    },
    category: { id: "cat-1", name: "Teoria", slug: "teoria" },
    tags: [
      { id: "tag-10", name: "Ética", slug: "etica" },
      { id: "tag-11", name: "Clínica", slug: "clinica" },
    ],
    publishedAt: "2024-09-05",
    featured: true,
    readingTime: "8 min",
  },
  {
    id: "post-2",
    title: "SPO lança novos grupos de supervisão online",
    slug: "spo-lanca-novos-grupos-de-supervisao-online",
    excerpt:
      "Novos grupos de supervisão clínica online com profissionais experientes para atender a demanda crescente de psicanalistas em formação.",
    content: `
## Ampliando o Acesso à Supervisão

A Sociedade Psicanalítica Online anuncia a abertura de novas turmas para seus grupos de supervisão clínica. Com o aumento significativo da demanda por formação psicanalítica de qualidade no formato online, a SPO amplia sua oferta de supervisão para atender profissionais de todo o Brasil.

## Como Funcionam os Grupos

Cada grupo é composto por no máximo 8 participantes, garantindo que cada caso apresentado receba a atenção necessária. Os encontros são semanais, com duração de 2 horas, realizados via Zoom.

## Investimento

O valor mensal é de R$ 320,00, com possibilidade de desconto para alunos matriculados em seminários regulares da SPO.
    `.trim(),
    image: "/images/blog/blog-02.jpg",
    author: {
      id: "author-2",
      name: "Comunicação SPO",
      avatar: "/images/avatars/coordinator-02.jpg",
      role: "Assessoria de Comunicação",
    },
    category: { id: "cat-5", name: "Novidades", slug: "novidades" },
    tags: [
      { id: "tag-12", name: "Supervisão", slug: "supervisao" },
      { id: "tag-13", name: "Online", slug: "online" },
    ],
    publishedAt: "2024-09-01",
    featured: false,
    readingTime: "4 min",
  },
  {
    id: "post-3",
    title: "O Papel do Analista frente às Novas Tecnologias",
    slug: "o-papel-do-analista-frente-as-novas-tecnologias",
    excerpt:
      "Reflexões sobre como o analista pode fazer uso das ferramentas digitais sem perder a especificidade do setting analítico.",
    content: `
## A Questão do Setting

A pandemia da COVID-19 impôs à psicanálise uma transformação que até então parecia impensável: a migração forçada do consultório para as telas. O que era exceção tornou-se regra, e o setting analítico precisou ser repensado.

## Presença e Ausência

A psicanálise sempre trabalhou com a dialética presença/ausência. O telefone, a carta, o divã — todos esses dispositivos já eram, à sua maneira, tecnologias. A questão não é, portanto, se a tecnologia pode ou não ser utilizada, mas como ela incide sobre a transferência.

## Cuidados Éticos

É fundamental que o analista preserve as condições que tornam a análise possível: regularidade dos encontros, privacidade, atenção flutuante. As ferramentas digitais devem estar a serviço da ética do desejo, e não o contrário.
    `.trim(),
    image: "/images/blog/blog-03.jpg",
    author: {
      id: "author-1",
      name: "Dra. Helena Souza",
      avatar: "/images/avatars/coordinator-01.jpg",
      role: "Psicanalista",
    },
    category: { id: "cat-1", name: "Teoria", slug: "teoria" },
    tags: [
      { id: "tag-14", name: "Tecnologia", slug: "tecnologia" },
      { id: "tag-15", name: "Setting", slug: "setting" },
    ],
    publishedAt: "2024-08-20",
    featured: false,
    readingTime: "6 min",
  },
  {
    id: "post-4",
    title: "SPO estará presente no Congresso Internacional de Psicanálise",
    slug: "spo-estara-presente-no-congresso-internacional-de-psicanalise",
    excerpt:
      "A SPO marca presença no Congresso Internacional com mesa redonda sobre formação do psicanalista na era digital.",
    content: `
## Participação Internacional

A Sociedade Psicanalítica Online foi convidada a participar do Congresso Internacional de Psicanálise, que ocorrerá em outubro no Centro de Convenções de São Paulo. A SPO organizará uma mesa redonda sobre "A Formação do Psicanalista na Era Digital".

## A Mesa Redonda

O debate contará com representantes de sociedades psicanalíticas do Brasil, Argentina, França e Inglaterra, discutindo como as novas tecnologias transformaram a transmissão da psicanálise nos últimos anos.
    `.trim(),
    image: "/images/blog/blog-04.jpg",
    author: {
      id: "author-2",
      name: "Comunicação SPO",
      avatar: "/images/avatars/coordinator-02.jpg",
      role: "Assessoria de Comunicação",
    },
    category: { id: "cat-5", name: "Novidades", slug: "novidades" },
    tags: [
      { id: "tag-16", name: "Evento", slug: "evento" },
      { id: "tag-17", name: "Internacional", slug: "internacional" },
    ],
    publishedAt: "2024-08-10",
    featured: false,
    readingTime: "3 min",
  },
  {
    id: "post-5",
    title: "Melanie Klein e a Técnica do Brincar",
    slug: "melanie-klein-e-a-tecnica-do-brincar",
    excerpt:
      "A contribuição fundamental de Melanie Klein para a psicanálise infantil e o desenvolvimento da técnica do brincar como via de acesso ao inconsciente.",
    content: `
## A Revolução Kleiniana

Melanie Klein revolucionou a psicanálise ao demonstrar que o brincar infantil poderia ser analisado com a mesma seriedade que os sonhos e a livre associação dos adultos. Para Klein, os brinquedos e as brincadeiras são manifestações simbólicas do mundo interno da criança.

## Técnica do Brincar

A técnica desenvolvida por Klein permite que a criança expresse suas angústias, fantasias e conflitos através do jogo. O analista, nesse contexto, interpreta o brincar assim como interpretaria o discurso de um adulto.
    `.trim(),
    image: "/images/blog/blog-05.jpg",
    author: {
      id: "author-3",
      name: "Dra. Mariana Torres",
      avatar: "/images/avatars/coordinator-03.jpg",
      role: "Psicanalista Infantil",
    },
    category: { id: "cat-1", name: "Teoria", slug: "teoria" },
    tags: [
      { id: "tag-18", name: "Klein", slug: "klein" },
      { id: "tag-19", name: "Infância", slug: "infancia" },
    ],
    publishedAt: "2024-07-28",
    featured: false,
    readingTime: "7 min",
  },
  {
    id: "post-6",
    title: "A Angústia na Psicanálise: do Sinal ao Afeto",
    slug: "a-angustia-na-psicanalise-do-sinal-ao-afeto",
    excerpt:
      "Uma travessia pelo conceito de angústia na obra freudiana e sua retomada por Lacan como o afeto que não engana.",
    content: `
## A Angústia em Freud

Freud dedicou dois momentos fundamentais ao estudo da angústia. Em sua primeira teoria, a angústia era compreendida como libido recalcada. Já em "Inibições, Sintomas e Angústia" (1926), ele reformula o conceito, apresentando a angústia como sinal de perigo diante de uma situação traumática.

## A Angústia em Lacan

Lacan retoma a questão em seu Seminário X, "A Angústia", afirmando que a angústia é o afeto que não engana. Diferentemente de outros afetos, que podem ser enganosos, a angústia aponta diretamente para o real.

- Angústia como sinal do desejo do Outro
- Angústia diante da falta de limites
- A função do furo na imagem corporal
    `.trim(),
    image: "/images/blog/blog-06.jpg",
    author: {
      id: "author-1",
      name: "Dra. Helena Souza",
      avatar: "/images/avatars/coordinator-01.jpg",
      role: "Psicanalista",
    },
    category: { id: "cat-1", name: "Teoria", slug: "teoria" },
    tags: [
      { id: "tag-20", name: "Angústia", slug: "angustia" },
      { id: "tag-21", name: "Afeto", slug: "afeto" },
    ],
    publishedAt: "2024-07-15",
    featured: false,
    readingTime: "10 min",
  },
]

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured)
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = blogPosts.find((p) => p.slug === currentSlug)
  if (!current) return []
  const sameCategory = blogPosts.filter(
    (post) => post.slug !== currentSlug && post.category.id === current.category.id
  )
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit)
  const others = blogPosts.filter(
    (post) => post.slug !== currentSlug && post.category.id !== current.category.id
  )
  return [...sameCategory, ...others].slice(0, limit)
}

export function getCategories() {
  const seen = new Set<string>()
  return blogPosts.reduce<{ name: string; slug: string }[]>((acc, post) => {
    if (!seen.has(post.category.name)) {
      seen.add(post.category.name)
      acc.push({ name: post.category.name, slug: post.category.slug })
    }
    return acc
  }, [])
}
