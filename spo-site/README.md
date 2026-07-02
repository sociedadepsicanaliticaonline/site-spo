# SPO — Sociedade Psicanalítica Online

Portal institucional da Sociedade Psicanalítica Online. Next.js 16 + Cloudflare Workers + PostgreSQL (Coolify) + Cloudflare R2.

## Stack

- **Frontend + API**: Next.js 16 com OpenNext → deploy em Cloudflare Workers
- **Banco de dados**: PostgreSQL 16 self-hosted via Coolify (VPS)
- **ORM**: Drizzle
- **Auth**: NextAuth.js v5 (Auth.js) — credenciais (email + senha com bcrypt)
- **Storage de mídia**: Cloudflare R2 (S3-compatible, free egress)
- **UI**: Tailwind CSS v4 + lucide-react + shadcn-style components

## Setup local

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
Copie `.dev.vars.example` para `.dev.vars` e preencha:

```bash
cp .dev.vars.example .dev.vars
```

Edite `.dev.vars`:
```env
DATABASE_URL=postgresql://usuario:senha@host:5432/spo
AUTH_SECRET=qualquer-string-secreta-com-32-caracteres
AUTH_URL=http://localhost:3000
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET=spo-media
R2_PUBLIC_URL=https://pub-xxxxx.r2.dev
```

### 3. Banco de dados
Provisione PostgreSQL no Coolify (veja "Deploy PostgreSQL no Coolify" abaixo), depois rode as migrações e o seed:

```bash
npm run db:generate    # gera migração a partir do schema (já gerada em src/db/migrations)
npm run db:migrate     # aplica migração no banco
npm run db:seed        # popula com dados iniciais (inclui superadmin)
```

**Credenciais do superadmin criado pelo seed:**
- Email: `sociedadepsicanaliticaonline@gmail.com`
- Senha: `spopublic@2026`
- ⚠️ **Altere a senha no primeiro login!**

### 4. Rodar em desenvolvimento
```bash
npm run dev
```

Acesse `http://localhost:3000` para o site público e `http://localhost:3000/admin` para o painel.

## Deploy

### Deploy PostgreSQL no Coolify

1. Acesse o painel do Coolify (ex.: `http://187.127.43.159:8000`)
2. **Projects** → **+ New** → **Resource** → **PostgreSQL**
3. Configure:
   - **Name**: `spo-postgres`
   - **Image**: `postgres:16-alpine`
   - **Database Name**: `spo`
   - **Username**: `spo`
   - **Password**: (gere uma senha forte)
4. Após deploy, copie a **DATABASE_URL** completa: `postgresql://spo:senha@host-interno:5432/spo`
5. Exponha a porta 5432 (ou use um tunnel/Wireguard) para que o Cloudflare Worker consiga conectar

**⚠️ Importante sobre a conexão Cloudflare → Postgres:**
- Workers não suportam TCP direto. Use **Cloudflare Hyperdrive** para pool de conexões
- Ou exponha o Postgres via tunnel (ex.: Cloudflare Tunnel, Wireguard, Tailscale)
- A porta 5432 do Postgres precisa estar acessível do Worker (não localhost)

### Configurar secrets no Cloudflare Worker

```bash
# Obrigatórios
wrangler secret put DATABASE_URL --project-name spo-site
wrangler secret put AUTH_SECRET --project-name spo-site

# Opcionais (para upload de mídia)
wrangler secret put R2_ACCOUNT_ID --project-name spo-site
wrangler secret put R2_ACCESS_KEY_ID --project-name spo-site
wrangler secret put R2_SECRET_ACCESS_KEY --project-name spo-site
wrangler secret put R2_BUCKET --project-name spo-site
wrangler secret put R2_PUBLIC_URL --project-name spo-site
```

### Deploy

```bash
npm run deploy
```

## Estrutura de pastas

```
src/
├── app/
│   ├── (admin)/       # Painel administrativo
│   │   ├── admin/
│   │   │   ├── login/             # Tela de login
│   │   │   ├── formacao/         # Editor de textos Formação
│   │   │   ├── analistas/        # CRUD analistas
│   │   │   ├── supervisoes/      # CRUD supervisões
│   │   │   ├── seminarios/       # CRUD seminários
│   │   │   ├── eventos/          # CRUD eventos/programações
│   │   │   ├── carteis/          # CRUD cartéis
│   │   │   ├── testemunhos/      # CRUD testemunhos
│   │   │   ├── media/            # Upload de mídia
│   │   │   └── config/           # Config do site
│   │   └── layout.tsx
│   ├── (site)/         # Site público
│   │   ├── page.tsx
│   │   ├── seminarios/           # Lista + detalhe
│   │   ├── eventos/              # Lista (eventos + programações) + detalhe
│   │   ├── carteis/              # Lista de cartéis
│   │   ├── formacao/             # Páginas de formação
│   │   └── sobre/
│   └── api/
│       ├── auth/[...nextauth]/   # NextAuth handlers
│       └── admin/                # API routes CRUD (protegidas)
├── db/
│   ├── schema.ts                  # Drizzle schema (todas as tabelas)
│   ├── index.ts                   # Cliente Drizzle
│   ├── queries.ts                 # Funções de leitura (público)
│   └── migrations/                # Migrações geradas
├── lib/
│   ├── auth.ts                    # NextAuth (Node.js)
│   ├── auth.edge.ts               # NextAuth config para Edge (middleware)
│   ├── api.ts                     # Helper para API routes (auth + erros)
│   ├── r2.ts                      # Cliente Cloudflare R2
│   ├── schemas.ts                 # Zod schemas
│   └── sanitize.ts                # Sanitização de HTML
├── components/
│   ├── admin/                     # Componentes do painel
│   ├── cards/                     # Cards de conteúdo
│   ├── layout/                    # Header, Footer, Container
│   ├── navigation/                # Nav desktop, mobile, sidebar
│   ├── sections/                  # Hero, Features, etc.
│   ├── shared/                    # Logo, WhatsApp float, etc.
│   └── ui/                        # Botões, Inputs, etc. (shadcn-style)
├── hooks/                         # React hooks (admin hooks usam API)
├── data/                          # Dados seed (lidos pelo scripts/seed.ts)
└── types/                         # Tipos TypeScript globais
```

## Comandos úteis

```bash
npm run dev          # dev server
npm run build        # build de produção (Next.js)
npm run deploy       # build + deploy no Cloudflare Workers
npm run lint         # ESLint
npm run db:generate  # gera nova migração a partir do schema
npm run db:migrate   # aplica migrações pendentes
npm run db:push      # push direto sem gerar migração (dev)
npm run db:studio    # Drizzle Studio (GUI do banco)
npm run db:seed      # popula banco com dados dos arquivos em src/data/
```

## Credenciais e URLs

- **Site em produção**: https://spo-site.sociedadepsicanaliticaonline.workers.dev
- **Painel admin**: https://spo-site.sociedadepsicanaliticaonline.workers.dev/admin
- **Repositório**: git@github.com:sociedadepsicanaliticaonline/site-spo.git
- **Coolify VPS**: http://187.127.43.159:8000
- **Conta Cloudflare**: `c690010af625feb6e04094e64a41a116`
- **Email institucional**: sociedadepsicanaliticaonline@gmail.com
- **WhatsApp institucional**: 5522998391755
