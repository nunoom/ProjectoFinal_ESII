# Sprint 1: Setup e Fundações

**Duração**: 04-10 maio 2026 (1 semana)  
**Objetivo**: Configurar ambiente de desenvolvimento, estrutura de projeto e entregar protótipo refinado

---

## 📋 Objetivos da Sprint

1. ✅ Configurar ambiente de desenvolvimento completo
2. ✅ Criar estrutura de projeto (backend, frontend, mobile)
3. ✅ Configurar CI/CD básico
4. ✅ Refinar protótipo
5. ✅ Preparar relatório técnico
6. ✅ Configurar base de dados
7. ✅ Estabelecer padrões de código

---

## 🎯 User Stories

### US-1.1: Configurar Repositório Git
**Como** desenvolvedor  
**Quero** ter um repositório Git estruturado  
**Para** versionar código e colaborar eficientemente

**Critérios de Aceitação**:
- [ ] Repositório criado no GitHub
- [ ] README.md com descrição do projeto
- [ ] .gitignore configurado
- [ ] Branching strategy definida (Git Flow)
- [ ] Proteção de branch main ativada

**Estimativa**: 2 pontos  
**Responsável**: Nuno Mendes

---

### US-1.2: Configurar Backend (Spring Boot)
**Como** desenvolvedor backend  
**Quero** ter projeto Spring Boot configurado  
**Para** começar a desenvolver APIs

**Critérios de Aceitação**:
- [ ] Projeto Spring Boot 3.x criado
- [ ] Dependências configuradas (Spring Web, JPA, Security, etc.)
- [ ] Estrutura de pacotes definida
- [ ] application.properties configurado
- [ ] Endpoint de health check funcionando

**Estimativa**: 5 pontos  
**Responsável**: Khelv Costa

---

### US-1.3: Configurar Frontend (React)
**Como** desenvolvedor frontend  
**Quero** ter projeto React configurado  
**Para** começar a desenvolver interface

**Critérios de Aceitação**:
- [ ] Projeto React + TypeScript criado
- [ ] Material-UI instalado e configurado
- [ ] Redux Toolkit configurado
- [ ] React Router configurado
- [ ] Estrutura de pastas definida
- [ ] Página inicial renderizando

**Estimativa**: 5 pontos  
**Responsável**: Rafaela

---

### US-1.4: Configurar Mobile (React Native)
**Como** desenvolvedor mobile  
**Quero** ter projeto React Native configurado  
**Para** começar a desenvolver app mobile

**Critérios de Aceitação**:
- [ ] Projeto React Native criado
- [ ] React Navigation configurado
- [ ] Redux Toolkit configurado
- [ ] Estrutura de pastas definida
- [ ] App rodando em emulador Android

**Estimativa**: 5 pontos  
**Responsável**: Rafaela

---

### US-1.5: Configurar Base de Dados
**Como** desenvolvedor  
**Quero** ter PostgreSQL configurado  
**Para** persistir dados da aplicação

**Critérios de Aceitação**:
- [ ] PostgreSQL instalado localmente
- [ ] Database "eha_db" criada
- [ ] Conexão do backend funcionando
- [ ] Flyway/Liquibase configurado para migrations
- [ ] Script de criação de tabelas inicial

**Estimativa**: 3 pontos  
**Responsável**: Nuno Mendes

---

### US-1.6: Configurar CI/CD
**Como** desenvolvedor  
**Quero** ter pipeline CI/CD configurado  
**Para** automatizar build e testes

**Critérios de Aceitação**:
- [ ] GitHub Actions configurado
- [ ] Pipeline de build para backend
- [ ] Pipeline de build para frontend
- [ ] Testes automatizados rodando
- [ ] Badge de status no README

**Estimativa**: 5 pontos  
**Responsável**: Nuno Mendes

---

### US-1.7: Refinar Protótipo
**Como** designer  
**Quero** refinar protótipo no Figma  
**Para** ter guia visual para desenvolvimento

**Critérios de Aceitação**:
- [ ] Protótipo de todas as telas principais
- [ ] Paleta de cores definida (bordeaux/cinzento)
- [ ] Tipografia definida
- [ ] Componentes reutilizáveis criados
- [ ] Fluxos de navegação documentados

