# 🚀 Guia Rápido de Desenvolvimento - EHA

## 📌 Visão Geral

Este guia fornece um roteiro rápido para iniciar o desenvolvimento do projeto **Economia com História: Angola (EHA)**.

---

## 🎯 Objetivos do Projeto

- ✅ Plataforma educacional web e mobile
- ✅ Conteúdos sobre história económica angolana
- ✅ Quizzes interativos com gamificação
- ✅ Fórum de discussão
- ✅ Sistema de ranking
- ✅ Funcionalidade offline
- ✅ 100% implementado até 10 de junho de 2026

---

## 📅 Cronograma Resumido

| Data | Marco | Entregável |
|------|-------|------------|
| **10 maio** | Sprint 1 | Relatório + Protótipo + Setup |
| **25 maio** | Marco 60% | 60% dos requisitos implementados |
| **10 junho** | Entrega Final | 100% implementado + Deploy |

---

## 🏗️ Arquitetura

```
Frontend (React) ←→ API REST (Spring Boot) ←→ PostgreSQL
Mobile (React Native) ↗
```

**Stack Tecnológica**:
- **Backend**: Spring Boot 3.x + PostgreSQL + JWT
- **Frontend**: React 18 + TypeScript + Material-UI + Redux
- **Mobile**: React Native + TypeScript + AsyncStorage
- **DevOps**: GitHub Actions + Docker + Heroku/AWS

---

## 📋 Requisitos Principais

### Must Have (40 requisitos)
- ✅ Autenticação completa (login, registo, recuperação)
- ✅ Gestão de perfil
- ✅ Exploração de conteúdos
- ✅ Quizzes interativos
- ✅ Sistema de pontos e níveis
- ✅ Rankings (global, semanal, por categoria)
- ✅ Fórum de discussão
- ✅ Painel administrativo
- ✅ Modo offline (mobile)

---

## 🗂️ Estrutura de Documentação

### 1. Requisitos
- [Visão Geral](./requisitos/01-visao-geral.md) - Contexto e objetivos
- [Stakeholders](./requisitos/02-stakeholders.md) - Utilizadores e personas
- [Requisitos Funcionais](./requisitos/03-requisitos-funcionais.md) - 50 RF detalhados
- [Requisitos Não Funcionais](./requisitos/04-requisitos-nao-funcionais.md) - 40 RNF
- [Regras de Negócio](./requisitos/05-regras-negocio.md) - Políticas do sistema

### 2. Arquitetura
- [Arquitetura de Sistema](./arquitetura/02-arquitetura-sistema.md) - Visão completa
- [Decisões Arquiteturais](./arquitetura/03-decisoes-arquiteturais.md) - Justificativas

### 3. API
- [Endpoints](./api/01-endpoints.md) - Documentação completa da API REST
- [Autenticação](./api/02-autenticacao.md) - JWT e segurança
- [Exemplos](./api/03-exemplos.md) - Exemplos de uso

### 4. Base de Dados
- [Schema SQL](./database/02-schema.md) - Schema completo PostgreSQL
- [Dicionário de Dados](./database/03-dicionario-dados.md) - Descrição de tabelas

### 5. Sprints
- [Metodologia](./sprints/00-metodologia.md) - Scrum adaptado
- [Sprint 1](./sprints/sprint-01.md) - Setup e Fundações (COMPLETO)
- [Sprint 2](./sprints/sprint-02.md) - Autenticação
- [Sprint 3](./sprints/sprint-03.md) - Conteúdos e Quiz
- [Sprint 4](./sprints/sprint-04.md) - Fórum e Ranking
- [Sprint 5](./sprints/sprint-05.md) - Mobile e Offline
- [Sprint 6](./sprints/sprint-06.md) - Testes e Deploy

---

## 🚀 Quick Start

### 1. Clonar Repositório
```bash
git clone https://github.com/seu-usuario/eha-platform.git
cd eha-platform
```

### 2. Backend (Spring Boot)
```bash
cd backend

# Configurar application.properties
# Criar database PostgreSQL: eha_db

# Executar
./mvnw spring-boot:run

# API disponível em: http://localhost:8080
```

### 3. Frontend (React)
```bash
cd frontend

# Instalar dependências
npm install

# Executar
npm start

# App disponível em: http://localhost:3000
```

