'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, Eye, Plus, Search, X } from 'lucide-react';
import { categories } from '@/lib/categories';
import { fetchForumTopics, createTopicApi, ApiError } from '@/lib/api';
import { useApi } from '@/lib/useApiData';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { PageLoading, PageError } from '@/components/ui/Status';
import { formatDate, formatNumber } from '@/lib/utils';

export default function ForumPage() {
  const { data: topics, loading, error, retry } = useApi(fetchForumTopics);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showNewTopic, setShowNewTopic] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState(categories[0].name);
  const [formError, setFormError] = useState('');

  if (loading) return <PageLoading />;
  if (error || !topics) return <PageError message={error ?? 'Erro ao carregar'} onRetry={retry} />;

  const filteredTopics = topics.filter((topic) => {
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateTopic = async () => {
    if (newTitle.trim().length < 5) {
      setFormError('O título deve ter pelo menos 5 caracteres');
      return;
    }
    if (newDescription.trim().length < 10) {
      setFormError('A descrição deve ter pelo menos 10 caracteres');
      return;
    }

    try {
      // O tópico é persistido no backend e a lista recarregada
      await createTopicApi(newTitle.trim(), newDescription.trim(), newCategory);
    } catch (err) {
      setFormError(
        err instanceof ApiError
          ? err.message
          : 'Não foi possível ligar ao servidor. Verifique se o backend está a correr.'
      );
      return;
    }

    setShowNewTopic(false);
    setNewTitle('');
    setNewDescription('');
    setNewCategory(categories[0].name);
    setFormError('');
    retry();
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fórum de Discussão</h1>
          <p className="text-gray-600 mt-2">
            Participe em discussões sobre a história económica de Angola
          </p>
        </div>
        <Button variant="primary" className="gap-2" onClick={() => setShowNewTopic(true)}>
          <Plus className="w-4 h-4" />
          Novo Tópico
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Pesquisar tópicos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#8B0000] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todas
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.name
                    ? 'bg-[#8B0000] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Topics List */}
      {filteredTopics.length > 0 ? (
        <div className="space-y-4">
          {filteredTopics.map((topic) => (
            <Link key={topic.id} href={`/forum/${topic.id}`} className="block">
              <Card className="hover:border-[#8B0000] hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={topic.author.photoUrl}
                      alt={topic.author.name}
                      className="h-12 w-12 rounded-full shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="rounded-full bg-[#8B0000] px-2 py-0.5 text-xs font-medium text-white">
                          {topic.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          por {topic.author.name} • {formatDate(topic.createdAt)}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{topic.title}</h3>
                      {topic.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">{topic.description}</p>
                      )}
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-2 text-sm text-gray-500 shrink-0">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{topic.replyCount} respostas</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{formatNumber(topic.views)} visualizações</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <MessageSquare className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum tópico encontrado</h3>
            <p className="text-gray-600 mb-6">Seja o primeiro a iniciar uma discussão!</p>
            <Button variant="primary" onClick={() => setShowNewTopic(true)}>
              Criar Tópico
            </Button>
          </CardContent>
        </Card>
      )}

      {/* New Topic Modal */}
      {showNewTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="max-w-lg w-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Novo Tópico</h3>
                <button
                  onClick={() => setShowNewTopic(false)}
                  className="rounded-lg p-1 hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ex: Qual o futuro do setor diamantífero?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent bg-white"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                  <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Descreva o tema que quer discutir..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent resize-none"
                  />
                </div>

                {formError && <p className="text-sm text-red-600">{formError}</p>}

                <div className="flex gap-3 justify-end">
                  <Button variant="outline" onClick={() => setShowNewTopic(false)}>
                    Cancelar
                  </Button>
                  <Button variant="primary" onClick={handleCreateTopic}>
                    Publicar Tópico
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
