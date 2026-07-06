# EHA Backend — Spring Boot

API REST da plataforma **Economia com História: Angola** (Spring Boot 3, Java 17, Spring Security + JWT, Spring Data JPA).

## Como executar

### Modo rápido (H2 em memória — sem dependências)

```bash
cd backend
mvn spring-boot:run
```

A API fica em `http://localhost:8080/api` com dados de demonstração já carregados.

### Modo PostgreSQL 15 (como documentado)

```bash
# 1. Subir a base de dados
docker compose up -d postgres    # na raiz do projeto

# 2. Arrancar com o perfil postgres
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=postgres
```

## Utilizadores de demonstração

Todos com a password `Password123!` (emails já verificados):

| Email | Papel | Pontos |
|-------|-------|--------|
| admin@eha.ao | ADMIN | 0 |
| maria@example.com | USER | 1250 |
| joao@example.com | USER | 350 |

## Verificação de email

Contas novas ficam pendentes até verificar o email com um código de 6 dígitos:

1. `POST /api/auth/register` cria a conta e envia o código
2. O login é bloqueado (401) até a verificação
3. `POST /api/auth/verify-email` `{email, code}` ativa a conta
4. `POST /api/auth/resend-code` `{email}` reenvia o código

**Sem SMTP configurado** (desenvolvimento), o código aparece no log do backend:
`SMTP não configurado — código de verificação para <email>: 123456`.

**Com SMTP** (produção), configurar as propriedades standard do Spring Mail por
variáveis de ambiente: `SPRING_MAIL_HOST`, `SPRING_MAIL_PORT`, `SPRING_MAIL_USERNAME`,
`SPRING_MAIL_PASSWORD` (e `EHA_MAIL_FROM` para o remetente).

## Testes

```bash
mvn test    # 14 testes de integração (MockMvc + H2)
```

## Endpoints principais

Ver documentação completa em [docs/api/01-endpoints.md](../docs/api/01-endpoints.md).

- `POST /api/auth/register` · `POST /api/auth/login` · `POST /api/auth/refresh`
- `GET /api/users/me` · `PUT /api/users/me` · `GET /api/badges`
- `GET /api/contents` · `GET /api/contents/{id}`
- `GET /api/quizzes` · `GET /api/quizzes/{id}` · `POST /api/quizzes/{id}/submit` · `GET /api/quizzes/history`
- `GET /api/ranking/global`
- `GET /api/forum/topics` · `POST /api/forum/topics` · `GET /api/forum/topics/{id}` · `POST /api/forum/topics/{id}/replies`

## Configuração

| Variável | Default | Descrição |
|----------|---------|-----------|
| `EHA_JWT_SECRET` | (dev) | Segredo de assinatura dos JWT |
| `EHA_CORS_ORIGINS` | localhost:3000,8081,19006 | Origens permitidas |
| `EHA_DB_URL` | jdbc:postgresql://localhost:5432/eha | URL da BD (perfil postgres) |
| `EHA_DB_USER` / `EHA_DB_PASSWORD` | eha / eha2026 | Credenciais da BD |
