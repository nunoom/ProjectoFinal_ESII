# Documentação de Endpoints da API

**Base URL**: `http://localhost:8080/api`  
**Produção**: `https://eha-api.herokuapp.com/api`

---

## 1. Autenticação

### POST /auth/register
Registar novo utilizador

**Request Body**:
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "Password123!",
  "birthDate": "2005-03-15"
}
```

**Response** (201 Created):
```json
{
  "message": "Utilizador registado com sucesso. Verifique seu email.",
  "userId": 1
}
```

---

### POST /auth/login
Fazer login

**Request Body**:
```json
{
  "email": "joao@example.com",
  "password": "Password123!"
}
```

**Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh_token_here",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@example.com",
    "role": "USER",
    "points": 0,
    "level": 1
  }
}
```

---

### POST /auth/refresh
Renovar token

**Request Body**:
```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response** (200 OK):
```json
{
  "token": "new_jwt_token",
  "refreshToken": "new_refresh_token"
}
```

---

### POST /auth/forgot-password
Recuperar password

**Request Body**:
```json
{
  "email": "joao@example.com"
}
```

**Response** (200 OK):
```json
{
  "message": "Email de recuperação enviado"
}
```

---

## 2. Utilizadores

### GET /users/me
Obter perfil do utilizador autenticado

**Headers**: `Authorization: Bearer {token}`

**Response** (200 OK):
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@example.com",
  "bio": "Estudante de economia",
  "photoUrl": "https://cdn.eha.com/users/1.jpg",
  "points": 150,
  "level": 3,
  "role": "USER",
  "createdAt": "2026-05-01T10:00:00Z"
}
```

---

### PUT /users/me
Atualizar perfil

**Headers**: `Authorization: Bearer {token}`

**Request Body**:
```json
{
  "name": "João Pedro Silva",
  "bio": "Estudante apaixonado por economia angolana"
}
```

**Response** (200 OK):
```json
{
  "message": "Perfil atualizado com sucesso",
  "user": { ... }
}
```

---

### POST /users/me/photo
Upload de foto de perfil

**Headers**: 
- `Authorization: Bearer {token}`
- `Content-Type: multipart/form-data`

**Request Body**: FormData com campo `photo`

**Response** (200 OK):
```json
{
  "photoUrl": "https://cdn.eha.com/users/1.jpg"
}
```

---

## 3. Conteúdos

### GET /contents
Listar conteúdos

**Query Parameters**:
- `page` (default: 0)
- `size` (default: 20)
- `category` (opcional)
- `search` (opcional)
- `sort` (recent, popular, alphabetical)

**Response** (200 OK):
```json
{
  "content": [
    {
      "id": 1,
      "title": "História do Petróleo em Angola",
      "summary": "Descubra como o petróleo moldou a economia angolana",
      "imageUrl": "https://cdn.eha.com/contents/1.jpg",
      "category": "PETROLEO",
      "readTime": 10,
      "views": 1523,
      "createdAt": "2026-04-15T10:00:00Z"
    }
  ],
  "totalElements": 45,
  "totalPages": 3,
  "currentPage": 0
}
```

---

### GET /contents/{id}
Obter conteúdo específico

**Response** (200 OK):
```json
{
  "id": 1,
  "title": "História do Petróleo em Angola",
  "content": "<p>Conteúdo completo em HTML...</p>",
  "summary": "Resumo...",
  "imageUrl": "https://cdn.eha.com/contents/1.jpg",
  "category": "PETROLEO",
  "tags": ["petróleo", "economia", "história"],
  "readTime": 10,
  "views": 1524,
  "author": {
    "id": 2,
    "name": "Prof. Carlos Lopes"
  },
  "createdAt": "2026-04-15T10:00:00Z",
  "updatedAt": "2026-04-20T15:30:00Z"
}
```

---

### POST /contents/{id}/favorite
Marcar como favorito

**Headers**: `Authorization: Bearer {token}`

**Response** (200 OK):
```json
{
  "message": "Conteúdo adicionado aos favoritos"
}
```

---

### GET /contents/favorites
Listar favoritos do utilizador

**Headers**: `Authorization: Bearer {token}`

