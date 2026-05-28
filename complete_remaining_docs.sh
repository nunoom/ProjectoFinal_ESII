#!/bin/bash

# Script para completar todos os documentos restantes

echo "🚀 Completando documentação do projeto EHA..."
echo "=============================================="

# Contador
total=0
completed=0

# Função para criar documento
create_doc() {
    local file=$1
    local title=$2
    local content=$3
    
    echo "# $title

$content
" > "$file"
    
    ((completed++))
    echo "✅ $file"
}

# Navegar para diretório docs
cd docs

echo ""
echo "📝 Completando documentos..."
echo ""

# Aqui vamos criar os documentos via Python
python3 << 'PYTHON_SCRIPT'
import os

docs_content = {
    "requisitos/05-regras-negocio.md": """# Regras de Negócio

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
""",

    "requisitos/06-casos-uso.md": """# Casos de Uso

## UC-01: Autenticar Utilizador

**Ator Principal**: Utilizador  
**Pré-condições**: Utilizador tem conta registada e confirmada  
**Pós-condições**: Utilizador autenticado com sessão ativa

### Fluxo Principal
1. Utilizador acede à página de login
2. Sistema exibe formulário de login
3. Utilizador insere email e password
4. Sistema valida credenciais
5. Sistema gera token JWT
6. Sistema redireciona para dashboard
7. Caso de uso termina

### Fluxos Alternativos

**3a. Credenciais inválidas**
1. Sistema exibe mensagem de erro
2. Sistema incrementa contador de tentativas
3. Retorna ao passo 2

**3b. Conta bloqueada**
1. Sistema exibe mensagem informando bloqueio
2. Sistema informa tempo restante
3. Caso de uso termina

**3c. Email não confirmado**
1. Sistema exibe mensagem solicitando confirmação
2. Sistema oferece opção de reenviar email
3. Caso de uso termina

---

## UC-02: Realizar Quiz

**Ator Principal**: Estudante  
**Pré-condições**: Utilizador autenticado  
**Pós-condições**: Quiz submetido e pontuação registada

### Fluxo Principal
1. Utilizador navega para lista de quizzes
2. Sistema exibe quizzes disponíveis
3. Utilizador seleciona um quiz
4. Sistema exibe instruções e inicia quiz
5. Sistema exibe primeira questão
6. Utilizador seleciona resposta
7. Utilizador avança para próxima questão
8. Repete passos 6-7 até última questão
9. Utilizador submete quiz
10. Sistema calcula pontuação
11. Sistema atualiza pontos do utilizador
12. Sistema atualiza ranking
13. Sistema exibe resultado detalhado
14. Caso de uso termina

### Fluxos Alternativos

**6a. Utilizador volta para questão anterior**
1. Sistema exibe questão anterior
2. Utilizador pode alterar resposta
3. Retorna ao passo 6

**9a. Tempo esgotado (quiz cronometrado)**
1. Sistema submete automaticamente
2. Continua no passo 10

**10a. Já realizou quiz nas últimas 24h**
1. Sistema exibe mensagem informando restrição
2. Sistema exibe tempo restante
3. Caso de uso termina

---

## UC-03: Participar no Fórum

**Ator Principal**: Utilizador  
**Pré-condições**: Utilizador autenticado  
**Pós-condições**: Tópico ou resposta criado

### Fluxo Principal - Criar Tópico
1. Utilizador acede ao fórum
2. Sistema exibe lista de tópicos
3. Utilizador clica em "Novo Tópico"
4. Sistema exibe formulário
5. Utilizador preenche título, conteúdo e categoria
6. Utilizador submete formulário
7. Sistema valida dados
8. Sistema cria tópico
9. Sistema atribui 2 pontos ao utilizador
10. Sistema exibe tópico criado
11. Caso de uso termina

### Fluxo Alternativo - Responder Tópico
1. Utilizador acede ao fórum
2. Sistema exibe lista de tópicos
3. Utilizador seleciona tópico
4. Sistema exibe tópico e respostas
5. Utilizador clica em "Responder"
6. Sistema exibe formulário de resposta
7. Utilizador escreve resposta
8. Utilizador submete resposta
9. Sistema valida dados
10. Sistema cria resposta
11. Sistema atribui 1 ponto ao utilizador
12. Sistema notifica autor do tópico
13. Sistema exibe resposta criada
14. Caso de uso termina

---

## UC-04: Gerir Conteúdos (Admin)

**Ator Principal**: Administrador  
**Pré-condições**: Utilizador autenticado como ADMIN  
**Pós-condições**: Conteúdo criado/editado/eliminado

### Fluxo Principal - Criar Conteúdo
1. Admin acede ao painel administrativo
2. Sistema exibe dashboard
3. Admin clica em "Novo Conteúdo"
4. Sistema exibe formulário
5. Admin preenche título, conteúdo, categoria, imagem
6. Admin submete formulário
7. Sistema valida dados
8. Sistema cria conteúdo
9. Sistema regista ação em audit log
10. Sistema exibe mensagem de sucesso
11. Caso de uso termina

---

## UC-05: Visualizar Ranking

**Ator Principal**: Utilizador  
**Pré-condições**: Nenhuma  
**Pós-condições**: Ranking exibido

### Fluxo Principal
1. Utilizador acede à página de ranking
2. Sistema exibe ranking global (top 100)
3. Sistema destaca posição do utilizador (se autenticado)
4. Utilizador pode filtrar por categoria
5. Sistema exibe ranking da categoria selecionada
6. Caso de uso termina

---

## Matriz de Rastreabilidade

| Caso de Uso | Requisitos Funcionais | Prioridade |
|-------------|----------------------|------------|
| UC-01 | RF-01, RF-02, RF-03, RF-04 | Must Have |
| UC-02 | RF-21 a RF-30 | Must Have |
| UC-03 | RF-37 a RF-44 | Must Have |
| UC-04 | RF-45 a RF-50 | Must Have |
| UC-05 | RF-31 a RF-36 | Must Have |
""",
}

# Criar todos os documentos
for file_path, content in docs_content.items():
    full_path = file_path
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ {file_path}")

print(f"\n✅ {len(docs_content)} documentos completados!")

PYTHON_SCRIPT

echo ""
echo "=============================================="
echo "✅ Documentação completada com sucesso!"
echo "📊 Total de documentos criados: $completed"
