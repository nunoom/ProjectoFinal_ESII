# Arquitetura do Sistema EHA

## 1. Visão Geral da Arquitetura

### 1.1 Estilo Arquitetural

O sistema EHA adota uma **arquitetura em camadas (Layered Architecture)** combinada com **arquitetura cliente-servidor** e **microserviços leves**.

**Justificativa**:
- Separação clara de responsabilidades
- Facilita manutenção e testes
- Permite escalabilidade horizontal
- Suporta múltiplos clientes (web e mobile)

### 1.2 Diagrama de Alto Nível

```
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA DE APRESENTAÇÃO                    │
├──────────────────────────┬──────────────────────────────────┤
│   Frontend Web (React)   │   Mobile App (React Native)      │
│   - Interface responsiva │   - App nativa Android/iOS       │
│   - PWA capabilities     │   - Suporte offline robusto      │
└──────────────────────────┴──────────────────────────────────┘
                            │
                            │ HTTPS/REST API
                            │ JSON
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA DE API (Gateway)                   │
├─────────────────────────────────────────────────────────────┤
│   API Gateway / Load Balancer                               │
│   - Roteamento                                               │
│   - Rate limiting                                            │
│   - Autenticação JWT                                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  CAMADA DE APLICAÇÃO (Backend)               │
├─────────────────────────────────────────────────────────────┤
│                    Spring Boot Application                   │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Auth Service │  │Content Service│  │ Quiz Service │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │Forum Service │  │Ranking Service│  │ User Service │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌────────────────────────────────────────────────┐        │
│  │         Spring Security + JWT Filter            │        │
│  └────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA DE PERSISTÊNCIA                    │
├─────────────────────────────────────────────────────────────┤
│   Spring Data JPA / Hibernate                               │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA DE DADOS                           │
├──────────────────────────┬──────────────────────────────────┤
│   PostgreSQL Database    │   Redis Cache (opcional)         │
│   - Dados relacionais    │   - Cache de sessões             │
│   - Transações ACID      │   - Rankings em tempo real       │
└──────────────────────────┴──────────────────────────────────┘
```

## 2. Componentes Principais

### 2.1 Frontend Web (React + TypeScript)

**Responsabilidades**:
- Interface de utilizador responsiva
- Gestão de estado (Redux Toolkit)
- Comunicação com API REST
- Cache local (LocalStorage/IndexedDB)
- Service Workers para PWA

**Tecnologias**:
- React 18+
- TypeScript
- Material-UI (MUI)
- Redux Toolkit + RTK Query
- React Router
- Axios
- Formik + Yup (formulários)

**Estrutura de Pastas**:
```
src/
├── components/       # Componentes reutilizáveis
├── pages/           # Páginas da aplicação
├── features/        # Features com Redux slices
├── services/        # Serviços de API
├── hooks/           # Custom hooks
├── utils/           # Utilitários
├── types/           # TypeScript types
├── assets/          # Imagens, ícones
└── styles/          # Estilos globais
```

### 2.2 Mobile App (React Native + TypeScript)

**Responsabilidades**:
- Interface nativa Android/iOS
- Funcionalidade offline robusta
- Sincronização de dados
- Notificações push
- Armazenamento local

**Tecnologias**:
- React Native 0.72+
- TypeScript
- React Navigation
- Redux Toolkit
- AsyncStorage
- SQLite (offline)
- React Native Paper (UI)

**Estrutura de Pastas**:
```
src/
├── components/
├── screens/
├── navigation/
├── store/
├── services/
├── database/        # SQLite schemas
├── sync/            # Sincronização
└── utils/
```

### 2.3 Backend (Spring Boot)

**Responsabilidades**:
- Lógica de negócio
- Autenticação e autorização
- Validação de dados
- Processamento de requisições
- Gestão de transações

**Tecnologias**:
- Spring Boot 3.x
- Spring Security + JWT
- Spring Data JPA
- Spring Validation
- Lombok
- MapStruct (mapeamento DTO)
- Swagger/OpenAPI

