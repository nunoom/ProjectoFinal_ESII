# Metodologia Ágil - Projeto EHA

## 1. Metodologia Escolhida: Scrum Adaptado

### 1.1 Por que Scrum?

O projeto EHA adota **Scrum** como metodologia ágil principal, com adaptações para o contexto académico:

✅ **Vantagens**:
- Entregas incrementais e funcionais
- Feedback contínuo
- Adaptação a mudanças
- Transparência no progresso
- Trabalho em equipa estruturado

### 1.2 Adaptações para Contexto Académico

- **Sprints de 1 semana** (ao invés de 2-4 semanas)
- **Daily standups assíncronos** (via grupo WhatsApp/Telegram)
- **Sprint review com professor** (apresentações semanais)
- **Retrospectiva simplificada** (15 minutos ao fim de cada sprint)

## 2. Estrutura do Projeto

### 2.1 Timeline Geral

| Marco | Data | Entregável |
|-------|------|------------|
| Kick-off | 04 maio 2026 | Planeamento inicial |
| Sprint 1 | 04-10 maio | Setup + Protótipo |
| **Entrega 1** | **10 maio 2026** | **Relatório + Protótipo** |
| Sprint 2 | 11-17 maio | Autenticação + Base |
| Sprint 3 | 18-24 maio | Conteúdos + Quiz |
| **Marco 60%** | **25 maio 2026** | **60% implementado** |
| Sprint 4 | 25-31 maio | Fórum + Ranking |
| Sprint 5 | 01-07 junho | Mobile + Offline |
| Sprint 6 | 08-10 junho | Testes + Deploy |
| **Entrega Final** | **10 junho 2026** | **100% implementado** |

### 2.2 Distribuição de Sprints

```
Sprint 1: Setup e Fundações (1 semana)
├── Configuração de ambiente
├── Estrutura de projeto
├── CI/CD básico
└── Protótipo refinado

Sprint 2: Autenticação e Perfis (1 semana)
├── Backend: Auth API
├── Frontend: Login/Registo
├── Database: Users table
└── Testes unitários

Sprint 3: Conteúdos e Quiz (1 semana)
├── Backend: Content + Quiz API
├── Frontend: Exploração + Quiz
├── Database: Contents + Quizzes
└── Testes de integração

Sprint 4: Fórum e Ranking (1 semana)
├── Backend: Forum + Ranking API
├── Frontend: Fórum + Leaderboard
├── Database: Forum + Rankings
└── Testes E2E

Sprint 5: Mobile e Offline (1 semana)
├── React Native app
├── Funcionalidade offline
├── Sincronização
└── Testes mobile

Sprint 6: Testes e Deploy (3 dias)
├── Testes de aceitação
├── Correção de bugs
├── Deploy produção
└── Documentação final
```

## 3. Papéis da Equipa

### 3.1 Scrum Master (Rotativo)

**Responsabilidades**:
- Facilitar cerimónias Scrum
- Remover impedimentos
- Garantir seguimento da metodologia
- Reportar progresso ao professor

**Rotação**: Cada membro é Scrum Master por 1-2 sprints

### 3.2 Product Owner

**Papel**: Professor Judson Paiva (orientador)

**Responsabilidades**:
- Validar requisitos
- Priorizar backlog
- Aceitar entregas
- Fornecer feedback

### 3.3 Development Team

**Membros**:
- Paula Alexandre (M1) - Full Stack
- Khelv Costa (M2) - Backend Lead
- Rafaela (M3) - Frontend/Mobile Lead
- Nuno Mendes (M4) - DevOps/Backend

**Responsabilidades**:
- Desenvolvimento
- Testes
- Code review
- Documentação

## 4. Cerimónias Scrum

### 4.1 Sprint Planning (Domingo, 2h)

**Objetivo**: Planear trabalho da sprint

**Agenda**:
1. Review do backlog (30min)
2. Seleção de user stories (30min)
3. Decomposição em tasks (45min)
4. Estimativa de esforço (15min)

**Artefactos**:
- Sprint backlog definido
- Tasks atribuídas
- Definition of Done acordada

### 4.2 Daily Standup (Assíncrono, 10min)

**Formato**: Mensagem no grupo às 9h

**Estrutura**:
```
📅 Daily Standup - [Data]
👤 [Nome]

✅ Ontem: [O que fiz]
🎯 Hoje: [O que vou fazer]
🚧 Bloqueios: [Impedimentos]
```

**Exemplo**:
```
📅 Daily Standup - 12/05/2026
👤 Nuno Mendes

✅ Ontem:
- Implementei API de autenticação
- Configurei JWT no Spring Security

🎯 Hoje:
- Criar endpoints de perfil de utilizador
- Escrever testes unitários para AuthService

🚧 Bloqueios:
- Nenhum
```