**Response** (200 OK):
```json
{
  "favorites": [ ... ]
}
```

---

## 4. Quizzes

### GET /quizzes
Listar quizzes disponíveis

**Query Parameters**:
- `category` (opcional)
- `difficulty` (EASY, MEDIUM, HARD)

**Response** (200 OK):
```json
{
  "quizzes": [
    {
      "id": 1,
      "title": "Quiz: Petróleo em Angola",
      "description": "Teste seus conhecimentos sobre petróleo",
      "category": "PETROLEO",
      "difficulty": "MEDIUM",
      "questionCount": 10,
      "points": 50,
      "timeLimit": 600,
      "completed": false
    }
  ]
}
```

---

### GET /quizzes/{id}
Obter quiz completo

**Headers**: `Authorization: Bearer {token}`

**Response** (200 OK):
```json
{
  "id": 1,
  "title": "Quiz: Petróleo em Angola",
  "description": "Teste seus conhecimentos",
  "timeLimit": 600,
  "questions": [
    {
      "id": 1,
      "text": "Em que ano foi descoberto petróleo em Angola?",
      "type": "MULTIPLE_CHOICE",
      "options": [
        { "id": 1, "text": "1955" },
        { "id": 2, "text": "1966" },
        { "id": 3, "text": "1975" },
        { "id": 4, "text": "1985" }
      ]
    }
  ]
}
```

---

### POST /quizzes/{id}/submit
Submeter respostas do quiz

**Headers**: `Authorization: Bearer {token}`

**Request Body**:
```json
{
  "answers": [
    { "questionId": 1, "selectedOptionId": 2 },
    { "questionId": 2, "selectedOptionId": 5 }
  ],
  "timeSpent": 450
}
```

**Response** (200 OK):
```json
{
  "score": 80,
  "correctAnswers": 8,
  "totalQuestions": 10,
  "pointsEarned": 40,
  "passed": true,
  "results": [
    {
      "questionId": 1,
      "correct": true,
      "selectedOption": 2,
      "correctOption": 2,
      "explanation": "O petróleo foi descoberto em 1966..."
    }
  ]
}
```

---

### GET /quizzes/history
Histórico de quizzes do utilizador

**Headers**: `Authorization: Bearer {token}`

**Response** (200 OK):
```json
{
  "attempts": [
    {
      "quizId": 1,
      "quizTitle": "Quiz: Petróleo em Angola",
      "score": 80,
      "pointsEarned": 40,
      "completedAt": "2026-05-15T14:30:00Z"
    }
  ]
}
```

---

## 5. Ranking

### GET /ranking/global
Ranking global

**Query Parameters**:
- `page` (default: 0)
- `size` (default: 100)

**Response** (200 OK):
```json
{
  "rankings": [
    {
      "position": 1,
      "userId": 5,
      "userName": "Maria Santos",
      "photoUrl": "https://cdn.eha.com/users/5.jpg",
      "points": 1250,
      "level": 15
    }
  ],
  "currentUser": {
    "position": 45,
    "points": 150,
    "level": 3
  }
}
```

---

### GET /ranking/weekly
Ranking semanal

**Response** (200 OK):
```json
{
  "rankings": [ ... ],
  "weekStart": "2026-05-12",
  "weekEnd": "2026-05-18"
}
```

---

### GET /ranking/category/{category}
Ranking por categoria

**Response** (200 OK):
```json
{
  "category": "PETROLEO",
  "rankings": [ ... ]
}
```

---

## 6. Fórum

### GET /forum/topics
Listar tópicos do fórum

**Query Parameters**:
- `page`, `size`
- `category` (opcional)
- `sort` (recent, popular)

**Response** (200 OK):
```json
{
  "topics": [
    {
      "id": 1,
      "title": "Impacto do petróleo na economia",
      "category": "PETROLEO",
      "author": {
        "id": 3,
        "name": "Pedro Costa",
        "photoUrl": "..."
      },
      "replyCount": 15,
      "views": 234,
      "lastReplyAt": "2026-05-15T16:20:00Z",
      "createdAt": "2026-05-10T10:00:00Z"
    }
  ]
}
```

---

