# Stakeholders e Utilizadores

## 1. Stakeholders do Projeto

### 1.1 Stakeholder Primário

#### Professor Doutor Carlos Lopes (Cliente/Especialista de Domínio)
- **Papel**: Fornecedor de conteúdos e validador pedagógico
- **Responsabilidades**:
  - Fornecer conteúdos sobre história económica angolana
  - Validar a qualidade e precisão dos conteúdos
  - Aprovar a abordagem pedagógica
- **Interesse**: Democratização do conhecimento sobre economia angolana
- **Influência**: Alta
- **Envolvimento**: Consultas periódicas e validação de conteúdos

### 1.2 Stakeholder Académico

#### Professor Judson Paiva (Orientador/Avaliador)
- **Papel**: Orientador técnico e avaliador do projeto
- **Responsabilidades**:
  - Orientar a equipa em boas práticas de Engenharia de Software
  - Avaliar o progresso e qualidade técnica
  - Validar cumprimento de requisitos académicos
- **Interesse**: Desenvolvimento de competências técnicas dos estudantes
- **Influência**: Alta
- **Envolvimento**: Acompanhamento diário e apresentações semanais

### 1.3 Equipa de Desenvolvimento

#### Estudantes de Engenharia Informática - ISPTEC
- **Membros**:
  - Paula Alexandre (M1) - Líder de Projeto
  - Khelv Costa (M2) - Arquiteto de Software
  - Rafaela (M3) - Desenvolvedora Frontend/Mobile
  - Nuno Mendes (M4) - Desenvolvedor Backend
- **Responsabilidades**:
  - Análise de requisitos
  - Design e arquitetura
  - Implementação
  - Testes
  - Documentação
  - Deploy
- **Interesse**: Aprendizagem e aprovação na disciplina
- **Influência**: Alta
- **Envolvimento**: Tempo integral

### 1.4 Stakeholders Secundários

#### Instituição de Ensino (ISPTEC)
- **Papel**: Instituição académica
- **Interesse**: Qualidade do ensino e reputação
- **Influência**: Média
- **Envolvimento**: Indireto

#### Ministério da Educação de Angola (Potencial)
- **Papel**: Potencial adotante da plataforma
- **Interesse**: Melhoria da educação nacional
- **Influência**: Baixa (nesta fase)
- **Envolvimento**: Futuro

## 2. Perfis de Utilizador

### 2.1 Utilizador Estudante

#### Características Demográficas
- **Idade**: 14+ anos
- **Escolaridade**: Ensino secundário ou superior
- **Localização**: Todas as províncias de Angola (foco em áreas urbanas e periurbanas)
- **Idioma**: Português angolano

#### Características Tecnológicas
- **Dispositivo primário**: Smartphone Android de gama média
- **Dispositivos secundários**: Tablet, computador (quando disponível)
- **Conectividade**: Irregular (3G/4G intermitente)
- **Literacia digital**: Média (familiarizado com redes sociais e apps básicas)

#### Objetivos e Necessidades
- **Objetivos**:
  - Aprender sobre história económica angolana
  - Testar conhecimentos através de quizzes
  - Debater temas económicos
  - Competir no ranking
  - Obter certificação/reconhecimento
- **Necessidades**:
  - Interface simplificada e intuitiva
  - Conteúdos em português angolano
  - Modo offline funcional
  - Feedback imediato em quizzes
  - Gamificação motivadora
  - Acesso gratuito a conteúdos básicos

#### Comportamento Esperado
- **Frequência de uso**: 3-5 vezes por semana
- **Duração de sessão**: 15-30 minutos
- **Horário preferencial**: Tarde/noite (após aulas)
- **Funcionalidades mais usadas**: Quizzes, ranking, conteúdos

#### Frustrações Potenciais
- Lentidão da aplicação
- Perda de progresso por falta de conexão
- Conteúdos muito complexos ou descontextualizados
- Interface confusa
- Falta de feedback

