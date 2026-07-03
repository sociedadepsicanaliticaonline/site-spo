# Próximas Mudanças no Sistema

## 1. Remover Categorias e Tags Completamente

Remover `category` e `tags` de **todos os lugares**: types, schemas, API, formulários, páginas admin e páginas públicas.

### Data Model

**Types (`src/types/index.ts`):**
- `Event`: remover `category: Category` e `tags: Tag[]`
- `Course`: remover `category: Category` e `tags: Tag[]`

**Schemas (`src/lib/schemas.ts`):**
- `eventSchema`: remover `category: categorySchema` e `tags: z.array(tagSchema).default([])`
- `courseSchema`: remover `category: categorySchema` e `tags: z.array(tagSchema).default([])`

### API Routes

**`src/app/api/admin/events/route.ts`:**
- GET: remover fetch de `categories`, remover mapping de `category` no map()
- POST: remover `category_id` do row, remover toda lógica de `tags`

**`src/app/api/admin/courses/route.ts`:**
- GET: remover fetch de `categories`, remover mapping de `category`
- POST: remover `category_id` e `tags` do row

### Formulários Admin

**`src/components/admin/forms/event-form.tsx`:**
- Remover toda a seção "Categoria e Tags" (Card com id, name, slug + TagInput)
- Remover `category: { id: "", name: "", slug: "" }` e `tags: []` dos defaultValues
- Remover `watch("category.name")`, `createCategory`, `createTag`

**`src/components/admin/forms/course-form.tsx`:**
- Remover toda a seção "Categoria e Tags"
- Remover `category` e `tags` dos defaultValues

### Admin List Pages

**`src/app/(admin)/admin/eventos/page.tsx`:**
- Linha 38: remover `event.category.name.toLowerCase().includes(term)` do filtro
- Linha 83-86: remover coluna "Categoria" (key: "category")

**`src/app/(admin)/admin/seminarios/page.tsx`:**
- Linha 27: remover `course.category.name.toLowerCase().includes(term)` do filtro
- Linha 72-75: remover coluna "Categoria"

### Páginas Públicas

**`src/app/(site)/eventos/[slug]/page.tsx`:**
- Linha 70: `subtitle={event.category.name}` → remover ou usar descrição alternativa
- Linhas 87-98: remover seção de Tags

**`src/app/(site)/seminarios/[slug]/page.tsx`:**
- Linha 34: `c.category.id === course.category.id` → ajustar filtro de relacionados (sem categoria, talvez por título ou remover)
- Linha 42: `subtitle={course.category.name}` → remover ou usar alternativa

**`src/components/cards/event-card.tsx`:**
- Linhas 29 e 69: remover `<Badge variant="secondary">{event.category.name}</Badge>`

**`src/components/cards/course-card.tsx`:**
- Linhas 43 e 94: remover `<Badge variant="secondary">{course.category.name}</Badge>`

### DB (pendente)
- Colunas `category_id` em `events` e `courses` — deixar nullable ou dropar
- Tabelas `event_tags` e `course_tags` — dropar
- Tabela `tags` — dropar se não usada em outro lugar
- Tabela `categories` — dropar se não usada em outro lugar

---

## 2. Coordenador: de Select (tabela) para Campo de Texto

Transformar `instructor` de objeto `Author` para string simples `instructorName`.

### Data Model

**Types (`src/types/index.ts`):**
- `Course`: `instructor: Author` → `instructorName: string`

**Schemas (`src/lib/schemas.ts`):**
- `courseSchema`: `instructor: authorSchema` → `instructorName: z.string().min(1, "Coordenador é obrigatório")`

### API Routes

**`src/app/api/admin/courses/route.ts`:**
- POST: `instructor_id: body.instructor?.id` → `instructor_name: body.instructorName`
- GET: remover mapping de `instructor` (que atualmente usa fallback vazio), usar `instructor_name` direto

### Formulário Admin

**`src/components/admin/forms/course-form.tsx`:**
- Remover fetch de coordenadores (`useAdminCoordinators` ou similar)
- Remover select de coordenador
- Adicionar `FormInput` simples para "Coordenador" com `register("instructorName")`
- Atualizar defaultValues: `instructorName: ""`

### Admin List Page

**`src/app/(admin)/admin/seminarios/page.tsx`:**
- Linha 26: `course.instructor.name.toLowerCase()` → `course.instructorName.toLowerCase()`
- Linha 79: `course.instructor.name` → `course.instructorName`
- Alterar header da coluna de "Coordenador" (já está correto)

### DB (migration)

Adicionar coluna `instructor_name` TEXT na tabela `courses`:
```sql
ALTER TABLE courses ADD COLUMN instructor_name TEXT;
```

Opções para `instructor_id`:
- Manter (nullable) para não quebrar dados existentes
- Ou dropar se quiser limpeza

---

## 3. Remover Nível de Dificuldade

Remover `level` de courses completamente.

### Data Model

**Types (`src/types/index.ts`):**
- `Course`: remover `level: "iniciante" | "intermediário" | "avançado"`

**Schemas (`src/lib/schemas.ts`):**
- `courseSchema`: remover `level: z.enum([...])`

### API Routes

**`src/app/api/admin/courses/route.ts`:**
- POST: remover `level` do row

### Formulário Admin

**`src/components/admin/forms/course-form.tsx`:**
- Remover campo de nível (select)

### Páginas Públicas

**`src/components/cards/course-card.tsx`:**
- Linhas 16-20: remover `levelColor` object
- Linha 57: remover `{course.level}`
- Linhas 95-97: remover badge de nível

**`src/app/(site)/seminarios/[slug]/page.tsx`:**
- Linhas 64-67: remover div de "Nível"

### DB
- Coluna `level` em `courses` — dropar ou deixar nullable

---

## Ordem de Execução Sugerida

1. Types + Schemas (fundação)
2. API routes (backend)
3. Formulários (event-form, course-form)
4. Admin list pages (eventos/page, seminarios/page)
5. Componentes públicos (event-card, course-card)
6. Páginas públicas (eventos/[slug], seminarios/[slug])
7. db/queries.ts se necessário
8. DB migrations (executar manualmente no Coolify/Supabase)
9. Build + Deploy + Testar
