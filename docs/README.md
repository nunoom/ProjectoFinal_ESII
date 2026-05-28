# Documentação do Projeto - Economia com História: Angola (EHA)

## 📋 Índice da Documentação

### 1. Visão Geral
- [Introdução ao Projeto](#introdução)
- [Objetivos e Escopo](./requisitos/01-visao-geral.md)
- [Stakeholders](./requisitos/02-stakeholders.md)

### 2. Requisitos
- [Requisitos Funcionais](./requisitos/03-requisitos-funcionais.md)
- [Requisitos Não Funcionais](./requisitos/04-requisitos-nao-funcionais.md)
- [Regras de Negócio](./requisitos/05-regras-negocio.md)
- [Casos de Uso](./requisitos/06-casos-uso.md)

### 3. Arquitetura
- [Visão Arquitetural](./arquitetura/01-visao-arquitetural.md)
- [Arquitetura de Sistema](./arquitetura/02-arquitetura-sistema.md)
- [Decisões Arquiteturais](./arquitetura/03-decisoes-arquiteturais.md)
- [Diagrama de Componentes](./arquitetura/04-componentes.md)

### 4. Design
- [Design System](./design/01-design-system.md)
- [Wireframes e Mockups](./design/02-wireframes.md)
- [Fluxos de Navegação](./design/03-fluxos-navegacao.md)
- [Guia de Estilo](./design/04-guia-estilo.md)

### 5. Backend
- [Arquitetura Backend](./backend/01-arquitetura-backend.md)
- [API REST](./backend/02-api-rest.md)
- [Modelos de Dados](./backend/03-modelos-dados.md)
- [Autenticação e Autorização](./backend/04-autenticacao.md)
- [Serviços e Lógica de Negócio](./backend/05-servicos.md)

### 6. Frontend
- [Arquitetura Frontend](./frontend/01-arquitetura-frontend.md)
- [Componentes](./frontend/02-componentes.md)
- [Gerenciamento de Estado](./frontend/03-estado.md)
- [Integração com API](./frontend/04-integracao-api.md)

### 7. Mobile
- [Arquitetura Mobile](./mobile/01-arquitetura-mobile.md)
- [Funcionalidades Offline](./mobile/02-offline.md)
- [Sincronização de Dados](./mobile/03-sincronizacao.md)

### 8. Base de Dados
- [Modelo Entidade-Relacionamento](./database/01-modelo-er.md)
- [Esquema de Banco de Dados](./database/02-schema.md)
- [Dicionário de Dados](./database/03-dicionario-dados.md)
- [Scripts de Migração](./database/04-migrations.md)

### 9. API
- [Documentação de Endpoints](./api/01-endpoints.md)
- [Autenticação](./api/02-autenticacao.md)
- [Exemplos de Requisições](./api/03-exemplos.md)
- [Códigos de Erro](./api/04-erros.md)

### 10. Testes
- [Estratégia de Testes](./testes/01-estrategia-testes.md)
- [Testes Unitários](./testes/02-testes-unitarios.md)
- [Testes de Integração](./testes/03-testes-integracao.md)
- [Testes de Aceitação](./testes/04-testes-aceitacao.md)

### 11. Sprints e Desenvolvimento
- [Metodologia Ágil](./sprints/00-metodologia.md)
- [Sprint 1 - Setup e Fundações](./sprints/sprint-01.md)
- [Sprint 2 - Autenticação e Perfis](./sprints/sprint-02.md)
- [Sprint 3 - Conteúdos e Quiz](./sprints/sprint-03.md)
- [Sprint 4 - Fórum e Ranking](./sprints/sprint-04.md)
- [Sprint 5 - Mobile e Offline](./sprints/sprint-05.md)
- [Sprint 6 - Testes e Deploy](./sprints/sprint-06.md)

## 🎯 Introdução

**Economia com História: Angola (EHA)** é uma plataforma educacional digital que visa democratizar o acesso ao conhecimento sobre história económica angolana através de conteúdos interativos, quizzes, fóruns de discussão e rankings competitivos, com suporte offline.

### Contexto do Projeto

O projeto foi desenvolvido no âmbito da disciplina de Engenharia de Software II do ISPTEC, com base nos conteúdos fornecidos pelo Professor Doutor Carlos Lopes.

### Tecnologias Principais

**Backend:**
- Spring Boot (Java)
- PostgreSQL
- Spring Security + JWT
- Spring Data JPA

**Frontend Web:**
- React.js
- TypeScript
- Material-UI
- Redux Toolkit

**Mobile:**
- React Native
- TypeScript
- AsyncStorage (offline)
- React Navigation

**DevOps:**
- GitHub Actions (CI/CD)
- Docker
- Heroku/AWS (deploy)

### Equipe

- Paula Alexandre (M1)
- Khelv Costa (M2)
- Rafaela (M3)
- Nuno Mendes (M4)

### Cronograma

- **10 de maio de 2026**: Primeira entrega (relatório + protótipo)
- **25 de maio de 2026**: 60% dos requisitos implementados
- **10 de junho de 2026**: 100% dos requisitos implementados

## 📚 Como Usar Esta Documentação

1. **Para Desenvolvedores**: Comece pela [Arquitetura de Sistema](./arquitetura/02-arquitetura-sistema.md) e depois consulte as seções específicas de Backend, Frontend ou Mobile.

2. **Para Designers**: Consulte a seção de [Design](./design/01-design-system.md) para entender o sistema de design e componentes visuais.

3. **Para Gestores de Projeto**: Revise os [Requisitos](./requisitos/03-requisitos-funcionais.md) e o [Plano de Sprints](./sprints/00-metodologia.md).

4. **Para Testers**: Consulte a [Estratégia de Testes](./testes/01-estrategia-testes.md) e os casos de teste específicos.

## 🔗 Links Úteis

- [Repositório GitHub](https://github.com/seu-usuario/eha-project)
- [Protótipo Figma](https://figma.com/...)
- [Board Trello/Jira](https://trello.com/...)
- [Documentação da API](./api/01-endpoints.md)

## 📝 Convenções

- **Must Have (M)**: Requisito obrigatório para o MVP
- **Should Have (S)**: Requisito importante mas não crítico
- **Could Have (C)**: Requisito desejável
- **Won't Have (W)**: Não será implementado nesta versão
