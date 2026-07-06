# Frontend EHA - MVP com Next.js e Tailwind CSS

## 🚀 Projeto

Frontend web do projeto **Economia com História: Angola** usando Next.js 15, TypeScript e Tailwind CSS.

## 📦 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Ícones
- **Mock Data** - Dados de demonstração

## 🏗️ Estrutura do Projeto

```
frontend/
├── app/
│   ├── (auth)/                    # Route group - Autenticação
│   │   ├── login/
│   │   │   └── page.tsx          # Página de login
│   │   └── register/
│   │       └── page.tsx          # Página de registo
│   ├── (dashboard)/               # Route group - Dashboard (protegido)
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Dashboard principal
│   │   └── layout.tsx            # Layout com Header e Sidebar
│   ├── (public)/                  # Route group - Páginas públicas
│   │   ├── home/
│   │   │   └── page.tsx          # Landing page
│   │   └── layout.tsx            # Layout público (mínimo)
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Root redirect para /home
│   └── globals.css                # Estilos globais
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Cabeçalho com busca, notificações, perfil
│   │   └── Sidebar.tsx           # Menu lateral com navegação
│   └── ui/
│       ├── Button.tsx            # Componente de botão (4 variantes)
│       └── Card.tsx              # Componente de card
├── data/
│   └── mockData.ts               # Dados mock completos
├── types/
│   └── index.ts                  # TypeScript types
└── lib/
    └── utils.ts                  # Funções utilitárias
```

## ✨ Funcionalidades Implementadas

### 🏠 Landing Page (`/home`)
- ✅ Hero section com título e CTAs
- ✅ Seção de features (6 funcionalidades principais)
- ✅ Estatísticas da plataforma
- ✅ Grid de tópicos/categorias
- ✅ Call-to-action final
- ✅ Footer com links

### 🔐 Autenticação
**Login (`/login`)**
- ✅ Formulário com email e password
- ✅ Validação de campos
- ✅ Toggle de visibilidade da password
- ✅ Checkbox "Lembrar-me"
- ✅ Link "Esqueceu a password?"
- ✅ Botões de login social (Google, Facebook)
- ✅ Design split-screen responsivo

**Registo (`/register`)**
- ✅ Formulário completo (nome, email, password, confirmar password)
- ✅ Validação completa com mensagens de erro
- ✅ Toggle de visibilidade das passwords
- ✅ Checkbox de aceitar termos e condições
- ✅ Botões de registo social
- ✅ Design split-screen responsivo

### 📊 Dashboard (`/dashboard`)
- ✅ Hero section personalizado
- ✅ 4 cards de estatísticas:
  - Conteúdos lidos
  - Quizzes feitos
  - Pontos totais
  - Posição no ranking
- ✅ Lista de conteúdos recentes (com imagens e metadata)
- ✅ Quizzes em destaque (com badges de dificuldade)
- ✅ Top 3 do ranking
- ✅ Layout responsivo em grid

### 📚 Lista de Conteúdos (`/contents`)
- ✅ Barra de pesquisa funcional
- ✅ Filtros por categoria (chips clicáveis)
- ✅ Grid responsivo de conteúdos (1/2/3 colunas)
- ✅ Cards com imagens, título, resumo
- ✅ Badges de categoria com cores
- ✅ Metadata (tempo de leitura, visualizações)
- ✅ Contador de resultados
- ✅ Estado vazio quando não há resultados

### 📖 Detalhe de Conteúdo (`/contents/[id]`)
- ✅ Hero image com gradiente overlay
- ✅ Título e metadata (data, tempo, visualizações)
- ✅ Badge de categoria
- ✅ Resumo destacado
- ✅ Conteúdo completo formatado
- ✅ Botões de ação (Guardar, Partilhar, Marcar como Lido)
- ✅ Sidebar com conteúdos relacionados
- ✅ CTA para quizzes
- ✅ Card de progresso do utilizador

### 🎨 Componentes UI
- ✅ **Button**: 4 variantes (primary, secondary, outline, ghost)
- ✅ **Card**: Card, CardHeader, CardTitle, CardContent
- ✅ **Header**: Busca, notificações, dropdown de perfil
- ✅ **Sidebar**: Navegação completa, card de progresso
- ✅ **Utilitários**: formatDate, formatNumber, cn (classnames)

### 📦 Dados Mock
- ✅ 6 conteúdos educacionais (com imagens, categorias, views)
- ✅ 4 quizzes (com dificuldades, pontos, tempo limite)
- ✅ 6 entradas de ranking (com níveis e pontos)
- ✅ 3 tópicos de fórum (com respostas e views)
- ✅ 6 badges (com status de conquista)
- ✅ Utilizador mock (João Silva, Nível 5, 350 pontos)
- ✅ 6 categorias (com cores)

## 🎨 Design System

### Cores
- **Primary**: #8B0000 (Bordeaux)
- **Primary Dark**: #6B0000
- **Secondary**: Tons de cinzento
- **Success**: Verde
- **Warning**: Amarelo
- **Error**: Vermelho
- **Background**: #F9FAFB (Gray-50)

