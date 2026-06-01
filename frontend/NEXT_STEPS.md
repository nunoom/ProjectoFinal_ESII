# 🚀 Próximos Passos - Guia de Desenvolvimento

**Projeto**: Economia com História: Angola  
**Fase Atual**: MVP Fase 1 ✅ Completo  
**Próxima Fase**: Sprint 2 - Páginas de Conteúdos e Quizzes

---

## 📋 Roadmap Completo

### ✅ Fase 1: MVP Base (Completo)
- ✅ Landing page
- ✅ Login/Register
- ✅ Dashboard
- ✅ Componentes UI base
- ✅ Mock data
- ✅ Design system

### ⏳ Fase 2: Páginas Core (Sprint 2-3)
- ⏳ Lista de conteúdos
- ⏳ Detalhe de conteúdo
- ⏳ Lista de quizzes
- ⏳ Interface de quiz
- ⏳ Resultado de quiz
- ⏳ Ranking completo
- ⏳ Fórum
- ⏳ Perfil

### ⏳ Fase 3: Integração Backend (Sprint 4)
- ⏳ API Spring Boot
- ⏳ Autenticação JWT
- ⏳ CRUD operations
- ⏳ State management

### ⏳ Fase 4: Polish & Deploy (Sprint 5-6)
- ⏳ Otimizações
- ⏳ Testes
- ⏳ Deploy

---

## 🎯 Sprint 2: Páginas de Conteúdos

### 1. Lista de Conteúdos (`/contents`)

#### Funcionalidades
- Grid de cards de conteúdos (3 colunas desktop, 2 tablet, 1 mobile)
- Filtros:
  - Por categoria (dropdown ou tabs)
  - Por dificuldade (se aplicável)
  - Pesquisa por título
- Ordenação:
  - Mais recentes
  - Mais vistos
  - Mais populares
- Paginação ou infinite scroll
- Botão "Favoritar" em cada card

#### Estrutura do Card
```tsx
<ContentCard>
  <Image src={content.imageUrl} />
  <Badge>{content.category}</Badge>
  <Title>{content.title}</Title>
  <Summary>{content.summary}</Summary>
  <Meta>
    <ReadTime>{content.readTime} min</ReadTime>
    <Views>{content.views} views</Views>
    <Date>{content.createdAt}</Date>
  </Meta>
  <Actions>
    <Button>Ler Agora</Button>
    <IconButton>❤️ Favoritar</IconButton>
  </Actions>
</ContentCard>
```

#### Arquivo a Criar
```bash
frontend/app/(dashboard)/contents/page.tsx
```

#### Código Base
```tsx
'use client';

import { useState } from 'react';
import { mockContents, categories } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Search, Filter } from 'lucide-react';

export default function ContentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Filtrar e ordenar conteúdos
  const filteredContents = mockContents
    .filter(content => 
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || content.category === selectedCategory)
    )
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'views') return b.views - a.views;
      return 0;
    });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Conteúdos Educacionais
        </h1>
        <p className="text-gray-600">
          Explore {mockContents.length} conteúdos sobre história económica angolana
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar conteúdos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000]"
        >
          <option value="all">Todas as categorias</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000]"
        >
          <option value="recent">Mais recentes</option>
          <option value="views">Mais vistos</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredContents.map(content => (
          <Card key={content.id} className="hover:shadow-lg transition-shadow">
            <img
              src={content.imageUrl}
              alt={content.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <CardContent className="p-4">
              <span className="inline-block px-2 py-1 text-xs font-medium text-white bg-[#8B0000] rounded-full mb-2">
                {content.category}
              </span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {content.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {content.summary}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>{content.readTime} min</span>
                <span>{content.views} views</span>
              </div>
              <Button variant="primary" className="w-full">
                Ler Agora
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredContents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhum conteúdo encontrado</p>
        </div>
      )}
    </div>
  );
}
```

---

### 2. Detalhe de Conteúdo (`/contents/[id]`)

#### Funcionalidades
- Imagem hero full-width
- Título, categoria, metadata (autor, data, tempo de leitura)
- Conteúdo formatado (pode usar markdown)
- Botões de ação:
  - Favoritar
  - Compartilhar
  - Imprimir
- Barra de progresso de leitura (scroll)
- Conteúdos relacionados no final
- Comentários (opcional)

#### Arquivo a Criar
```bash
frontend/app/(dashboard)/contents/[id]/page.tsx
```

