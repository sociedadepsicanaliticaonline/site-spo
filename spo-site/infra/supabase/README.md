# Supabase self-hosted no Coolify

Arquivos para deploy do Supabase self-hosted no Coolify via Docker Compose.

## Arquivos

- `docker-compose.yml` — stack completo (Postgres, Studio, Auth, Storage, REST, Realtime, Kong, Meta)
- `kong.yml` — configuração do API Gateway
- `.env.example` — template de variáveis de ambiente
- `initdb/` — scripts SQL executados na primeira inicialização do Postgres

## Passo a passo no Coolify

### 1. Criar recurso Docker Compose
1. Acesse `https://colify.spopsi.cloud`
2. Vá em **Projects** → selecione (ou crie) um projeto para o Supabase
3. Clique em **+ New** → **Docker Compose**
4. Dê um nome (ex.: `supabase-spo`)

### 2. Colar o docker-compose.yml
- Cole o conteúdo de `docker-compose.yml` no editor do Coolify
- Cole também o `kong.yml` (Coolify oferece um campo separado para arquivos adicionais)

### 3. Configurar o .env
- Copie `.env.example` para `.env` no Coolify (ou preencha direto na UI)
- **Obrigatório**:
  - `POSTGRES_PASSWORD` — senha forte do Postgres
  - `JWT_SECRET` — string aleatória de 32+ caracteres
  - `DASHBOARD_PASSWORD` — senha do Kong
  - `DASHBOARD_USERNAME` — usuário do Kong

### 4. Deploy
- Coolify vai baixar as imagens e subir os containers
- Acompanhe os logs até ver "Database is ready"

## ⚠️ IMPORTANTE: Conectividade com Cloudflare Workers

Os containers vão rodar **internamente** na rede do Coolify. O Cloudflare Worker **NÃO** consegue acessar diretamente.

Você tem 2 opções depois do deploy:

### Opção A: Expor porta 5432 (mais simples)
1. No Coolify, edite o serviço `db` (Postgres)
2. Adicione uma porta de saída: `5432:5432` (host:container)
3. Libere a porta 5432 no firewall da VPS (`ufw allow 5432/tcp` via SSH)
4. A URL pública será: `postgresql://postgres:senha@187.127.43.159:5432/postgres`

### Opção B: Cloudflare Tunnel (mais seguro)
1. SSH na VPS: `ssh root@187.127.43.159`
2. Instale o `cloudflared`:
   ```bash
   curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
   echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared focal main' | sudo tee /etc/apt/sources.list.d/cloudflared.list
   sudo apt-get update && sudo apt-get install -y cloudflared
   ```
3. Login: `cloudflared tunnel login` (abre o navegador)
4. Crie o tunnel: `cloudflared tunnel create spo-postgres`
5. Configure o tunnel:
   ```bash
   cat > ~/.cloudflared/config.yml <<EOF
   url: http://supabase-db:5432
   tunnel: <TUNNEL_ID>
   credentials-file: /root/.cloudflared/<TUNNEL_ID>.json
   ingress:
     - hostname: db.colify.spopsi.cloud
       service: http://supabase-db:5432
     - service: http_status:404
   EOF
   ```
6. Crie o DNS: `cloudflared tunnel route dns spo-postgres db.colify.spopsi.cloud`
7. Rode: `cloudflared tunnel run spo-postgres`
8. Use a URL: `postgresql://postgres:senha@db.colify.spopsi.cloud:5432/postgres`

## Próximo passo

Depois que o Supabase estiver rodando, **me avise e me envie a URL pública do banco** (uma das duas opções acima) para eu continuar com:
- Migração do schema
- Seed (cria superadmin + popula dados)
- Configurar secrets no Cloudflare
- Deploy final