### 2.2 Utilizador Professor/Educador

#### Características Demográficas
- **Idade**: 28+ anos
- **Escolaridade**: Superior (Licenciatura ou Mestrado)
- **Localização**: Principalmente centros urbanos
- **Idioma**: Português angolano

#### Características Tecnológicas
- **Dispositivo primário**: Computador ou laptop
- **Dispositivos secundários**: Smartphone, tablet
- **Conectividade**: Mais estável que estudantes
- **Literacia digital**: Média a alta

#### Objetivos e Necessidades
- **Objetivos**:
  - Acompanhar progresso dos alunos
  - Partilhar recursos educacionais
  - Recomendar conteúdos
  - Moderar discussões
  - Identificar dificuldades de aprendizagem
- **Necessidades**:
  - Painel de acompanhamento de turma (fase futura)
  - Relatórios de desempenho
  - Ferramentas de moderação
  - Criação de conteúdos personalizados (fase futura)

#### Comportamento Esperado
- **Frequência de uso**: Diária (durante período letivo)
- **Duração de sessão**: 30-60 minutos
- **Horário preferencial**: Horário laboral
- **Funcionalidades mais usadas**: Acompanhamento, moderação

### 2.3 Utilizador Administrador

#### Características Demográficas
- **Idade**: 25+ anos
- **Escolaridade**: Superior (Engenharia Informática ou áreas afins)
- **Localização**: Qualquer
- **Idioma**: Português

#### Características Tecnológicas
- **Dispositivo primário**: Computador/laptop
- **Conectividade**: Estável
- **Literacia digital**: Alta
- **Conhecimentos técnicos**: Avançados

#### Objetivos e Necessidades
- **Objetivos**:
  - Gerir conteúdos da plataforma
  - Administrar utilizadores
  - Moderar fóruns
  - Monitorizar sistema
  - Gerar relatórios
  - Configurar plataforma
- **Necessidades**:
  - Painel administrativo completo
  - Ferramentas de moderação eficientes
  - Sistema de logs e auditoria
  - Controlo total sobre conteúdos
  - Gestão de permissões

#### Comportamento Esperado
- **Frequência de uso**: Diária
- **Duração de sessão**: Variável (1-4 horas)
- **Horário preferencial**: Horário laboral
- **Funcionalidades mais usadas**: Gestão de conteúdos, moderação, estatísticas

### 2.4 Utilizador Moderador (Futuro)

#### Características
- **Papel**: Moderação de fóruns e validação de conteúdos
- **Perfil**: Professor ou especialista em história económica
- **Responsabilidades**:
  - Moderar discussões
  - Validar contribuições de utilizadores
  - Responder a dúvidas
  - Reportar problemas

## 3. Matriz de Priorização de Utilizadores

| Tipo de Utilizador | Prioridade | Fase de Implementação | Impacto no Sucesso |
|-------------------|------------|----------------------|-------------------|
| Estudante | Alta | MVP (Sprint 1-6) | Crítico |
| Administrador | Alta | MVP (Sprint 1-6) | Crítico |
| Professor/Educador | Média | Fase 2 (pós-MVP) | Alto |
| Moderador | Baixa | Fase 3 (futuro) | Médio |

## 4. Personas Detalhadas

### Persona 1: João - O Estudante Curioso

**Perfil**
- **Idade**: 17 anos
- **Localização**: Huambo
- **Escolaridade**: 12º ano
- **Dispositivo**: Samsung Galaxy A12
- **Conectividade**: 3G intermitente

**História**
João estuda no ensino secundário em Huambo e tem interesse em economia. Quer entender melhor a história económica de Angola para decidir se segue Economia na universidade. Tem acesso limitado à internet e precisa baixar conteúdos para estudar offline.

**Objetivos**
- Aprender sobre história económica angolana
- Preparar-se para exames
- Competir com colegas no ranking