### 4. Mobile (React Native)
```bash
cd mobile

# Instalar dependências
npm install

# Executar Android
npx react-native run-android

# Executar iOS (Mac only)
npx react-native run-ios
```

### 5. Database
```sql
-- Criar database
CREATE DATABASE eha_db;

-- Executar migrations
-- (Flyway executa automaticamente ao iniciar backend)
```

---

## 📊 Sprints Detalhadas

### Sprint 1 (04-10 maio): Setup ✅
- [x] Repositório Git configurado
- [x] Backend Spring Boot rodando
- [x] Frontend React rodando
- [x] Mobile React Native rodando
- [x] PostgreSQL configurado
- [x] CI/CD básico
- [x] Protótipo Figma
- [x] Relatório técnico

### Sprint 2 (11-17 maio): Autenticação
**Backend**:
- [ ] API de registo
- [ ] API de login (JWT)
- [ ] API de recuperação de password
- [ ] API de perfil (GET, PUT)
- [ ] Testes unitários

**Frontend**:
- [ ] Tela de login
- [ ] Tela de registo
- [ ] Tela de perfil
- [ ] Integração com API
- [ ] Gestão de token JWT

**Database**:
- [ ] Tabela users completa
- [ ] Migrations

### Sprint 3 (18-24 maio): Conteúdos e Quiz
**Backend**:
- [ ] API de conteúdos (CRUD)
- [ ] API de quizzes (CRUD)
- [ ] API de submissão de quiz
- [ ] Cálculo de pontuação
- [ ] Testes de integração

**Frontend**:
- [ ] Listagem de conteúdos
- [ ] Visualização de conteúdo
- [ ] Listagem de quizzes
- [ ] Interface de quiz
- [ ] Resultado de quiz

**Database**:
- [ ] Tabelas: contents, quizzes, questions, user_quiz_attempts

### Sprint 4 (25-31 maio): Fórum e Ranking
**Backend**:
- [ ] API de fórum (tópicos e respostas)
- [ ] API de ranking
- [ ] Sistema de pontos
- [ ] Sistema de badges
- [ ] Moderação

**Frontend**:
- [ ] Fórum (listagem, criação, respostas)
- [ ] Rankings (global, semanal, categoria)
- [ ] Perfil com badges
- [ ] Notificações

**Database**:
- [ ] Tabelas: forum_topics, forum_replies, rankings, badges

### Sprint 5 (01-07 junho): Mobile e Offline
**Mobile**:
- [ ] Todas as telas principais
- [ ] Navegação completa
- [ ] Integração com API
- [ ] SQLite para offline
- [ ] Sincronização de dados
- [ ] Download de conteúdos

**Testes**:
- [ ] Testes em dispositivos reais
- [ ] Testes de sincronização

### Sprint 6 (08-10 junho): Testes e Deploy
**Testes**:
- [ ] Testes de aceitação (UAT)
- [ ] Correção de bugs críticos
- [ ] Testes de performance
- [ ] Testes de segurança

**Deploy**:
- [ ] Deploy backend (Heroku/AWS)
- [ ] Deploy frontend (Vercel/Netlify)
- [ ] Configuração de domínio
- [ ] Monitorização

**Documentação**:
- [ ] Documentação final
- [ ] Manual do utilizador
- [ ] Vídeo de demonstração

---

## 🧪 Testes

### Testes Unitários
```bash
# Backend
cd backend
./mvnw test

# Frontend
cd frontend
npm test

# Mobile
cd mobile
npm test
```

### Testes de Integração
```bash
cd backend
./mvnw verify
```

### Cobertura de Código
```bash
# Backend
./mvnw jacoco:report

# Frontend
npm test -- --coverage
```

**Meta**: > 70% de cobertura

---

## 🔐 Segurança

- ✅ Passwords com BCrypt (strength 12)
- ✅ JWT com expiração (24h)
- ✅ HTTPS em produção
- ✅ Validação de inputs (frontend + backend)
- ✅ Rate limiting (100 req/min)
- ✅ CORS configurado
- ✅ SQL Injection prevention (JPA)
- ✅ XSS prevention (sanitização)

---

## 📈 Métricas de Sucesso