### POST /forum/topics
Criar novo tópico

**Headers**: `Authorization: Bearer {token}`

**Request Body**:
```json
{
  "title": "Discussão sobre o Kwanza",
  "content": "Gostaria de discutir...",
  "category": "KWANZA"
}
```

**Response** (201 Created):
```json
{
  "id": 25,
  "message": "Tópico criado com sucesso"
}
```

---

### GET /forum/topics/{id}
Ver tópico e respostas

**Response** (200 OK):
```json
{
  "id": 1,
  "title": "Impacto do petróleo na economia",
  "content": "Conteúdo do post...",
  "category": "PETROLEO",
  "author": { ... },
  "createdAt": "2026-05-10T10:00:00Z",
  "replies": [
    {
      "id": 1,
      "content": "Concordo que...",
      "author": { ... },
      "createdAt": "2026-05-10T11:30:00Z"
    }
  ]
}
```

---

### POST /forum/topics/{id}/replies
Responder a tópico

**Headers**: `Authorization: Bearer {token}`

**Request Body**:
```json
{
  "content": "Minha opinião é..."
}
```

**Response** (201 Created):
```json
{
  "id": 45,
  "message": "Resposta publicada com sucesso"
}
```

---

### DELETE /forum/posts/{id}
Eliminar post (próprio ou admin)

**Headers**: `Authorization: Bearer {token}`

**Response** (200 OK):
```json
{
  "message": "Post eliminado com sucesso"
}
```

---

## 7. Admin

### GET /admin/users
Listar todos os utilizadores (Admin only)

**Headers**: `Authorization: Bearer {token}`

**Response** (200 OK):
```json
{
  "users": [
    {
      "id": 1,
      "name": "João Silva",
      "email": "joao@example.com",
      "role": "USER",
      "status": "ACTIVE",
      "createdAt": "2026-05-01T10:00:00Z"
    }
  ]
}
```

---

### PUT /admin/users/{id}/role
Alterar role de utilizador

**Request Body**:
```json
{
  "role": "MODERATOR"
}
```

---

### POST /admin/contents
Criar novo conteúdo

**Request Body**:
```json
{
  "title": "Novo Artigo",
  "content": "<p>Conteúdo...</p>",
  "summary": "Resumo",
  "category": "PETROLEO",
  "tags": ["tag1", "tag2"]
}
```

---

### POST /admin/quizzes
Criar novo quiz

**Request Body**:
```json
{
  "title": "Novo Quiz",
  "description": "Descrição",
  "category": "PETROLEO",
  "difficulty": "MEDIUM",
  "timeLimit": 600,
  "questions": [
    {
      "text": "Pergunta?",
      "type": "MULTIPLE_CHOICE",
      "options": [
        { "text": "Opção 1", "correct": false },
        { "text": "Opção 2", "correct": true }
      ],
      "explanation": "Explicação..."
    }
  ]
}
```

---

## Códigos de Status HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Sucesso |
| 201 | Created - Recurso criado |
| 204 | No Content - Sucesso sem conteúdo |
| 400 | Bad Request - Dados inválidos |
| 401 | Unauthorized - Não autenticado |
| 403 | Forbidden - Sem permissão |
| 404 | Not Found - Recurso não encontrado |
| 409 | Conflict - Conflito (ex: email já existe) |
| 429 | Too Many Requests - Rate limit excedido |
| 500 | Internal Server Error - Erro no servidor |

---

## Autenticação

Todas as rotas protegidas requerem header:
```
Authorization: Bearer {jwt_token}
```

Token expira em 24 horas. Use `/auth/refresh` para renovar.

---

## Rate Limiting

- **Geral**: 100 requisições por minuto por IP
- **Login**: 5 tentativas por 15 minutos
- **Registo**: 3 registos por hora por IP

---

## Paginação

Endpoints que retornam listas suportam:
- `page`: Número da página (0-indexed)
- `size`: Itens por página (max: 100)
- `sort`: Campo de ordenação

Exemplo: `/api/contents?page=0&size=20&sort=createdAt,desc`

---

## Documentação Interativa

Swagger UI disponível em: `http://localhost:8080/swagger-ui.html`
