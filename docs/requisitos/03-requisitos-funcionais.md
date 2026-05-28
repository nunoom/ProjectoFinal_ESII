# Requisitos Funcionais

## Convenções

**Prioridade (MoSCoW)**:
- **M** (Must Have): Obrigatório para o MVP
- **S** (Should Have): Importante mas não crítico
- **C** (Could Have): Desejável
- **W** (Won't Have): Não será implementado nesta versão

---

## Resumo Executivo

| Módulo | Requisitos | Must Have | Should Have | Could Have |
|--------|-----------|-----------|-------------|------------|
| Autenticação e Perfil | RF-01 a RF-10 | 8 | 2 | 0 |
| Exploração de Conteúdos | RF-11 a RF-20 | 7 | 2 | 1 |
| Quiz Interativo | RF-21 a RF-30 | 8 | 2 | 0 |
| Ranking | RF-31 a RF-36 | 5 | 1 | 0 |
| Fórum | RF-37 a RF-44 | 6 | 2 | 0 |
| Administração | RF-45 a RF-50 | 6 | 0 | 0 |
| **TOTAL** | **50** | **40** | **9** | **1** |

---

## 1. Módulo de Autenticação e Perfil (RF-01 a RF-10)

### RF-01 | Registo de Utilizador | M

**Descrição**: O sistema deve permitir que novos utilizadores se registem na plataforma.

**Critérios de Aceitação**:
- Utilizador pode registar-se com email e password
- Password deve ter mínimo 8 caracteres (maiúsculas, minúsculas, números)
- Email deve ser único no sistema
- Sistema envia email de confirmação
- Utilizador não pode aceder sem confirmar email
- Campos obrigatórios: nome, email, password, data de nascimento

**Regras de Negócio**: RN-01, RN-02

---

### RF-02 | Login de Utilizador | M

**Descrição**: Utilizadores registados podem fazer login.

**Critérios de Aceitação**:
- Login com email e password
- Token JWT válido por 24 horas
- Redirecionamento para dashboard
- Mensagem de erro para credenciais inválidas
- Bloqueio após 5 tentativas falhadas (15 minutos)

**Regras de Negócio**: RN-03, RN-04

---

### RF-03 | Recuperação de Password | M

**Descrição**: Utilizador pode recuperar password esquecida.

**Critérios de Aceitação**:
- Link de recuperação enviado por email
- Token válido por 1 hora
- Redefinição de password com confirmação
- Invalidação de token após uso

---

### RF-04 | Logout | M

**Descrição**: Utilizador pode terminar sessão.

**Critérios de Aceitação**:
- Invalidação de token JWT
- Redirecionamento para página de login
- Limpeza de dados locais

---

### RF-05 | Visualizar Perfil | M

**Descrição**: Utilizador pode ver seu perfil.

**Critérios de Aceitação**:
- Exibição de: nome, email, foto, pontos, nível, estatísticas
- Histórico de quizzes realizados
- Conquistas e badges

---

### RF-06 | Editar Perfil | M

**Descrição**: Utilizador pode editar informações do perfil.

**Critérios de Aceitação**:
- Edição de: nome, foto, bio
- Email não pode ser alterado
- Validação de dados

---

### RF-07 | Alterar Password | M

**Descrição**: Utilizador pode alterar password.

**Critérios de Aceitação**:
- Requer password atual
- Nova password deve seguir política de segurança
- Confirmação de nova password

---

### RF-08 | Upload de Foto de Perfil | M

**Descrição**: Utilizador pode fazer upload de foto.

**Critérios de Aceitação**:
- Formatos aceites: JPG, PNG
- Tamanho máximo: 5MB
- Redimensionamento automático para 200x200px

---

### RF-09 | Eliminar Conta | S

**Descrição**: Utilizador pode eliminar sua conta.

**Critérios de Aceitação**:
- Confirmação obrigatória
- Eliminação de todos os dados pessoais
- Manutenção de posts no fórum (anonimizados)

---

### RF-10 | Notificações de Perfil | S

**Descrição**: Utilizador recebe notificações sobre atividades.

**Critérios de Aceitação**:
- Notificações de: novos badges, subida de nível, respostas no fórum
- Configuração de preferências de notificação

---

## 2. Módulo de Exploração de Conteúdos (RF-11 a RF-20)

### RF-11 | Listar Conteúdos | M

**Descrição**: Sistema exibe lista de conteúdos disponíveis.

**Critérios de Aceitação**:
- Listagem paginada (20 itens por página)
- Exibição de: título, resumo, imagem, categoria, data
- Ordenação por: mais recente, mais popular, alfabética

---

### RF-12 | Visualizar Conteúdo | M

**Descrição**: Utilizador pode visualizar conteúdo completo.

**Critérios de Aceitação**:
- Exibição de: título, texto completo, imagens, vídeos
- Tempo estimado de leitura
- Contador de visualizações
- Botão de partilha

---

### RF-13 | Pesquisar Conteúdos | M

**Descrição**: Utilizador pode pesquisar conteúdos.

**Critérios de Aceitação**:
- Pesquisa por palavra-chave
- Busca em: título, resumo, conteúdo
- Resultados relevantes ordenados

---

### RF-14 | Filtrar por Categoria | M

**Descrição**: Utilizador pode filtrar conteúdos por categoria.

**Critérios de Aceitação**:
- Categorias: Petróleo, Kwanza, Guerra Civil, Reformas, Agricultura, etc.
- Múltiplas categorias selecionáveis
- Contador de conteúdos por categoria

---

### RF-15 | Marcar como Favorito | M

**Descrição**: Utilizador pode marcar conteúdos como favoritos.

**Critérios de Aceitação**:
- Botão de favoritar visível
- Lista de favoritos no perfil
- Remoção de favoritos

---

### RF-16 | Download para Offline | M

**Descrição**: Utilizador pode baixar conteúdos para acesso offline.

**Critérios de Aceitação**:
- Download de texto e imagens
- Indicador de conteúdo baixado
- Gestão de conteúdos offline
- Sincronização ao conectar

---

### RF-17 | Histórico de Leitura | M

**Descrição**: Sistema mantém histórico de conteúdos lidos.

**Critérios de Aceitação**:
- Registro automático de leitura
- Visualização de histórico no perfil
- Indicador de "já lido" nos conteúdos

---

### RF-18 | Recomendar Conteúdos | S

**Descrição**: Sistema recomenda conteúdos baseado em histórico.

**Critérios de Aceitação**:
- Recomendações na página inicial
- Baseado em: leitura anterior, quizzes realizados, categoria preferida

---

### RF-19 | Partilhar Conteúdo | S

**Descrição**: Utilizador pode partilhar conteúdos.

**Critérios de Aceitação**:
- Partilha via: WhatsApp, Facebook, link direto
- Geração de link único

---

### RF-20 | Avaliar Conteúdo | C

**Descrição**: Utilizador pode avaliar conteúdos.

**Critérios de Aceitação**:
- Sistema de 5 estrelas
- Comentário opcional
- Média de avaliações visível

---

## 3. Módulo de Quiz Interativo (RF-21 a RF-30)

### RF-21 | Listar Quizzes Disponíveis | M

**Descrição**: Sistema exibe quizzes disponíveis.

**Critérios de Aceitação**:
- Listagem por categoria
- Exibição de: título, dificuldade, nº questões, pontos
- Indicador de quizzes já realizados

---

### RF-22 | Iniciar Quiz | M

**Descrição**: Utilizador pode iniciar um quiz.

**Critérios de Aceitação**:
- Exibição de instruções
- Timer visível (se aplicável)
- Questões exibidas uma de cada vez

---

### RF-23 | Responder Questões | M

**Descrição**: Utilizador responde questões do quiz.

**Critérios de Aceitação**:
- Tipos de questão: múltipla escolha, verdadeiro/falso
- Seleção de resposta obrigatória
- Botão "Próxima" e "Anterior"

---

### RF-24 | Submeter Quiz | M

**Descrição**: Utilizador submete quiz completo.

**Critérios de Aceitação**:
- Confirmação antes de submeter
- Cálculo automático de pontuação
- Impossibilidade de refazer imediatamente

---

### RF-25 | Ver Resultado do Quiz | M

**Descrição**: Sistema exibe resultado após submissão.

**Critérios de Aceitação**:
- Pontuação obtida e máxima
- Percentagem de acerto
- Respostas corretas e incorretas
- Explicações das respostas

---

### RF-26 | Histórico de Quizzes | M

**Descrição**: Utilizador pode ver histórico de quizzes.

**Critérios de Aceitação**:
- Lista de quizzes realizados
- Pontuação de cada tentativa
- Data de realização

---

### RF-27 | Refazer Quiz | M

**Descrição**: Utilizador pode refazer quiz após 24 horas.

**Critérios de Aceitação**:
- Bloqueio de 24 horas após primeira tentativa
- Questões podem ser diferentes
- Melhor pontuação é mantida

---

### RF-28 | Quiz Offline | M

**Descrição**: Utilizador pode fazer quiz offline.

**Critérios de Aceitação**:
- Download de quiz completo
- Submissão ao reconectar
- Sincronização de pontuação

---

### RF-29 | Dificuldade Adaptativa | S

**Descrição**: Sistema ajusta dificuldade baseado em desempenho.

**Critérios de Aceitação**:
- Análise de taxa de acerto
- Sugestão de quizzes apropriados

---

### RF-30 | Quiz Cronometrado | S

**Descrição**: Alguns quizzes têm limite de tempo.

**Critérios de Aceitação**:
- Timer visível
- Submissão automática ao fim do tempo
- Aviso aos 30 segundos finais

---

## 4. Módulo de Ranking (RF-31 a RF-36)

### RF-31 | Visualizar Ranking Global | M

**Descrição**: Sistema exibe ranking de todos os utilizadores.

**Critérios de Aceitação**:
- Top 100 utilizadores
- Exibição de: posição, nome, pontos, nível
- Atualização em tempo real

---

### RF-32 | Visualizar Ranking Semanal | M

**Descrição**: Ranking resetado semanalmente.

**Critérios de Aceitação**:
- Reset toda segunda-feira
- Prémios para top 3
- Histórico de rankings anteriores

---

### RF-33 | Visualizar Ranking por Categoria | M

**Descrição**: Rankings específicos por categoria.

**Critérios de Aceitação**:
- Ranking para cada categoria de conteúdo
- Pontos específicos da categoria

---

### RF-34 | Sistema de Pontos | M

**Descrição**: Atribuição de pontos por atividades.

**Critérios de Aceitação**:
- Quiz completo: 10-50 pontos (baseado em dificuldade)
- Leitura de conteúdo: 5 pontos
- Post no fórum: 2 pontos
- Resposta no fórum: 1 ponto

**Regras de Negócio**: RN-10, RN-11

---

### RF-35 | Sistema de Níveis | M

**Descrição**: Utilizadores sobem de nível com pontos.

**Critérios de Aceitação**:
- Níveis de 1 a 50
- Progressão exponencial
- Badges por nível alcançado

---

### RF-36 | Badges e Conquistas | S

**Descrição**: Sistema de badges por conquistas.

**Critérios de Aceitação**:
- Badges por: primeiro quiz, 10 quizzes, 100 pontos, etc.
- Exibição no perfil
- Notificação ao conquistar

---

## 5. Módulo de Fórum (RF-37 a RF-44)

### RF-37 | Listar Tópicos do Fórum | M

**Descrição**: Sistema exibe tópicos de discussão.

**Critérios de Aceitação**:
- Listagem paginada
- Ordenação por: mais recente, mais popular
- Indicador de tópicos não lidos

---

### RF-38 | Criar Tópico | M

**Descrição**: Utilizador pode criar novo tópico.

**Critérios de Aceitação**:
- Campos: título, conteúdo, categoria
- Formatação básica (negrito, itálico, lista)
- Anexo de imagens

**Regras de Negócio**: RN-13

---

### RF-39 | Visualizar Tópico | M

**Descrição**: Utilizador pode ver tópico e respostas.

**Critérios de Aceitação**:
- Exibição de post original
- Lista de respostas ordenadas
- Contador de visualizações

---

### RF-40 | Responder a Tópico | M

**Descrição**: Utilizador pode responder a tópicos.

**Critérios de Aceitação**:
- Campo de resposta com formatação
- Notificação ao autor do tópico
- Limite de 5000 caracteres

**Regras de Negócio**: RN-14

---

### RF-41 | Editar Post | M

**Descrição**: Utilizador pode editar seus posts.

**Critérios de Aceitação**:
- Edição dentro de 24 horas
- Indicador de "editado"
- Histórico de edições (admin)

---

### RF-42 | Eliminar Post | M

**Descrição**: Utilizador pode eliminar seus posts.

**Critérios de Aceitação**:
- Confirmação obrigatória
- Soft delete (mantém registro)
- Admin pode restaurar

---

### RF-43 | Reportar Post | S

**Descrição**: Utilizador pode reportar conteúdo inadequado.

**Critérios de Aceitação**:
- Motivos: spam, ofensivo, fora de tópico
- Notificação a moderadores
- Análise em até 24 horas

---

### RF-44 | Pesquisar no Fórum | S

**Descrição**: Utilizador pode pesquisar discussões.

**Critérios de Aceitação**:
- Busca em títulos e conteúdos
- Filtro por categoria e data

---

## 6. Módulo de Administração (RF-45 a RF-50)

### RF-45 | Dashboard Administrativo | M

**Descrição**: Admin acede a painel com métricas.

**Critérios de Aceitação**:
- Métricas: utilizadores ativos, quizzes realizados, posts
- Gráficos de evolução
- Alertas de moderação

---

### RF-46 | Gerir Utilizadores | M

**Descrição**: Admin pode gerir contas de utilizadores.

**Critérios de Aceitação**:
- Listar, pesquisar, filtrar utilizadores
- Bloquear/desbloquear contas
- Alterar roles (user, moderator, admin)

---

### RF-47 | Gerir Conteúdos | M

**Descrição**: Admin pode criar/editar/eliminar conteúdos.

**Critérios de Aceitação**:
- Editor WYSIWYG
- Upload de imagens e vídeos
- Agendamento de publicação
- Categorização

---

### RF-48 | Gerir Quizzes | M

**Descrição**: Admin pode criar/editar quizzes.

**Critérios de Aceitação**:
- Criação de questões
- Definição de respostas corretas
- Atribuição de pontos
- Definição de dificuldade

---

### RF-49 | Moderar Fórum | M

**Descrição**: Admin pode moderar discussões.

**Critérios de Aceitação**:
- Ver posts reportados
- Eliminar posts inadequados
- Banir utilizadores
- Fechar tópicos

---

### RF-50 | Relatórios e Estatísticas | M

**Descrição**: Admin pode gerar relatórios.

**Critérios de Aceitação**:
- Relatórios de: utilizadores, conteúdos, quizzes, fórum
- Exportação em PDF e Excel
- Filtros por período

---

## Rastreabilidade

| Requisito | Caso de Uso | Regra de Negócio | Sprint |
|-----------|-------------|------------------|--------|
| RF-01 a RF-10 | UC-01, UC-02 | RN-01 a RN-04 | Sprint 2 |
| RF-11 a RF-20 | UC-03 | RN-05 a RN-07 | Sprint 3 |
| RF-21 a RF-30 | UC-04 | RN-08 a RN-12 | Sprint 3 |
| RF-31 a RF-36 | UC-05 | RN-10, RN-11 | Sprint 4 |
| RF-37 a RF-44 | UC-06 | RN-13 a RN-15 | Sprint 4 |
| RF-45 a RF-50 | UC-07 | Todas | Sprint 2-4 |


## Resumo de Implementação por Sprint

### Sprint 2: Autenticação (RF-01 a RF-10)
- Implementar backend de autenticação
- Criar telas de login/registo
- Configurar JWT
- Testes unitários

### Sprint 3: Conteúdos e Quiz (RF-11 a RF-30)
- APIs de conteúdos e quizzes
- Interfaces de exploração
- Sistema de pontuação
- Modo offline básico

### Sprint 4: Fórum e Ranking (RF-31 a RF-44)
- APIs de fórum e ranking
- Interfaces de discussão
- Sistema de moderação
- Rankings em tempo real

### Sprint 5: Mobile (Todos os RF em mobile)
- App React Native completo
- Sincronização offline
- Notificações push

### Sprint 6: Refinamento
- Correção de bugs
- Testes de aceitação
- Performance optimization