**Estrutura de Pacotes**:
```
com.eha.backend/
├── config/          # Configurações
├── security/        # Segurança e JWT
├── controller/      # REST Controllers
├── service/         # Lógica de negócio
├── repository/      # Repositórios JPA
├── model/           # Entidades JPA
├── dto/             # Data Transfer Objects
├── mapper/          # Mapeadores DTO-Entity
├── exception/       # Exceções customizadas
└── util/            # Utilitários
```

### 2.4 Base de Dados (PostgreSQL)

**Responsabilidades**:
- Armazenamento persistente
- Integridade referencial
- Transações ACID
- Consultas complexas

**Principais Tabelas**:
- users
- contents
- quizzes
- questions
- user_quiz_attempts
- forum_topics
- forum_posts
- rankings
- badges

## 3. Padrões Arquiteturais Aplicados

### 3.1 MVC (Model-View-Controller)

**Aplicação**:
- **Model**: Entidades JPA + DTOs
- **View**: React Components
- **Controller**: Spring REST Controllers

### 3.2 Repository Pattern

**Aplicação**:
- Spring Data JPA Repositories
- Abstração de acesso a dados
- Queries customizadas

### 3.3 Service Layer Pattern

**Aplicação**:
- Camada de serviços com lógica de negócio
- Transações geridas por @Transactional
- Validações de regras de negócio

### 3.4 DTO Pattern

**Aplicação**:
- Separação entre entidades e objetos de transferência
- Controlo de dados expostos na API
- Validação de entrada

### 3.5 Dependency Injection

**Aplicação**:
- Spring IoC Container
- @Autowired, @Service, @Repository
- Facilita testes unitários

## 4. Fluxo de Dados

### 4.1 Fluxo de Autenticação

```
1. User → Frontend: Submete credenciais
2. Frontend → Backend: POST /api/auth/login
3. Backend → Database: Valida credenciais
4. Backend → Frontend: Retorna JWT token
5. Frontend: Armazena token (localStorage)
6. Frontend → Backend: Requisições com header Authorization: Bearer {token}
7. Backend: Valida token em cada requisição
```

### 4.2 Fluxo de Quiz

```
1. User → Frontend: Seleciona quiz
2. Frontend → Backend: GET /api/quizzes/{id}
3. Backend → Database: Busca quiz e questões
4. Backend → Frontend: Retorna quiz completo
5. User: Responde questões (armazenado localmente)
6. User → Frontend: Submete respostas
7. Frontend → Backend: POST /api/quizzes/{id}/submit
8. Backend: Calcula pontuação
9. Backend → Database: Salva tentativa e atualiza ranking
10. Backend → Frontend: Retorna resultado
```

### 4.3 Fluxo Offline (Mobile)

```
1. User: Abre app sem conexão
2. App → SQLite: Carrega dados locais
3. User: Realiza ações (quiz, leitura)
4. App → SQLite: Armazena ações pendentes
5. App: Detecta conexão restaurada
6. App → Backend: Sincroniza dados pendentes
7. Backend → Database: Processa sincronização
8. Backend → App: Confirma sincronização
9. App → SQLite: Atualiza estado local
```

## 5. Segurança

### 5.1 Autenticação

- **JWT (JSON Web Tokens)**
- Token válido por 24 horas
- Refresh token válido por 7 dias
- Armazenamento seguro (httpOnly cookies ou localStorage com cuidados)

### 5.2 Autorização

- **Role-Based Access Control (RBAC)**
- Roles: USER, MODERATOR, ADMIN
- Anotações @PreAuthorize no backend
- Guards no frontend

### 5.3 Proteção de Dados

- Passwords com BCrypt (strength 12)
- HTTPS obrigatório em produção
- CORS configurado
- Rate limiting
- Input validation (backend e frontend)
- SQL Injection prevention (JPA)
- XSS prevention (sanitização)

## 6. Escalabilidade

### 6.1 Horizontal Scaling

- Backend stateless (JWT)
- Load balancer (Nginx/AWS ALB)
- Múltiplas instâncias do backend

### 6.2 Caching

- Redis para:
  - Sessões de utilizador
  - Rankings em tempo real
  - Conteúdos frequentemente acedidos
- Cache HTTP (ETags)

### 6.3 Database Optimization

- Índices em colunas frequentemente consultadas
- Connection pooling (HikariCP)
- Query optimization
- Paginação de resultados