**Estimativa**: 8 pontos  
**Responsável**: Paula Alexandre

---

### US-1.8: Escrever Relatório Técnico
**Como** equipa  
**Quero** ter relatório técnico completo  
**Para** entregar em 10 de maio

**Critérios de Aceitação**:
- [ ] Introdução e contexto
- [ ] Problemática definida
- [ ] Objetivos geral e específicos
- [ ] Fundamentação teórica
- [ ] Análise de soluções existentes
- [ ] Descrição do protótipo
- [ ] Requisitos funcionais e não funcionais
- [ ] Regras de negócio
- [ ] Arquitetura proposta
- [ ] Diagramas UML (casos de uso, classes)

**Estimativa**: 13 pontos  
**Responsável**: Toda a equipa

---

## 🛠️ Tarefas Técnicas Detalhadas

### Dia 1 (04 maio - Domingo): Planeamento e Setup Inicial

#### Manhã (9h-13h)
**Sprint Planning (2h)**
- [ ] Revisar backlog do produto
- [ ] Selecionar user stories para Sprint 1
- [ ] Estimar esforço (Planning Poker)
- [ ] Atribuir responsabilidades

**Setup de Ambiente (2h)**
- [ ] Instalar ferramentas necessárias:
  - Node.js 18+
  - Java 17+
  - PostgreSQL 15+
  - Docker
  - VS Code / IntelliJ IDEA
  - Postman
  - Git

#### Tarde (14h-18h)
**Criação de Repositório**
```bash
# 1. Criar repositório no GitHub
# Nome: eha-platform
# Descrição: Plataforma Educacional - Economia com História Angola

# 2. Clonar localmente
git clone https://github.com/seu-usuario/eha-platform.git
cd eha-platform

# 3. Criar estrutura de pastas
mkdir -p backend frontend mobile docs

# 4. Criar README.md
touch README.md

# 5. Criar .gitignore
touch .gitignore
```

**Conteúdo do README.md**:
```markdown
# EHA - Economia com História: Angola

Plataforma educacional digital para democratizar o conhecimento sobre história económica angolana.

## 🚀 Tecnologias

- **Backend**: Spring Boot 3.x, PostgreSQL
- **Frontend**: React 18, TypeScript, Material-UI
- **Mobile**: React Native, TypeScript
- **DevOps**: Docker, GitHub Actions

## 📁 Estrutura do Projeto

```
eha-platform/
├── backend/          # API Spring Boot
├── frontend/         # Web App React
├── mobile/           # Mobile App React Native
└── docs/             # Documentação
```

## 🛠️ Setup Local

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### Mobile
```bash
cd mobile
npm install
npx react-native run-android
```

## 👥 Equipa

- Paula Alexandre (M1)
- Khelv Costa (M2)
- Rafaela (M3)
- Nuno Mendes (M4)

## 📄 Licença

MIT
```

---

### Dia 2 (05 maio - Segunda): Backend Setup

#### Backend - Spring Boot (Khelv + Nuno)

**1. Criar projeto Spring Boot**
```bash
cd backend

# Usar Spring Initializr ou criar manualmente
# https://start.spring.io/

# Configurações:
# - Project: Maven
# - Language: Java
# - Spring Boot: 3.2.x
# - Java: 17
# - Packaging: Jar
# - Dependencies:
#   - Spring Web
#   - Spring Data JPA
#   - PostgreSQL Driver
#   - Spring Security
#   - Lombok
#   - Validation
#   - Spring Boot DevTools
```

**2. Estrutura de pacotes**
```
com.eha.backend/
├── config/
│   ├── SecurityConfig.java
│   ├── CorsConfig.java
│   └── SwaggerConfig.java
├── controller/
├── service/
├── repository/
├── model/
│   └── entity/
├── dto/
│   ├── request/
│   └── response/
├── exception/
│   ├── GlobalExceptionHandler.java
│   └── ResourceNotFoundException.java
├── security/
│   ├── JwtTokenProvider.java
│   └── JwtAuthenticationFilter.java
├── util/
└── BackendApplication.java
```

