# Casos de Uso

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
