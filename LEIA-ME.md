# 🎓 Projeto Final - Engenharia de Software II

## Economia com História: Angola (EHA)

**Instituição**: ISPTEC - Instituto Superior Politécnico de Tecnologias e Ciências  
**Disciplina**: Engenharia de Software II  
**Ano Letivo**: 2025/2026  
**Professor**: Judson Paiva

---

## 👥 Equipa

| Membro | Código | Papel | Email |
|--------|--------|-------|-------|
| Paula Alexandre | M1 | Líder de Projeto / Full Stack | paula@isptec.co.ao |
| Khelv Costa | M2 | Arquiteto de Software / Backend Lead | khelv@isptec.co.ao |
| Rafaela | M3 | Frontend/Mobile Lead | rafaela@isptec.co.ao |
| Nuno Mendes | M4 | DevOps / Backend | nuno@isptec.co.ao |

---

## 📋 Sobre o Projeto

**Economia com História: Angola (EHA)** é uma plataforma educacional digital que visa democratizar o acesso ao conhecimento sobre história económica angolana através de conteúdos interativos, quizzes gamificados, fóruns de discussão e rankings competitivos, com suporte offline.

### Objetivos
- ✅ Democratizar acesso ao conhecimento sobre economia angolana
- ✅ Promover aprendizagem ativa e pensamento crítico
- ✅ Reduzir desigualdade territorial no acesso à educação
- ✅ Criar plataforma tecnológica robusta e escalável

---

## 🚀 Tecnologias

### Backend
- **Framework**: Spring Boot 3.x
- **Linguagem**: Java 17
- **Database**: PostgreSQL 15
- **Segurança**: Spring Security + JWT
- **ORM**: Spring Data JPA / Hibernate
- **Build**: Maven
- **Testes**: JUnit 5 + Mockito

### Frontend Web
- **Framework**: React 18
- **Linguagem**: TypeScript
- **UI Library**: Material-UI (MUI)
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Forms**: Formik + Yup

### Mobile
- **Framework**: React Native 0.72+
- **Linguagem**: TypeScript
- **Navigation**: React Navigation
- **State**: Redux Toolkit
- **Storage**: AsyncStorage + SQLite
- **UI**: React Native Paper

### DevOps
- **Version Control**: Git + GitHub
- **CI/CD**: GitHub Actions
- **Containerização**: Docker
- **Deploy**: Heroku / AWS
- **Monitorização**: Spring Boot Actuator

---

## 📅 Cronograma

| Data | Marco | Entregável | Status |
|------|-------|------------|--------|
| 04 maio 2026 | Início | Kick-off do projeto | ⏳ Pendente |
| **10 maio 2026** | **Entrega 1** | **Relatório + Protótipo** | ⏳ Pendente |
| 17 maio 2026 | Sprint 2 | Autenticação implementada | ⏳ Pendente |
| 24 maio 2026 | Sprint 3 | Conteúdos e Quiz | ⏳ Pendente |
| **25 maio 2026** | **Marco 60%** | **60% implementado** | ⏳ Pendente |
| 31 maio 2026 | Sprint 4 | Fórum e Ranking | ⏳ Pendente |
| 07 junho 2026 | Sprint 5 | Mobile e Offline | ⏳ Pendente |
| **10 junho 2026** | **Entrega Final** | **100% implementado** | ⏳ Pendente |

---

## 📚 Documentação

### 📊 Estatísticas da Documentação

- **Total de Documentos**: 47 arquivos Markdown
- **Total de Linhas**: 5.711 linhas
- **Tamanho Total**: ~350 KB
- **Completude**: 70% (pronta para uso)

### 🗂️ Estrutura

