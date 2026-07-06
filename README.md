# Economia com História: Angola (EHA)

Plataforma educacional sobre a história económica de Angola — Projeto Final de Engenharia de Software II (ISPTEC).

**Documentação completa**: [LEIA-ME.md](LEIA-ME.md) · [docs/](docs/)

## Componentes

| Componente | Tecnologia | Pasta |
| ---------- | ---------- | ----- |
| Backend API | Spring Boot 3 · Java 17 · PostgreSQL/H2 · JWT | [backend/](backend/) |
| Frontend Web | Next.js 16 · React 19 · TypeScript · Tailwind | [frontend/](frontend/) |
| Mobile | Expo SDK 54 · React Native · TypeScript | [mobile/](mobile/) |

## Como executar tudo

Com o [Makefile](Makefile) (recomendado — `make help` lista todos os alvos):

```bash
make install    # dependências do frontend e mobile
make backend    # API em :8080 (H2, sem dependências)
make frontend   # Web em :3000
make mobile     # Expo (QR code)
make test       # tudo o que o CI corre
```

Ou manualmente:

```bash
# 1. Backend (http://localhost:8080/api)
cd backend && mvn spring-boot:run

# 2. Frontend (http://localhost:3000)
cd frontend && npm install && npm run dev

# 3. Mobile (Expo Go)
cd mobile && npm install && npm start
```

O backend arranca por omissão com H2 em memória e dados de demonstração.
Para PostgreSQL 15: `docker compose up -d postgres` e `mvn spring-boot:run -Dspring-boot.run.profiles=postgres`.

**Login de demonstração**: `joao@example.com` / `Password123!`

O frontend e o mobile carregam todos os dados da API — **o backend deve estar a correr**.
Contas novas exigem **verificação de email** (código de 6 dígitos); sem SMTP configurado,
o código aparece no log do backend (ver [backend/README.md](backend/README.md)).

## Testes e CI

- Backend: `cd backend && mvn test` (14 testes de integração)
- Frontend: `cd frontend && npm run build`
- Mobile: `cd mobile && npx tsc --noEmit`
- CI: [.github/workflows/ci.yml](.github/workflows/ci.yml) corre os três em cada push/PR
