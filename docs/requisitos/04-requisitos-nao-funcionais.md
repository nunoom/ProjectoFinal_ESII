# Requisitos Não Funcionais

## 1. Desempenho (RNF-01 a RNF-05)

### RNF-01 | Tempo de Resposta da API
**Descrição**: APIs devem responder rapidamente

**Critérios**:
- Endpoints simples (GET): < 200ms
- Endpoints complexos (POST/PUT): < 500ms
- Queries de database: < 100ms
- 95% das requisições dentro do limite

**Medição**: Testes de performance com JMeter

---

### RNF-02 | Tempo de Carregamento Frontend
**Descrição**: Páginas devem carregar rapidamente

**Critérios**:
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Performance Score: > 90

**Medição**: Google Lighthouse

---

### RNF-03 | Tempo de Carregamento Mobile
**Descrição**: App mobile deve ser responsivo

**Critérios**:
- Abertura do app: < 2s
- Navegação entre telas: < 300ms
- Carregamento de listas: < 1s

---

### RNF-04 | Capacidade de Usuários Simultâneos
**Descrição**: Sistema deve suportar múltiplos utilizadores

**Critérios**:
- Mínimo 100 utilizadores simultâneos
- Degradação graceful acima de 100
- Sem crashes até 200 utilizadores

---

### RNF-05 | Tamanho de Dados
**Descrição**: Otimização de transferência de dados

**Critérios**:
- Payload de API: < 100KB por requisição
- Imagens otimizadas: < 200KB
- Paginação obrigatória para listas

---

## 2. Disponibilidade e Fiabilidade (RNF-06 a RNF-10)

### RNF-06 | Disponibilidade do Sistema
**Descrição**: Sistema deve estar disponível

**Critérios**:
- Uptime: 99% (permite 7h downtime/mês)
- Manutenção programada fora de horário de pico

---

### RNF-07 | Recuperação de Falhas
**Descrição**: Sistema deve recuperar de falhas

**Critérios**:
- Recovery Time Objective (RTO): < 1h
- Recovery Point Objective (RPO): < 15min
- Backups automáticos diários

---

### RNF-08 | Tratamento de Erros
**Descrição**: Erros devem ser tratados gracefully

**Critérios**:
- Mensagens de erro user-friendly
- Logs detalhados para debugging
- Sem exposição de stack traces ao utilizador

---

### RNF-09 | Tolerância a Falhas
**Descrição**: Sistema deve continuar funcionando parcialmente

**Critérios**:
- Modo offline funcional
- Degradação graceful de funcionalidades
- Retry automático de requisições falhadas

---

### RNF-10 | Integridade de Dados
**Descrição**: Dados devem ser consistentes

**Critérios**:
- Transações ACID no database
- Validação de dados no backend
- Sincronização correta offline-online

---

## 3. Segurança (RNF-11 a RNF-18)

### RNF-11 | Autenticação Segura
**Descrição**: Autenticação robusta

**Critérios**:
- JWT com expiração
- Refresh tokens
- Logout invalida tokens

---

### RNF-12 | Criptografia de Passwords
**Descrição**: Passwords armazenadas com segurança

**Critérios**:
- BCrypt com strength 12
- Salt único por password
- Nunca retornar password em APIs

---

### RNF-13 | HTTPS Obrigatório
**Descrição**: Comunicação encriptada

**Critérios**:
- HTTPS em produção
- Redirect automático HTTP → HTTPS
- Certificado SSL válido

---

### RNF-14 | Proteção contra Ataques
**Descrição**: Mitigação de vulnerabilidades comuns

**Critérios**:
- SQL Injection: Uso de JPA/prepared statements
- XSS: Sanitização de inputs
- CSRF: Tokens CSRF
- Rate limiting: Max 100 req/min por IP

---

### RNF-15 | Autorização
**Descrição**: Controlo de acesso baseado em roles

**Critérios**:
- RBAC implementado
- Validação de permissões no backend
- Princípio do menor privilégio

---

### RNF-16 | Auditoria
**Descrição**: Rastreamento de ações

**Critérios**:
- Logs de ações sensíveis
- Timestamp e user ID em logs
- Retenção de logs por 90 dias

---

### RNF-17 | Privacidade de Dados
**Descrição**: Proteção de dados pessoais

**Critérios**:
- Dados pessoais encriptados
- Direito ao esquecimento (GDPR-like)
- Consentimento para uso de dados

---

### RNF-18 | Validação de Inputs
**Descrição**: Validação rigorosa de dados

**Critérios**:
- Validação no frontend e backend
- Sanitização de HTML
- Limites de tamanho de campos

---

## 4. Usabilidade (RNF-19 a RNF-24)

### RNF-19 | Interface Intuitiva
**Descrição**: Interface fácil de usar

**Critérios**:
- Navegação sem formação prévia
- Máximo 3 cliques para qualquer funcionalidade
- Feedback visual para ações

---

### RNF-20 | Responsividade
**Descrição**: Interface adaptável

**Critérios**:
- Funcional em desktop, tablet, mobile
- Breakpoints: 320px, 768px, 1024px, 1440px
- Touch-friendly em mobile