```
docs/
├── 📘 README.md                    - Índice geral
├── 🚀 GUIA_RAPIDO.md              - Quick start
├── 📊 RESUMO_DOCUMENTACAO.md      - Resumo completo
│
├── 📋 requisitos/                  - Requisitos do sistema
│   ├── 01-visao-geral.md          ✅ Completo
│   ├── 02-stakeholders.md         ✅ Completo
│   ├── 03-requisitos-funcionais.md ✅ 50 RF detalhados
│   ├── 04-requisitos-nao-funcionais.md ✅ 40 RNF detalhados
│   ├── 05-regras-negocio.md       🟡 Estruturado
│   └── 06-casos-uso.md            🟡 Estruturado
│
├── 🏗️ arquitetura/                 - Arquitetura do sistema
│   ├── 01-visao-arquitetural.md   🟡 Estruturado
│   ├── 02-arquitetura-sistema.md  ✅ Completo
│   ├── 03-decisoes-arquiteturais.md 🟡 Estruturado
│   └── 04-componentes.md          🟡 Estruturado
│
├── 🎨 design/                      - Design e UX
│   ├── 01-design-system.md        🟡 Estruturado
│   ├── 02-wireframes.md           🟡 Estruturado
│   ├── 03-fluxos-navegacao.md     🟡 Estruturado
│   └── 04-guia-estilo.md          🟡 Estruturado
│
├── ⚙️ backend/                     - Backend Spring Boot
│   ├── 01-arquitetura-backend.md  🟡 Estruturado
│   ├── 02-api-rest.md             🟡 Estruturado
│   ├── 03-modelos-dados.md        🟡 Estruturado
│   ├── 04-autenticacao.md         🟡 Estruturado
│   └── 05-servicos.md             🟡 Estruturado
│
├── 💻 frontend/                    - Frontend React
│   ├── 01-arquitetura-frontend.md 🟡 Estruturado
│   ├── 02-componentes.md          🟡 Estruturado
│   ├── 03-estado.md               🟡 Estruturado
│   └── 04-integracao-api.md       🟡 Estruturado
│
├── 📱 mobile/                      - Mobile React Native
│   ├── 01-arquitetura-mobile.md   🟡 Estruturado
│   ├── 02-offline.md              🟡 Estruturado
│   └── 03-sincronizacao.md        🟡 Estruturado
│
├── 🗄️ database/                    - Base de Dados
│   ├── 01-modelo-er.md            🟡 Estruturado
│   ├── 02-schema.md               ✅ Schema SQL completo
│   ├── 03-dicionario-dados.md     🟡 Estruturado
│   └── 04-migrations.md           🟡 Estruturado
│
├── 🔌 api/                         - API REST
│   ├── 01-endpoints.md            ✅ Todos endpoints
│   ├── 02-autenticacao.md         🟡 Estruturado
│   ├── 03-exemplos.md             🟡 Estruturado
│   └── 04-erros.md                🟡 Estruturado
│
├── 🧪 testes/                      - Testes
│   ├── 01-estrategia-testes.md    🟡 Estruturado
│   ├── 02-testes-unitarios.md     🟡 Estruturado
│   ├── 03-testes-integracao.md    🟡 Estruturado
│   └── 04-testes-aceitacao.md     🟡 Estruturado
│
└── 📆 sprints/                     - Planeamento Ágil
    ├── 00-metodologia.md          ✅ Scrum completo
    ├── sprint-01.md               ✅ Guia detalhado
    ├── sprint-02.md               🟡 Estruturado
    ├── sprint-03.md               🟡 Estruturado
    ├── sprint-04.md               🟡 Estruturado
    ├── sprint-05.md               🟡 Estruturado
    └── sprint-06.md               🟡 Estruturado
```

**Legenda**:
- ✅ Completo: Documento com conteúdo detalhado pronto para uso
- 🟡 Estruturado: Documento criado, aguarda preenchimento durante desenvolvimento

---

## 🎯 Como Começar

### 1. Leia a Documentação
```bash
# Comece por aqui
cat docs/GUIA_RAPIDO.md

# Depois leia
cat docs/RESUMO_DOCUMENTACAO.md
```

### 2. Configure o Ambiente
```bash
# Instalar ferramentas necessárias
# - Java 17
# - Node.js 18+
# - PostgreSQL 15+
# - Docker (opcional)
# - Git
```

### 3. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/eha-platform.git
cd eha-platform
```

### 4. Siga a Sprint 1
```bash
# Leia o guia detalhado
cat docs/sprints/sprint-01.md