### 4.3 Sprint Review (Sábado, 1h)

**Objetivo**: Demonstrar trabalho concluído

**Agenda**:
1. Demo de funcionalidades (30min)
2. Feedback do professor (20min)
3. Atualização do backlog (10min)

**Participantes**:
- Toda a equipa
- Professor Judson (quando possível)

### 4.4 Sprint Retrospective (Sábado, 30min)

**Objetivo**: Melhorar processo

**Formato**: Start-Stop-Continue

**Perguntas**:
- O que correu bem?
- O que correu mal?
- O que devemos melhorar?

**Artefactos**:
- Action items para próxima sprint

## 5. Gestão de Backlog

### 5.1 Product Backlog

**Ferramenta**: GitHub Projects / Trello

**Estrutura**:
```
Product Backlog
├── Epic 1: Autenticação
│   ├── User Story 1.1: Registo
│   ├── User Story 1.2: Login
│   └── User Story 1.3: Recuperação de password
├── Epic 2: Conteúdos
│   ├── User Story 2.1: Listar conteúdos
│   ├── User Story 2.2: Ver conteúdo
│   └── User Story 2.3: Pesquisar
└── ...
```

### 5.2 User Story Format

```
Como [tipo de utilizador]
Quero [ação/funcionalidade]
Para [benefício/objetivo]

Critérios de Aceitação:
- [ ] Critério 1
- [ ] Critério 2
- [ ] Critério 3

Estimativa: [pontos de história]
Prioridade: [Alta/Média/Baixa]
Sprint: [número]
```

**Exemplo**:
```
Como estudante
Quero fazer login na plataforma
Para aceder aos conteúdos educacionais

Critérios de Aceitação:
- [ ] Posso fazer login com email e password
- [ ] Recebo mensagem de erro se credenciais inválidas
- [ ] Sou redirecionado para dashboard após login
- [ ] Token JWT é armazenado localmente

Estimativa: 5 pontos
Prioridade: Alta
Sprint: 2
```

### 5.3 Estimativa de Esforço

**Técnica**: Planning Poker com Fibonacci

**Escala**:
- 1 ponto: Muito simples (< 2h)
- 2 pontos: Simples (2-4h)
- 3 pontos: Médio (4-8h)
- 5 pontos: Complexo (1-2 dias)
- 8 pontos: Muito complexo (2-3 dias)
- 13 pontos: Épico (precisa ser dividido)

## 6. Definition of Done (DoD)

Uma user story está "Done" quando:

✅ **Código**:
- [ ] Código implementado e funcional
- [ ] Code review aprovado por pelo menos 1 membro
- [ ] Sem code smells críticos
- [ ] Comentários em código complexo

✅ **Testes**:
- [ ] Testes unitários escritos e passando
- [ ] Cobertura de código > 70%
- [ ] Testes de integração (quando aplicável)
- [ ] Testado manualmente

✅ **Documentação**:
- [ ] README atualizado (se necessário)
- [ ] API documentada (Swagger)
- [ ] Comentários em código

✅ **Integração**:
- [ ] Código merged na branch develop
- [ ] CI/CD pipeline passando
- [ ] Deploy em staging bem-sucedido

✅ **Aceitação**:
- [ ] Todos os critérios de aceitação cumpridos
- [ ] Demo aprovada pelo Product Owner
- [ ] Sem bugs críticos

## 7. Workflow Git

### 7.1 Branching Strategy: Git Flow Simplificado

```
main (produção)
  │
  ├── develop (desenvolvimento)
  │     │
  │     ├── feature/auth-login
  │     ├── feature/content-list
  │     ├── feature/quiz-submit
  │     │
  │     ├── bugfix/login-error
  │     └── hotfix/security-patch
  │
  └── release/v1.0.0
```

### 7.2 Convenções de Commit

**Formato**: `<type>(<scope>): <subject>`

**Types**:
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Tarefas de manutenção

**Exemplos**:
```
feat(auth): implement JWT authentication
fix(quiz): correct score calculation
docs(api): update endpoint documentation
test(user): add unit tests for UserService
```

### 7.3 Pull Request Process

1. **Criar branch** a partir de `develop`
2. **Implementar** funcionalidade
3. **Commit** com mensagens claras
4. **Push** para repositório remoto
5. **Criar PR** com descrição detalhada
6. **Code review** por pelo menos 1 membro
7. **Corrigir** feedback (se houver)
8. **Merge** após aprovação

