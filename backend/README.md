# EHA Backend (Microservices)

Este backend segue a arquitetura em microservicos definida na documentacao em [docs/](../docs/).

## Servicos

- api-gateway
- auth-service
- user-service
- content-service
- quiz-service
- gamification-service
- forum-service
- notification-service
- backoffice-service

## Requisitos

- Java 17+
- Maven 3.9+
- Docker e Docker Compose

## Quick start

```bash
cd backend
cp .env.example .env
make up
```

## Swagger

Cada servico expõe Swagger em `http://localhost:PORT/swagger-ui.html`.

## Comandos uteis

```bash
make build
make test
make logs
```