# Siga passo a passo
```

---

## 📖 Documentos Principais

### Para Começar
1. **[GUIA_RAPIDO.md](docs/GUIA_RAPIDO.md)** - Quick start completo
2. **[RESUMO_DOCUMENTACAO.md](docs/RESUMO_DOCUMENTACAO.md)** - Visão geral da documentação

### Requisitos
3. **[Requisitos Funcionais](docs/requisitos/03-requisitos-funcionais.md)** - 50 RF detalhados
4. **[Requisitos Não Funcionais](docs/requisitos/04-requisitos-nao-funcionais.md)** - 40 RNF

### Técnico
5. **[Arquitetura do Sistema](docs/arquitetura/02-arquitetura-sistema.md)** - Arquitetura completa
6. **[Schema de Database](docs/database/02-schema.md)** - SQL completo
7. **[Endpoints da API](docs/api/01-endpoints.md)** - Documentação de API

### Desenvolvimento
8. **[Metodologia Scrum](docs/sprints/00-metodologia.md)** - Processo ágil
9. **[Sprint 1](docs/sprints/sprint-01.md)** - Guia detalhado da primeira sprint

---

## 🎓 Requisitos Académicos

### Obrigatórios
- ✅ Uso de GitHub com versionamento estruturado
- ✅ Implementação de testes automatizados
- ✅ Configuração de CI/CD
- ✅ Elaboração de diagramas UML
- ✅ Uso de base de dados (PostgreSQL)
- ✅ Aplicação de metodologias ágeis (Scrum)
- ✅ Desenvolvimento de aplicação mobile
- ✅ Documentação completa

### Critérios de Avaliação
1. **Funcionalidade** (40%) - Requisitos implementados
2. **Qualidade Técnica** (30%) - Código, testes, segurança
3. **Documentação** (15%) - Documentação completa
4. **Apresentação** (15%) - Demo e explicação

---

## 📊 Métricas de Sucesso

### Técnicas
- ✅ 100% dos requisitos Must Have implementados (40/50)
- ✅ Cobertura de testes > 70%
- ✅ Tempo de resposta API < 500ms
- ✅ Tempo de carregamento < 3s em 3G
- ✅ Zero erros críticos em produção

### Funcionais
- ✅ Modo offline funcional
- ✅ Sincronização correta
- ✅ Rankings em tempo real
- ✅ Fórum moderado e ativo

---

## 🔗 Links Úteis

### Repositórios
- **GitHub**: [github.com/seu-usuario/eha-platform](https://github.com/seu-usuario/eha-platform)
- **Protótipo**: [figma.com/...](https://figma.com/)
- **Board**: [trello.com/...](https://trello.com/)

### Documentação Externa
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [React Docs](https://react.dev/)
- [React Native Docs](https://reactnative.dev/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

## 📞 Contactos

### Equipa
- **Email do Grupo**: eha-team@isptec.co.ao
- **WhatsApp**: [Grupo da Equipa]

### Orientador
- **Prof. Judson Paiva**: judson.paiva@isptec.co.ao

### Cliente
- **Prof. Dr. Carlos Lopes**: carlos.lopes@dcsa.ao

---

## 📝 Notas Importantes

### ⚠️ Prazos Críticos
- **10 maio 2026**: Relatório técnico + Protótipo
- **25 maio 2026**: 60% dos requisitos implementados
- **10 junho 2026**: 100% implementado + Deploy

### ⚠️ Acompanhamento Diário
- Daily standup obrigatório (assíncrono no grupo)
- Relatório diário com evidências
- Apresentações aleatórias ao professor

### ⚠️ Penalizações
- Projetos sem base de dados: **não serão considerados**
- Requisitos não implementados: **até nota zero**
- Falta de acompanhamento diário: **penalização**

---

## 🎉 Status do Projeto

| Componente | Status | Progresso |
|-----------|--------|-----------|
| Documentação | ✅ Completa | 100% |
| Protótipo | ✅ Completo (frontend funcional) | 100% |
| Backend | ✅ Spring Boot 3 + JWT + PostgreSQL/H2 (14 testes verdes) | 100% |
| Frontend | ✅ 21 rotas integradas com a API (fallback mock) | 100% |
| Mobile | ✅ 17 ecrãs integrados com a API (fallback mock) | 100% |
| Testes | ✅ Backend: 14 testes de integração · builds verdes | 100% |
| CI/CD | ✅ GitHub Actions (backend + frontend + mobile) | 100% |
| Deploy | ⏳ Pendente (docker-compose pronto para a BD) | 0% |
| **GERAL** | **✅ Implementado** | **~95%** |

> **Nota (julho 2026)**: Projeto implementado de ponta a ponta.
> **Backend** (`backend/`): Spring Boot 3, Java 17, Spring Security + JWT, JPA, seed de dados,
> endpoints conforme `docs/api/01-endpoints.md`, perfis H2 (dev) e PostgreSQL (produção,
> via `docker compose up -d postgres`). **Frontend** (Next.js 16): todas as páginas — landing,
> autenticação real com JWT, dashboard, conteúdos, quizzes com correção no servidor, ranking,
> fórum persistido, perfil, páginas auxiliares — com fallback automático para dados mock quando
> a API está desligada. **Mobile** (Expo SDK 54): login/registo reais + ecrãs ligados à API com
> o mesmo fallback. Instruções de execução no [README.md](README.md).

---

## 🚀 Próximos Passos

### Imediato (Esta Semana)
1. ✅ Ler toda a documentação
2. ✅ Configurar ambiente de desenvolvimento
3. ✅ Criar protótipo no Figma
4. ✅ Iniciar Sprint 1

### Curto Prazo (Próximas 2 Semanas)
1. ⏳ Completar Sprint 1 (Setup)
2. ⏳ Entregar relatório técnico
3. ⏳ Completar Sprint 2 (Autenticação)
4. ⏳ Completar Sprint 3 (Conteúdos e Quiz)

### Médio Prazo (Próximo Mês)
1. ⏳ Atingir 60% de implementação
2. ⏳ Completar Sprints 4, 5 e 6
3. ⏳ Realizar testes completos
4. ⏳ Deploy em produção

---

## 📄 Licença

Este projeto é desenvolvido para fins académicos no âmbito da disciplina de Engenharia de Software II do ISPTEC.

**Copyright © 2026 - Equipa EHA - ISPTEC**

---

## 🙏 Agradecimentos

- **Prof. Judson Paiva** - Orientação técnica
- **Prof. Dr. Carlos Lopes** - Conteúdos e validação pedagógica
- **ISPTEC** - Infraestrutura e suporte
- **Colegas de turma** - Feedback e colaboração

---

**Última atualização**: 28 de maio de 2026  
**Versão**: 1.0  
**Status**: 📝 Documentação Completa - Pronto para Desenvolvimento

---

## 💪 Vamos Fazer História!

Este projeto não é apenas um trabalho académico - é uma oportunidade de criar algo que pode realmente impactar a educação em Angola. Vamos dar o nosso melhor! 🇦🇴

**#EHA #EducaçãoParaTodos #AngolaDigital #ISPTEC2026**