**Template de PR**:
```markdown
## Descrição
[Descrição clara da mudança]

## Tipo de mudança
- [ ] Nova funcionalidade
- [ ] Correção de bug
- [ ] Refatoração
- [ ] Documentação

## Checklist
- [ ] Código testado localmente
- [ ] Testes unitários adicionados
- [ ] Documentação atualizada
- [ ] CI/CD passando

## Screenshots (se aplicável)
[Imagens da funcionalidade]
```

## 8. Ferramentas

### 8.1 Gestão de Projeto

- **GitHub Projects**: Kanban board
- **Trello** (alternativa): Gestão visual
- **Google Sheets**: Tracking de horas

### 8.2 Comunicação

- **WhatsApp/Telegram**: Daily standups
- **Discord/Slack**: Discussões técnicas
- **Google Meet**: Sprint planning e reviews

### 8.3 Desenvolvimento

- **VS Code**: IDE principal
- **IntelliJ IDEA**: Backend (opcional)
- **Postman**: Testes de API
- **DBeaver**: Gestão de BD

### 8.4 CI/CD

- **GitHub Actions**: Pipeline automático
- **Docker**: Containerização
- **Heroku/AWS**: Deploy

## 9. Métricas e Acompanhamento

### 9.1 Velocity

**Definição**: Pontos de história completados por sprint

**Objetivo**: Prever capacidade da equipa

**Tracking**:
```
Sprint 1: 20 pontos
Sprint 2: 25 pontos
Sprint 3: 30 pontos
Velocity média: 25 pontos/sprint
```

### 9.2 Burndown Chart

**Objetivo**: Visualizar progresso da sprint

**Eixos**:
- X: Dias da sprint
- Y: Pontos restantes

### 9.3 Relatório Diário (Obrigatório)

**Formato para grupo da disciplina**:
```
📊 Relatório Diário - Grupo EHA - [Data]

✅ Progresso:
- [Funcionalidade 1] - 80% concluída
- [Funcionalidade 2] - 100% concluída

📸 Evidências:
[Screenshots/GIFs da aplicação funcionando]

🔗 Links:
- Commit: [link]
- PR: [link]

👥 Equipa:
- Paula: [trabalho realizado]
- Khelv: [trabalho realizado]
- Rafaela: [trabalho realizado]
- Nuno: [trabalho realizado]
```

## 10. Gestão de Riscos

### 10.1 Riscos Identificados

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Atraso no desenvolvimento | Alta | Alto | Buffer time, priorização |
| Bugs críticos | Média | Alto | Testes automatizados, code review |
| Falta de comunicação | Média | Médio | Daily standups obrigatórios |
| Problemas técnicos | Baixa | Alto | Documentação, pair programming |
| Mudança de requisitos | Baixa | Médio | Backlog flexível, sprints curtas |

### 10.2 Plano de Contingência

**Se atrasarmos**:
1. Repriorizar backlog
2. Reduzir escopo (manter Must Have)
3. Aumentar horas de trabalho
4. Pedir ajuda ao professor

**Se houver bugs críticos**:
1. Parar desenvolvimento de novas features
2. Focar em correção
3. Aumentar cobertura de testes
4. Code review mais rigoroso

## 11. Boas Práticas

### 11.1 Código

- ✅ Seguir convenções de nomenclatura
- ✅ Escrever código limpo e legível
- ✅ Comentar código complexo
- ✅ Evitar duplicação (DRY)
- ✅ Manter funções pequenas e focadas
- ✅ Usar TypeScript para type safety

### 11.2 Testes

- ✅ Escrever testes antes ou durante desenvolvimento
- ✅ Manter cobertura > 70%
- ✅ Testar casos de erro
- ✅ Usar mocks quando necessário

### 11.3 Documentação

- ✅ Manter README atualizado
- ✅ Documentar API com Swagger
- ✅ Comentar decisões técnicas importantes
- ✅ Manter changelog atualizado

### 11.4 Comunicação

- ✅ Daily standups obrigatórios
- ✅ Comunicar bloqueios imediatamente
- ✅ Pedir ajuda quando necessário
- ✅ Partilhar conhecimento

## 12. Checklist de Sprint

### Início de Sprint
- [ ] Sprint planning realizado
- [ ] User stories selecionadas
- [ ] Tasks criadas e atribuídas
- [ ] Estimativas feitas
- [ ] DoD acordada

### Durante Sprint
- [ ] Daily standups diários
- [ ] Código commitado diariamente
- [ ] Testes escritos
- [ ] Code reviews feitos
- [ ] Relatórios diários publicados

### Fim de Sprint
- [ ] Todas as user stories concluídas (ou movidas)
- [ ] Testes passando
- [ ] Deploy em staging
- [ ] Sprint review realizada
- [ ] Retrospectiva feita
- [ ] Documentação atualizada