### Técnicas
- ✅ 100% dos requisitos Must Have implementados
- ✅ Cobertura de testes > 70%
- ✅ Tempo de resposta API < 500ms
- ✅ Tempo de carregamento < 3s
- ✅ Zero erros críticos em produção

### Funcionais
- ✅ Modo offline funcional
- ✅ Sincronização correta
- ✅ Rankings em tempo real
- ✅ Fórum moderado

---

## 📞 Suporte

### Equipa
- **Paula Alexandre** (M1) - paula@isptec.co.ao
- **Khelv Costa** (M2) - khelv@isptec.co.ao
- **Rafaela** (M3) - rafaela@isptec.co.ao
- **Nuno Mendes** (M4) - nuno@isptec.co.ao

### Orientador
- **Professor Judson Paiva** - judson.paiva@isptec.co.ao

---

## 📚 Recursos Úteis

### Documentação Oficial
- [Spring Boot](https://spring.io/projects/spring-boot)
- [React](https://react.dev/)
- [React Native](https://reactnative.dev/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Material-UI](https://mui.com/)

### Tutoriais
- [JWT Authentication with Spring Boot](https://www.baeldung.com/spring-security-oauth-jwt)
- [React Redux Toolkit](https://redux-toolkit.js.org/tutorials/quick-start)
- [React Native Offline](https://github.com/rgommezz/react-native-offline)

### Ferramentas
- [Postman](https://www.postman.com/) - Testes de API
- [DBeaver](https://dbeaver.io/) - Cliente PostgreSQL
- [Figma](https://www.figma.com/) - Design
- [GitHub Actions](https://github.com/features/actions) - CI/CD

---

## ✅ Checklist de Entrega Final

### Código
- [ ] Backend completo e funcional
- [ ] Frontend completo e funcional
- [ ] Mobile completo e funcional
- [ ] Todos os requisitos Must Have implementados
- [ ] Testes automatizados com cobertura > 70%
- [ ] CI/CD configurado e funcionando

### Deploy
- [ ] Backend em produção
- [ ] Frontend em produção
- [ ] Database em produção
- [ ] HTTPS configurado
- [ ] Domínio configurado (opcional)

### Documentação
- [ ] README completo
- [ ] Documentação de API (Swagger)
- [ ] Manual do utilizador
- [ ] Documentação técnica
- [ ] Vídeo de demonstração

### Apresentação
- [ ] Slides preparados
- [ ] Demo funcional
- [ ] Relatório final em PDF

---

## 🎓 Critérios de Avaliação

1. **Funcionalidade** (40%)
   - Todos os requisitos implementados
   - Funcionalidade offline
   - Sem bugs críticos

2. **Qualidade Técnica** (30%)
   - Código limpo e organizado
   - Testes automatizados
   - Boas práticas de segurança
   - Performance adequada

3. **Documentação** (15%)
   - Documentação completa
   - Código comentado
   - README claro

4. **Apresentação** (15%)
   - Demo funcional
   - Explicação clara
   - Domínio técnico

---

## 🚨 Alertas Importantes

⚠️ **Prazos Críticos**:
- 10 maio: Relatório + Protótipo
- 25 maio: 60% implementado
- 10 junho: 100% implementado

⚠️ **Requisitos Obrigatórios**:
- Base de dados (não ficheiros)
- Aplicação mobile
- Testes automatizados
- CI/CD
- GitHub com versionamento

⚠️ **Acompanhamento Diário**:
- Daily standup no grupo (obrigatório)
- Relatório diário com evidências
- Apresentações aleatórias ao professor

---

## 💡 Dicas de Sucesso

1. **Comece cedo**: Não deixe para última hora
2. **Comunique**: Daily standups são essenciais
3. **Teste sempre**: Testes evitam bugs de última hora
4. **Documente**: Documentação facilita manutenção
5. **Peça ajuda**: Professor e colegas estão disponíveis
6. **Use IA**: ChatGPT, GitHub Copilot para acelerar
7. **Priorize**: Foque nos Must Have primeiro
8. **Revise código**: Code review melhora qualidade

---

## 🎉 Boa Sorte!

Este é um projeto desafiador mas extremamente enriquecedor. Sigam o plano, comuniquem bem e trabalhem em equipa. Vocês conseguem! 💪

---

**Última atualização**: 28 de maio de 2026  
**Versão**: 1.0