**3. application.properties**
```properties
# Server
server.port=8080
spring.application.name=eha-backend

# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/eha_db
spring.datasource.username=eha_user
spring.datasource.password=eha_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Flyway
spring.flyway.enabled=true
spring.flyway.baseline-on-migrate=true

# JWT
jwt.secret=your-secret-key-change-in-production
jwt.expiration=86400000

# Logging
logging.level.com.eha.backend=DEBUG
logging.level.org.springframework.web=INFO
```

**4. Health Check Controller**
```java
package com.eha.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("timestamp", LocalDateTime.now());
        response.put("service", "EHA Backend");
        return ResponseEntity.ok(response);
    }
}
```

**5. Testar**
```bash
./mvnw spring-boot:run

# Em outro terminal
curl http://localhost:8080/api/health
```

---

### Dia 3 (06 maio - Terça): Frontend Setup

#### Frontend - React (Rafaela + Paula)

**1. Criar projeto React**
```bash
cd frontend

# Criar com TypeScript
npx create-react-app . --template typescript

# Instalar dependências
npm install @mui/material @emotion/react @emotion/styled
npm install @reduxjs/toolkit react-redux
npm install react-router-dom
npm install axios
npm install formik yup
npm install @mui/icons-material
```

**2. Estrutura de pastas**
```
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Loading.tsx
│   └── layout/
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── Sidebar.tsx
├── pages/
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   └── Dashboard.tsx
├── features/
│   ├── auth/
│   │   ├── authSlice.ts
│   │   └── authAPI.ts
│   └── content/
│       ├── contentSlice.ts
│       └── contentAPI.ts
├── services/
│   ├── api.ts
│   └── axios.config.ts
├── hooks/
│   └── useAuth.ts
├── utils/
│   ├── constants.ts
│   └── helpers.ts
├── types/
│   └── index.ts
├── styles/
│   ├── theme.ts
│   └── global.css
├── store/
│   └── store.ts
├── App.tsx
└── index.tsx
```

**3. Configurar tema Material-UI**
```typescript
// src/styles/theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#8B0000', // Bordeaux
      light: '#A52A2A',
      dark: '#5C0000',
    },
    secondary: {
      main: '#757575', // Cinzento
      light: '#9E9E9E',
      dark: '#424242',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
  },
});
```

**4. Configurar Redux Store**
```typescript
// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**5. Configurar Axios**
```typescript
// src/services/axios.config.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
```

**6. Página inicial**
```typescript
// src/pages/Home.tsx
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h1" color="primary" gutterBottom>
          Economia com História: Angola
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          Democratizando o conhecimento sobre história económica angolana
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => navigate('/login')}
            sx={{ mr: 2 }}
          >
            Entrar
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large"
            onClick={() => navigate('/register')}
          >
            Registar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
```

---

### Dia 4 (07 maio - Quarta): Mobile Setup + Database

#### Mobile - React Native (Rafaela)

**1. Criar projeto**
```bash
cd mobile

# Criar projeto React Native
npx react-native init EHAMobile --template react-native-template-typescript

cd EHAMobile

# Instalar dependências
npm install @react-navigation/native @react-navigation/stack
npm install @reduxjs/toolkit react-redux
npm install axios
npm install @react-native-async-storage/async-storage
npm install react-native-paper
```

**2. Estrutura básica**
```
src/
├── components/
├── screens/
│   ├── HomeScreen.tsx
│   ├── LoginScreen.tsx
│   └── DashboardScreen.tsx
├── navigation/
│   └── AppNavigator.tsx
├── store/
│   └── store.ts
├── services/
│   └── api.ts
└── types/
    └── index.ts
```

#### Database - PostgreSQL (Nuno)

**1. Criar database**
```sql
-- Conectar ao PostgreSQL
psql -U postgres

-- Criar usuário
CREATE USER eha_user WITH PASSWORD 'eha_password';

-- Criar database
CREATE DATABASE eha_db OWNER eha_user;

-- Dar permissões
GRANT ALL PRIVILEGES ON DATABASE eha_db TO eha_user;
```

**2. Criar primeira migration (Flyway)**
```sql
-- backend/src/main/resources/db/migration/V1__initial_schema.sql