### Tipografia
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, tamanhos variados
- **Body**: Regular, 14-16px

### Componentes
- Cantos arredondados (lg: 0.5rem, xl: 0.75rem, 2xl: 1rem)
- Sombras no hover
- Transições suaves
- Breakpoints responsivos (sm, md, lg, xl)

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

## 🌐 Acesso

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📱 Rotas Implementadas

### Rotas Públicas
- `/` → Redireciona para `/home`
- `/home` → Landing page
- `/login` → Página de login
- `/register` → Página de registo

### Rotas Protegidas (Dashboard)
- `/dashboard` → Dashboard principal
- `/contents` → Lista de conteúdos
- `/contents/[id]` → Detalhe de conteúdo

## 📝 Páginas a Implementar

### Sprint 2-3
- [x] `/contents` - Lista completa de conteúdos ✅
- [x] `/contents/[id]` - Visualização de conteúdo individual ✅
- [ ] `/quizzes` - Lista de quizzes
- [ ] `/quizzes/[id]` - Interface para realizar quiz
- [ ] `/quizzes/[id]/result` - Resultado do quiz com feedback
- [ ] `/ranking` - Ranking completo (global, semanal, por categoria)
- [ ] `/forum` - Lista de tópicos do fórum
- [ ] `/forum/[id]` - Visualização e respostas de tópico
- [ ] `/profile` - Perfil do utilizador

### Sprint 4
- [ ] `/forgot-password` - Recuperação de password
- [ ] `/terms` - Termos e condições
- [ ] `/privacy` - Política de privacidade
- [ ] `/about` - Sobre o projeto

## 🎯 Próximos Passos

### Fase 1: Completar Páginas Core ⏳
1. ✅ Landing page
2. ✅ Login/Register
3. ✅ Dashboard
4. ✅ Lista de conteúdos
5. ✅ Detalhe de conteúdo
6. ⏳ Lista de quizzes
7. ⏳ Interface de quiz
8. ⏳ Resultado de quiz
9. ⏳ Ranking completo
10. ⏳ Fórum
11. ⏳ Perfil

### Fase 2: Integração com Backend
1. Conectar à API Spring Boot
2. Implementar autenticação JWT
3. Substituir mock data por chamadas API
4. Adicionar estados de loading
5. Adicionar tratamento de erros
6. Adicionar notificações toast

### Fase 3: State Management
1. Adicionar Context API ou Zustand
2. Gerir estado de autenticação
3. Gerir estado global da UI (modais, toasts)
4. Cache de respostas da API

### Fase 4: Formulários & Validação
1. Adicionar React Hook Form
2. Adicionar Zod para validação de schemas
3. Melhorar tratamento de erros em formulários
4. Adicionar estados de submissão

### Fase 5: Polish & Otimização
1. Adicionar loading skeletons
2. Otimizar imagens (Next.js Image component)
3. Adicionar metadata SEO
4. Melhorar acessibilidade
5. Adicionar animações (Framer Motion)
6. Otimização de performance

## 📐 Arquitetura

### Route Groups
O projeto usa **route groups** do Next.js 15 para organizar as rotas:

- `(auth)` - Páginas de autenticação (não afeta URL)
- `(dashboard)` - Páginas protegidas com layout completo
- `(public)` - Páginas públicas com layout mínimo

Cada route group pode ter seu próprio `layout.tsx`.

### Layouts
- **Root Layout** (`app/layout.tsx`): Layout base, sem Header/Sidebar
- **Dashboard Layout** (`app/(dashboard)/layout.tsx`): Com Header e Sidebar
- **Public Layout** (`app/(public)/layout.tsx`): Layout mínimo para landing page

### Fluxo de Autenticação (Mock)
1. Utilizador acede `/login` ou `/register`
2. Preenche formulário (validação client-side)
3. Mock: redireciona para `/dashboard`
4. Real: chamará API, guardará JWT, redireciona

## 🔗 Links Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

## 📝 Notas Importantes

- ✅ Todos os dados são **mock** para demonstração
- ✅ Imagens usam **Unsplash** (conteúdos) e **DiceBear** (avatares)
- ✅ Projeto pronto para integração com backend Spring Boot
- ✅ Totalmente responsivo (mobile, tablet, desktop)
- ✅ Validação de formulários implementada
- ✅ Design system consistente com cores Bordeaux
- ✅ TypeScript para type safety
- ⏳ Autenticação real será implementada na Fase 2

## 🎓 Contexto do Projeto

- **Instituição**: ISPTEC
- **Disciplina**: Engenharia de Software
- **Deadline**: 10 de junho de 2026
- **Stack Backend**: Spring Boot + PostgreSQL
- **Stack Frontend**: Next.js + Tailwind CSS
- **Stack Mobile**: React Native

---

**Criado em**: 28 de maio de 2026  
**Atualizado em**: 1 de junho de 2026  
**Status**: ✅ MVP Fase 1 Completo (Landing + Auth + Dashboard + Contents)