---

### RNF-21 | Acessibilidade
**Descrição**: Acessível a todos

**Critérios**:
- Contraste de cores adequado (WCAG AA)
- Navegação por teclado
- Alt text em imagens
- Tamanho de fonte ajustável

---

### RNF-22 | Internacionalização
**Descrição**: Suporte a português angolano

**Critérios**:
- Textos em português de Angola
- Formato de data: DD/MM/AAAA
- Moeda: Kwanza (Kz)

---

### RNF-23 | Feedback ao Utilizador
**Descrição**: Comunicação clara

**Critérios**:
- Loading indicators
- Mensagens de sucesso/erro
- Confirmações para ações destrutivas
- Progress bars para processos longos

---

### RNF-24 | Ajuda e Documentação
**Descrição**: Suporte ao utilizador

**Critérios**:
- FAQ disponível
- Tooltips em funcionalidades complexas
- Tutorial de onboarding
- Suporte por email

---

## 5. Manutenibilidade (RNF-25 a RNF-30)

### RNF-25 | Código Limpo
**Descrição**: Código legível e manutenível

**Critérios**:
- Seguir convenções de nomenclatura
- Funções pequenas e focadas
- Comentários em código complexo
- DRY (Don't Repeat Yourself)

---

### RNF-26 | Testes Automatizados
**Descrição**: Cobertura de testes adequada

**Critérios**:
- Cobertura de código: > 70%
- Testes unitários para lógica de negócio
- Testes de integração para APIs
- Testes E2E para fluxos críticos

---

### RNF-27 | Documentação de Código
**Descrição**: Código bem documentado

**Critérios**:
- JavaDoc/TSDoc para funções públicas
- README em cada módulo
- Diagramas de arquitetura atualizados

---

### RNF-28 | Versionamento
**Descrição**: Controlo de versões adequado

**Critérios**:
- Git Flow seguido
- Commits semânticos
- Tags para releases
- Changelog mantido

---

### RNF-29 | Modularidade
**Descrição**: Código modular e desacoplado

**Critérios**:
- Separação de responsabilidades
- Baixo acoplamento
- Alta coesão
- Dependency Injection

---

### RNF-30 | Logs e Monitorização
**Descrição**: Observabilidade do sistema

**Critérios**:
- Logs estruturados
- Níveis de log apropriados
- Métricas de performance
- Health checks

---

## 6. Escalabilidade (RNF-31 a RNF-35)

### RNF-31 | Escalabilidade Horizontal
**Descrição**: Capacidade de adicionar instâncias

**Critérios**:
- Backend stateless
- Sessões em cache distribuído
- Load balancing configurado

---

### RNF-32 | Otimização de Database
**Descrição**: Database performante

**Critérios**:
- Índices em colunas frequentes
- Queries otimizadas
- Connection pooling
- Paginação obrigatória

---

### RNF-33 | Caching
**Descrição**: Cache para reduzir carga

**Critérios**:
- Cache de conteúdos estáticos
- Cache de sessões
- TTL apropriado
- Invalidação de cache

---

### RNF-34 | CDN para Assets
**Descrição**: Distribuição de conteúdo estático

**Critérios**:
- Imagens servidas via CDN
- Assets minificados
- Compressão gzip/brotli

---

### RNF-35 | Crescimento de Dados
**Descrição**: Suporte a crescimento

**Critérios**:
- Arquivamento de dados antigos
- Particionamento de tabelas grandes
- Estratégia de backup escalável

---

## 7. Compatibilidade (RNF-36 a RNF-40)

### RNF-36 | Browsers Suportados
**Descrição**: Compatibilidade com browsers

**Critérios**:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

### RNF-37 | Dispositivos Móveis
**Descrição**: Suporte a dispositivos

**Critérios**:
- Android 8.0+
- iOS 13+ (futuro)
- Tablets

---

### RNF-38 | Conectividade
**Descrição**: Funcionar com conexão limitada

**Critérios**:
- Funcional em 3G
- Modo offline robusto
- Sincronização automática

---

### RNF-39 | Tamanho do App
**Descrição**: App mobile leve

**Critérios**:
- APK: < 50MB
- Download inicial: < 20MB

---

### RNF-40 | APIs RESTful
**Descrição**: APIs padronizadas

**Critérios**:
- REST principles seguidos
- JSON como formato
- Versionamento de API
- Documentação OpenAPI/Swagger

---

## Matriz de Rastreabilidade

| RNF | Categoria | Prioridade | Verificação |
|-----|-----------|------------|-------------|
| RNF-01 a RNF-05 | Desempenho | Alta | Testes de performance |
| RNF-06 a RNF-10 | Disponibilidade | Alta | Monitorização |
| RNF-11 a RNF-18 | Segurança | Crítica | Testes de segurança |
| RNF-19 a RNF-24 | Usabilidade | Alta | Testes de usabilidade |
| RNF-25 a RNF-30 | Manutenibilidade | Média | Code review |
| RNF-31 a RNF-35 | Escalabilidade | Média | Testes de carga |
| RNF-36 a RNF-40 | Compatibilidade | Alta | Testes cross-browser |