-- Users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    email_confirmed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index
CREATE INDEX idx_users_email ON users(email);
```

---

### Dia 5 (08 maio - Quinta): CI/CD + Protótipo

#### CI/CD (Nuno)

**1. GitHub Actions - Backend**
```yaml
# .github/workflows/backend-ci.yml
name: Backend CI

on:
  push:
    branches: [ develop, main ]
    paths:
      - 'backend/**'
  pull_request:
    branches: [ develop, main ]
    paths:
      - 'backend/**'

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up JDK 17
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'
    
    - name: Build with Maven
      run: |
        cd backend
        ./mvnw clean install
    
    - name: Run tests
      run: |
        cd backend
        ./mvnw test
```

**2. GitHub Actions - Frontend**
```yaml
# .github/workflows/frontend-ci.yml
name: Frontend CI

on:
  push:
    branches: [ develop, main ]
    paths:
      - 'frontend/**'
  pull_request:
    branches: [ develop, main ]
    paths:
      - 'frontend/**'

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: |
        cd frontend
        npm ci
    
    - name: Build
      run: |
        cd frontend
        npm run build
    
    - name: Run tests
      run: |
        cd frontend
        npm test -- --coverage
```

#### Protótipo Figma (Paula + Rafaela)

**Telas a criar**:
1. Landing Page
2. Login
3. Registo
4. Dashboard
5. Lista de Conteúdos
6. Visualização de Conteúdo
7. Quiz
8. Resultado de Quiz
9. Fórum
10. Ranking
11. Perfil
12. Painel Admin

---

### Dia 6-7 (09-10 maio - Sexta/Sábado): Relatório e Entrega

#### Relatório Técnico (Toda a equipa)

**Estrutura do relatório** (ver documento separado)

**Divisão de trabalho**:
- Paula: Introdução, Contexto, Protótipo
- Khelv: Arquitetura, Tecnologias Backend
- Rafaela: Design, UX, Frontend/Mobile
- Nuno: Infraestrutura, DevOps, Database

---

## ✅ Definition of Done

Uma tarefa está concluída quando:
- [ ] Código implementado e funcional
- [ ] Testado localmente
- [ ] Commitado no Git
- [ ] Documentado (se necessário)
- [ ] Code review feito (se aplicável)

---

## 📊 Métricas da Sprint

**Velocity esperada**: 20-25 pontos

**Distribuição de esforço**:
- Backend: 30%
- Frontend: 25%
- Mobile: 20%
- DevOps: 15%
- Documentação: 10%

---

## 🚀 Entregáveis

Até **10 de maio de 2026**:

1. ✅ Repositório Git configurado e organizado
2. ✅ Backend Spring Boot rodando com health check
3. ✅ Frontend React rodando com página inicial
4. ✅ Mobile React Native rodando em emulador
5. ✅ PostgreSQL configurado com schema inicial
6. ✅ CI/CD configurado e funcionando
7. ✅ Protótipo completo no Figma
8. ✅ **Relatório técnico completo (PDF)**

---

## 📝 Checklist Final

### Código
- [ ] Backend rodando em localhost:8080
- [ ] Frontend rodando em localhost:3000
- [ ] Mobile rodando em emulador
- [ ] Database criada e conectada
- [ ] Health check endpoint funcionando

### DevOps
- [ ] Repositório no GitHub
- [ ] CI/CD pipelines configurados
- [ ] Badges de status no README
- [ ] Docker configurado (opcional)

### Documentação
- [ ] README.md completo
- [ ] Relatório técnico finalizado
- [ ] Protótipo no Figma
- [ ] Documentação de setup

### Apresentação
- [ ] Demo preparada
- [ ] Slides de apresentação
- [ ] Relatório em PDF

---

## 🎓 Aprendizados Esperados

Ao final desta sprint, a equipa deve:
- ✅ Dominar setup de projetos Spring Boot, React e React Native
- ✅ Entender arquitetura em camadas
- ✅ Saber configurar CI/CD básico
- ✅ Conhecer boas práticas de Git Flow
- ✅ Ter visão clara do projeto completo