## 7. Monitorização e Logging

### 7.1 Logging

- SLF4J + Logback
- Níveis: ERROR, WARN, INFO, DEBUG
- Logs estruturados (JSON)
- Rotação de logs

### 7.2 Métricas

- Spring Boot Actuator
- Métricas de: CPU, memória, requisições, erros
- Health checks

### 7.3 Monitorização (Futuro)

- Prometheus + Grafana
- Alertas automáticos
- Dashboards de performance

## 8. Deploy e DevOps

### 8.1 Containerização

- Docker para backend
- Docker Compose para desenvolvimento local
- Imagens otimizadas (multi-stage builds)

### 8.2 CI/CD

- GitHub Actions
- Pipeline:
  1. Build
  2. Testes unitários
  3. Testes de integração
  4. Build de imagem Docker
  5. Deploy automático

### 8.3 Ambientes

- **Development**: Local
- **Staging**: Heroku/AWS (testes)
- **Production**: AWS/Heroku (final)

## 9. Decisões Técnicas Justificadas

### 9.1 Por que Spring Boot?

✅ **Vantagens**:
- Ecossistema maduro e robusto
- Excelente para APIs REST
- Spring Security para autenticação
- JPA para ORM
- Grande comunidade e documentação
- Facilita testes

❌ **Alternativas consideradas**:
- Node.js/Express: Menos estruturado
- Django: Python seria usado apenas onde mais fácil
- .NET: Menos familiar para a equipa

### 9.2 Por que PostgreSQL?

✅ **Vantagens**:
- ACID compliant
- Suporte a JSON (flexibilidade)
- Excelente performance
- Open source
- Suporte a full-text search

❌ **Alternativas consideradas**:
- MySQL: Menos features avançadas
- MongoDB: Não relacional (requisitos são relacionais)

### 9.3 Por que React/React Native?

✅ **Vantagens**:
- Reutilização de código (web e mobile)
- TypeScript para type safety
- Grande ecossistema
- Performance excelente
- Comunidade ativa

❌ **Alternativas consideradas**:
- Vue.js: Menos adoção em mobile
- Angular: Mais pesado
- Flutter: Dart é menos familiar

## 10. Diagrama de Deployment

```
┌─────────────────────────────────────────────────────────┐
│                    PRODUCTION                            │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐         ┌──────────────┐             │
│  │   Frontend   │         │    Mobile    │             │
│  │   (Vercel/   │         │   (Stores)   │             │
│  │   Netlify)   │         │              │             │
│  └──────┬───────┘         └──────┬───────┘             │
│         │                        │                      │
│         └────────────┬───────────┘                      │
│                      │                                  │
│                      ▼                                  │
│         ┌────────────────────────┐                     │
│         │    Load Balancer       │                     │
│         │    (AWS ALB/Nginx)     │                     │
│         └────────────┬───────────┘                     │
│                      │                                  │
│         ┌────────────┴───────────┐                     │
│         │                        │                      │
│         ▼                        ▼                      │
│  ┌─────────────┐         ┌─────────────┐              │
│  │  Backend    │         │  Backend    │              │
│  │  Instance 1 │         │  Instance 2 │              │
│  │  (Docker)   │         │  (Docker)   │              │
│  └──────┬──────┘         └──────┬──────┘              │
│         │                       │                       │
│         └───────────┬───────────┘                      │
│                     │                                   │
│                     ▼                                   │
│         ┌───────────────────────┐                      │
│         │   PostgreSQL (RDS)    │                      │
│         │   + Redis (ElastiCache)│                     │
│         └───────────────────────┘                      │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 11. Requisitos Não Funcionais Atendidos

| RNF | Solução Arquitetural |
|-----|---------------------|
| Performance | Cache Redis, CDN, otimização de queries |
| Escalabilidade | Arquitetura stateless, load balancing |
| Segurança | JWT, HTTPS, BCrypt, validações |
| Disponibilidade | Múltiplas instâncias, health checks |
| Manutenibilidade | Código limpo, testes, documentação |
| Usabilidade | React responsivo, feedback imediato |
| Offline | SQLite local, sincronização |
