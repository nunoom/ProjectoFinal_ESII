# Regras de Negócio

## 1. Regras de Autenticação (RN-01 a RN-04)

### RN-01: Validação de Email
- Email deve ser único no sistema
- Formato válido conforme RFC 5322
- Domínios bloqueados: emails temporários não permitidos

### RN-02: Política de Password
- Mínimo 8 caracteres
- Pelo menos 1 maiúscula
- Pelo menos 1 minúscula
- Pelo menos 1 número
- Caracteres especiais recomendados

### RN-03: Confirmação de Email
- Utilizador deve confirmar email antes de aceder
- Token de confirmação válido por 24 horas
- Reenvio de email permitido após 5 minutos

### RN-04: Bloqueio de Conta
- Após 5 tentativas falhadas de login
- Bloqueio por 15 minutos
- Admin pode desbloquear manualmente

## 2. Regras de Conteúdos (RN-05 a RN-07)

### RN-05: Publicação de Conteúdo
- Apenas ADMIN pode criar/editar conteúdos
- Conteúdo deve ter categoria obrigatória
- Imagem de capa obrigatória
- Tempo de leitura calculado automaticamente (250 palavras/min)

### RN-06: Visualização de Conteúdo
- Contador de visualizações incrementado por sessão única
- Histórico de leitura registado para utilizadores autenticados
- Conteúdos arquivados não aparecem em listagens

### RN-07: Favoritos
- Utilizador pode ter até 100 favoritos
- Remoção automática se conteúdo for eliminado

## 3. Regras de Quiz (RN-08 a RN-12)

### RN-08: Realização de Quiz
- Utilizador deve estar autenticado
- Quiz só pode ser submetido uma vez por tentativa
- Respostas não podem ser alteradas após submissão

### RN-09: Pontuação de Quiz
- Pontos baseados em dificuldade:
  - EASY: 10 pontos
  - MEDIUM: 25 pontos
  - HARD: 50 pontos
- Pontuação proporcional a acertos
- Bónus de 20% se completar em menos de 50% do tempo

### RN-10: Refazer Quiz
- Permitido após 24 horas da última tentativa
- Melhor pontuação é mantida
- Histórico completo preservado

### RN-11: Sistema de Pontos
- Quiz completo: pontos baseados em dificuldade
- Leitura de conteúdo: 5 pontos (uma vez por conteúdo)
- Post no fórum: 2 pontos
- Resposta no fórum: 1 ponto
- Pontos não podem ser negativos

### RN-12: Sistema de Níveis
- Nível 1: 0-99 pontos
- Nível 2: 100-249 pontos
- Nível 3: 250-499 pontos
- Progressão exponencial até nível 50
- Fórmula: pontos_necessários = 100 * (nível ^ 1.5)

## 4. Regras de Fórum (RN-13 a RN-15)

### RN-13: Criação de Tópico
- Título: mínimo 10, máximo 200 caracteres
- Conteúdo: mínimo 20, máximo 10.000 caracteres
- Categoria obrigatória
- Máximo 5 tópicos por dia por utilizador

### RN-14: Respostas
- Conteúdo: mínimo 10, máximo 5.000 caracteres
- Máximo 20 respostas por dia por utilizador
- Não pode responder a tópicos bloqueados

### RN-15: Moderação
- MODERATOR e ADMIN podem eliminar posts
- Posts eliminados são soft delete
- Utilizador banido não pode criar posts
- 3 denúncias aprovadas = ban automático de 7 dias

## 5. Regras de Ranking (RN-16 a RN-18)

### RN-16: Ranking Global
- Atualizado em tempo real
- Top 100 utilizadores visíveis
- Baseado em pontos totais

### RN-17: Ranking Semanal
- Reset toda segunda-feira às 00:00
- Top 3 recebem badges especiais
- Histórico mantido por 1 ano

### RN-18: Ranking por Categoria
- Separado por categoria de conteúdo
- Pontos apenas de quizzes da categoria
- Atualizado após cada quiz

## 6. Regras de Badges (RN-19 a RN-20)

### RN-19: Conquista de Badges
- Verificação automática após cada ação
- Notificação imediata ao conquistar
- Badges não podem ser removidos

### RN-20: Tipos de Badges
- Progresso: baseado em quantidade (10 quizzes, 100 pontos)
- Conquista: ações específicas (primeiro quiz perfeito)
- Especiais: eventos temporários

## 7. Regras de Administração (RN-21 a RN-23)

### RN-21: Permissões de ADMIN
- Acesso total a todas as funcionalidades
- Pode alterar role de utilizadores
- Pode eliminar qualquer conteúdo
- Ações registadas em audit log

### RN-22: Permissões de MODERATOR
- Pode moderar fórum
- Pode eliminar posts inadequados
- Pode banir utilizadores (máximo 30 dias)
- Não pode alterar conteúdos educacionais

### RN-23: Auditoria
- Todas as ações de ADMIN/MODERATOR são registadas
- Logs mantidos por 1 ano
- Incluem: IP, timestamp, ação, dados alterados