**Frustrações**
- Internet lenta e cara
- Falta de materiais didáticos acessíveis
- Conteúdos descontextualizados

**Como a EHA ajuda**
- Modo offline para estudar sem internet
- Conteúdos contextualizados para Angola
- Quizzes para testar conhecimentos
- Gamificação para motivar aprendizagem

### Persona 2: Maria - A Professora Dedicada

**Perfil**
- **Idade**: 35 anos
- **Localização**: Luanda
- **Escolaridade**: Mestrado em Economia
- **Dispositivo**: Laptop + smartphone
- **Conectividade**: Boa

**História**
Maria é professora de História e Economia numa escola secundária em Luanda. Procura recursos digitais para complementar as aulas e motivar os alunos. Quer acompanhar o progresso dos estudantes e identificar dificuldades.

**Objetivos**
- Complementar aulas com recursos digitais
- Acompanhar progresso dos alunos
- Promover debate e pensamento crítico

**Frustrações**
- Falta de recursos digitais angolanos
- Dificuldade em motivar alunos
- Falta de ferramentas de acompanhamento

**Como a EHA ajuda**
- Conteúdos prontos e contextualizados
- Fórum para promover debate
- Relatórios de progresso (fase futura)

### Persona 3: Carlos - O Administrador Técnico

**Perfil**
- **Idade**: 28 anos
- **Localização**: Luanda
- **Escolaridade**: Engenharia Informática
- **Dispositivo**: Laptop
- **Conectividade**: Excelente

**História**
Carlos é engenheiro de software responsável pela gestão técnica da plataforma EHA. Precisa de ferramentas eficientes para gerir conteúdos, moderar fóruns e monitorizar o sistema.

**Objetivos**
- Gerir conteúdos eficientemente
- Moderar fóruns rapidamente
- Monitorizar saúde do sistema
- Gerar relatórios para stakeholders

**Frustrações**
- Interfaces administrativas complexas
- Falta de automação
- Dificuldade em gerar relatórios

**Como a EHA ajuda**
- Painel administrativo intuitivo
- Ferramentas de moderação eficientes
- Dashboard com métricas em tempo real
- Exportação de relatórios

## 5. Jornada do Utilizador

### 5.1 Jornada do Estudante

1. **Descoberta**: Conhece a EHA através da escola ou redes sociais
2. **Registo**: Cria conta com email ou redes sociais
3. **Onboarding**: Tutorial rápido sobre funcionalidades
4. **Exploração**: Navega por conteúdos e tópicos
5. **Aprendizagem**: Lê artigos, vê vídeos
6. **Avaliação**: Realiza quizzes
7. **Competição**: Verifica posição no ranking
8. **Discussão**: Participa em fóruns
9. **Retenção**: Recebe notificações e volta regularmente

### 5.2 Jornada do Administrador

1. **Acesso**: Login no painel administrativo
2. **Dashboard**: Visualiza métricas principais
3. **Gestão de Conteúdos**: Cria/edita artigos e quizzes
4. **Moderação**: Revisa posts do fórum
5. **Gestão de Utilizadores**: Administra contas
6. **Relatórios**: Gera e exporta relatórios
7. **Configuração**: Ajusta parâmetros do sistema

## 6. Requisitos por Perfil de Utilizador

### Estudante
- RF-01 a RF-10: Autenticação e perfil
- RF-11 a RF-20: Exploração de conteúdos
- RF-21 a RF-30: Quiz interativo
- RF-31 a RF-36: Ranking
- RF-37 a RF-44: Fórum

### Administrador
- RF-45 a RF-50: Administração
- Todos os requisitos de gestão de conteúdos
- Ferramentas de moderação
- Relatórios e estatísticas

### Professor (Fase Futura)
- Painel de acompanhamento de turma
- Relatórios de desempenho de alunos
- Criação de conteúdos personalizados