#### Código Base
```tsx
'use client';

import { useParams } from 'next/navigation';
import { mockContents } from '@/data/mockData';
import { ArrowLeft, Heart, Share2, Printer } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function ContentDetailPage() {
  const params = useParams();
  const content = mockContents.find(c => c.id === parseInt(params.id as string));

  if (!content) {
    return <div>Conteúdo não encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/contents">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="relative h-96 w-full">
        <img
          src={content.imageUrl}
          alt={content.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-[#8B0000] rounded-full mb-4">
              {content.category}
            </span>
            <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
            <div className="flex items-center gap-4 text-sm">
              <span>{content.readTime} min de leitura</span>
              <span>•</span>
              <span>{content.views} visualizações</span>
              <span>•</span>
              <span>{new Date(content.createdAt).toLocaleDateString('pt-PT')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Actions */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b">
            <Button variant="outline" size="sm">
              <Heart className="mr-2 h-4 w-4" />
              Favoritar
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Compartilhar
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
          </div>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <p className="lead text-xl text-gray-600 mb-6">
              {content.summary}
            </p>
            
            {/* Aqui você pode adicionar o conteúdo completo */}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            
            <h2>Contexto Histórico</h2>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco 
              laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            
            <h2>Impacto Económico</h2>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit 
              esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </article>

          {/* Related Contents */}
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-6">Conteúdos Relacionados</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {mockContents
                .filter(c => c.id !== content.id && c.category === content.category)
                .slice(0, 2)
                .map(related => (
                  <Link
                    key={related.id}
                    href={`/contents/${related.id}`}
                    className="flex gap-4 p-4 border rounded-lg hover:border-[#8B0000] transition-colors"
                  >
                    <img
                      src={related.imageUrl}
                      alt={related.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {related.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {related.readTime} min de leitura
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 🧠 Sprint 3: Páginas de Quizzes

### 3. Lista de Quizzes (`/quizzes`)

Similar à lista de conteúdos, mas com:
- Badges de dificuldade (Fácil, Médio, Difícil)
- Indicador de completado (✓)
- Pontos possíveis
- Número de questões
- Tempo limite

#### Arquivo a Criar
```bash
frontend/app/(dashboard)/quizzes/page.tsx
```

---

### 4. Interface de Quiz (`/quizzes/[id]`)

#### Funcionalidades
- Timer countdown (se tiver tempo limite)
- Barra de progresso (questão X de Y)
- Navegação entre questões (Anterior/Próxima)
- Seleção de resposta (radio buttons ou cards)
- Botão "Submeter Quiz" (última questão)
- Modal de confirmação antes de submeter
- Salvar progresso (localStorage)

#### Arquivo a Criar
```bash
frontend/app/(dashboard)/quizzes/[id]/page.tsx
```

---

### 5. Resultado de Quiz (`/quizzes/[id]/result`)

#### Funcionalidades
- Pontuação final (X/Y corretas)
- Pontos ganhos
- Tempo gasto
- Revisão de respostas:
  - Questão
  - Sua resposta (verde se correta, vermelha se errada)
  - Resposta correta (se errou)
  - Explicação (opcional)
- Botões:
  - Refazer Quiz
  - Ver Ranking
  - Voltar para Quizzes

#### Arquivo a Criar
```bash
frontend/app/(dashboard)/quizzes/[id]/result/page.tsx
```

---

## 🏆 Sprint 4: Outras Páginas

### 6. Ranking Completo (`/ranking`)
- Tabela completa com paginação
- Filtros: Global, Semanal, Por categoria
- Destaque do utilizador atual
- Top 3 com badges especiais

### 7. Fórum (`/forum`)
- Lista de tópicos
- Filtros por categoria
- Criar novo tópico
- Ordenação (recentes, populares)

### 8. Perfil (`/profile`)
- Informações do utilizador
- Estatísticas
- Histórico de quizzes
- Badges conquistados
- Editar perfil

---

## 🔧 Melhorias Técnicas

### State Management
```bash
npm install zustand
# ou
npm install @tanstack/react-query
```

### Formulários
```bash
npm install react-hook-form zod @hookform/resolvers
```

### Animações
```bash
npm install framer-motion
```

### Notificações
```bash
npm install react-hot-toast
# ou
npm install sonner
```

---

## 📚 Recursos Úteis

### Documentação
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)

### Inspiração de Design
- [Dribbble - Education](https://dribbble.com/tags/education)
- [Behance - E-learning](https://www.behance.net/search/projects?search=e-learning)

---

## ✅ Checklist de Desenvolvimento

### Antes de Começar Nova Página
- [ ] Definir funcionalidades
- [ ] Criar wireframe/mockup
- [ ] Identificar componentes reutilizáveis
- [ ] Preparar dados mock (se necessário)
- [ ] Definir tipos TypeScript

### Durante o Desenvolvimento
- [ ] Criar estrutura base
- [ ] Implementar layout responsivo
- [ ] Adicionar interatividade
- [ ] Testar em diferentes dispositivos
- [ ] Adicionar loading states
- [ ] Adicionar error handling

### Antes de Finalizar
- [ ] Testar todos os fluxos
- [ ] Verificar acessibilidade
- [ ] Otimizar performance
- [ ] Adicionar comentários no código
- [ ] Atualizar documentação

---

## 🚀 Como Executar

```bash
# Navegar para o frontend
cd frontend

# Instalar dependências (se ainda não instalou)
npm install

# Executar dev server
npm run dev

# Abrir no navegador
# http://localhost:3000
```

---

## 📞 Suporte

Se tiver dúvidas ou precisar de ajuda:
1. Consulte a documentação em `README.md`
2. Veja exemplos em `MVP_STATUS.md`
3. Consulte o guia visual em `VISUAL_GUIDE.md`
4. Peça ajuda ao Kiro AI

---

**Boa sorte com o desenvolvimento! 🚀**

**Criado por**: Kiro AI  
**Data**: 1 de junho de 2026  
**Versão**: 1.0.0
