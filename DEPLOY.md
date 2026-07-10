# Como hospedar a plataforma EHA

A app tem 3 partes: **frontend** (Next.js), **backend** (Spring Boot + PostgreSQL) e
**mobile** (Expo). Há dois caminhos — escolhe um.

---

## Caminho A — Grátis, na nuvem (recomendado, ~15 min)

**Frontend → Vercel · Backend + BD → Railway.** Ambos ligam ao teu GitHub e fazem deploy automático.

### 1. Backend + PostgreSQL no Railway

1. Faz push do repo para o GitHub (ver secção no fim).
2. Em [railway.app](https://railway.app) → **New Project → Deploy from GitHub repo** → escolhe o repositório.
3. Nas definições do serviço: **Root Directory = `backend`** (o Railway deteta o `Dockerfile`).
4. **New → Database → PostgreSQL** (cria uma BD gerida no mesmo projeto).
5. No serviço do backend → separador **Variables**, adiciona:
   - `SPRING_PROFILES_ACTIVE` = `postgres`
   - `SPRING_DATASOURCE_URL` = `jdbc:postgresql://${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/${{Postgres.PGDATABASE}}`
   - `SPRING_DATASOURCE_USERNAME` = `${{Postgres.PGUSER}}`
   - `SPRING_DATASOURCE_PASSWORD` = `${{Postgres.PGPASSWORD}}`
   - `EHA_JWT_SECRET` = *(um segredo aleatório longo)*
   - `EHA_CORS_ORIGINS` = *(o URL do Vercel — preenche depois do passo 2)*
   - Para emails: `SPRING_MAIL_HOST=smtp.gmail.com`, `SPRING_MAIL_PORT=465`,
     `SPRING_MAIL_USERNAME`, `SPRING_MAIL_PASSWORD` (app password), `EHA_MAIL_FROM`,
     `SPRING_MAIL_PROPERTIES_MAIL_SMTP_AUTH=true`, `SPRING_MAIL_PROPERTIES_MAIL_SMTP_SSL_ENABLE=true`
6. **Settings → Networking → Generate Domain**. Ficas com algo como
   `https://eha-backend-production.up.railway.app`. A API fica em `.../api`.

> **Alternativa: base de dados no Neon** (em vez do PostgreSQL do Railway).
> O Neon é PostgreSQL serverless com tier grátis — funciona com qualquer host do
> backend (Railway, Render, VPS...). Não muda nada no código.
>
> 1. Em [neon.tech](https://neon.tech) → cria um projeto (região mais próxima) e uma BD (ex.: `eha`).
> 2. **Connection Details** → escolhe o snippet **Java / JDBC** e a connection string **Pooled**.
>    Ficas com algo como
>    `jdbc:postgresql://ep-xxxx-pooler.eu-central-1.aws.neon.tech/eha?sslmode=require&user=...&password=...`
> 3. No backend, em vez das 3 variáveis `SPRING_DATASOURCE_*` do Railway, define:
>    - `SPRING_DATASOURCE_URL` = `jdbc:postgresql://ep-xxxx-pooler.<região>.aws.neon.tech/eha?sslmode=require`
>    - `SPRING_DATASOURCE_USERNAME` = *(o user do Neon)*
>    - `SPRING_DATASOURCE_PASSWORD` = *(a password do Neon)*
>
> O `sslmode=require` é **obrigatório** no Neon (a ligação é sempre encriptada). As
> tabelas são criadas automaticamente no 1.º arranque e os dados demo são inseridos.
> Nota: no tier grátis a BD "adormece" com inatividade e acorda no 1.º pedido (~1 s).

### 2. Frontend no Vercel

1. Em [vercel.com](https://vercel.com) → **Add New → Project** → importa o mesmo repo.
2. **Root Directory = `frontend`** (deteta Next.js automaticamente).
3. **Environment Variables**: `NEXT_PUBLIC_API_URL` = `https://<o-teu-backend>.up.railway.app/api`
4. **Deploy**. Ficas com `https://<projeto>.vercel.app`.
5. Volta ao Railway e mete esse URL em `EHA_CORS_ORIGINS` (redeploya o backend).

Pronto — o site está online e ligado à API.

### 3. Mobile (Expo)

- Define a URL da API: cria `mobile/.env` com
  `EXPO_PUBLIC_API_URL=https://<o-teu-backend>.up.railway.app/api`
- **Demo rápida:** `npx expo start` e lê o QR code com o Expo Go (já aponta para a API pública).
- **APK instalável:** `npm i -g eas-cli && eas build -p android --profile preview`.

---

## Caminho B — Auto-hospedar tudo num servidor (VPS com Docker)

Num servidor Linux com Docker (ex.: DigitalOcean, Contabo, uma máquina própria):

```bash
git clone <o-teu-repo> && cd ProjFinal_ES2
cp .env.prod.example .env      # e preenche os valores
docker compose -f docker-compose.prod.yml up -d --build
```

Isto sobe o **PostgreSQL + backend** juntos na porta 8080. Para o frontend no mesmo servidor:

```bash
cd frontend
echo "NEXT_PUBLIC_API_URL=http://<ip-ou-dominio>:8080/api" > .env.production
npm ci && npm run build && npm start   # (ou atrás de um Nginx com HTTPS)
```

Em produção real, põe um **Nginx/Caddy à frente** para dar HTTPS aos dois.

---

## Publicar o repo no GitHub (necessário para o Caminho A)

```bash
git add .
git commit -m "Preparar deploy: Dockerfile do backend e configuração"
git push
```

> O `.gitignore` já exclui `.env`, builds e segredos. Confirma que **não** commitas
> o `backend/.env` (tem a tua app password do Gmail).

---

## Notas

- A BD arranca vazia e é populada com o catálogo e utilizadores demo na 1.ª execução
  (`Password123!`). Com PostgreSQL, os dados **persistem** entre reinícios.
- Sem SMTP configurado, os códigos de verificação/recuperação aparecem no log do
  backend em vez de irem por email.
- O tier grátis do Railway hiberna com inatividade — o 1.º pedido após pausa demora
  alguns segundos a acordar (normal numa demo).
