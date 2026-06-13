'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, Eye, Clock, Plus, Search, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { mockForumTopics, categories } from '@/data/mockData';
import { formatDate } from '@/lib/utils';

export default function ForumPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const filtered = mockForumTopics
    .filter(topic => {
      const matchesSearch =
        topic.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || topic.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.lastReplyAt).getTime() - new Date(a.lastReplyAt).getTime();
      }
      if (sortBy === 'popular') return b.views - a.views;
      if (sortBy === 'replies') return b.replyCount - a.replyCount;
      return 0;
    });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Fórum</h1>
          <p className="text-gray-600">Discuta e partilhe conhecimentos sobre economia angolana</p>
        </div>
        <Button variant="primary">
          <Plus className="mr-2 h-4 w-4" />
          Novo Tópico
        </Button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-[#8B0000]" />
            <div>
              <p className="text-xl font-bold text-gray-900">{mockForumTopics.length}</p>
              <p className="text-xs text-gray-500">Tópicos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-xl font-bold text-gray-900">
                {mockForumTopics.reduce((s, t) => s + t.replyCount, 0)}
              </p>
              <p className="text-xs text-gray-500">Respostas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Eye className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-xl font-bold text-gray-900">
                {mockForumTopics.reduce((s, t) => s + t.views, 0)}
              </p>
              <p className="text-xs text-gray-500">Visualizações</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar tópicos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000]"
        >
          <option value="all">Todas as categorias</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000]"
        >
          <option value="recent">Mais recentes</option>
          <option value="popular">Mais vistos</option>
          <option value="replies">Mais respostas</option>
        </select>
      </div>

      {/* Topics list */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-base text-gray-600 font-medium">
            {filtered.length} tópico(s) encontrado(s)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {filtered.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filtered.map(topic => (
                <Link
                  key={topic.id}
                  href={`/forum/${topic.id}`}
                  className="flex items-start gap-4 py-5 hover:bg-gray-50 -mx-6 px-6 transition-colors first:rounded-t-xl last:rounded-b-xl"
                >
                  {/* Avatar */}
                  <img
                    src={topic.author.photoUrl}
                    alt={topic.author.name}
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-block px-2 py-0.5 text-xs font-medium text-white bg-[#8B0000] rounded-full mb-1.5">
                          {topic.category}
                        </span>
                        <h3 className="font-semibold text-gray-900 hover:text-[#8B0000] transition-colors leading-snug">
                          {topic.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          por <span className="font-medium">{topic.author.name}</span>
                          {' · '}
                          {formatDate(topic.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3.5 w-3.5" />
                        {topic.replyCount} respostas
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        {topic.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        Última: {formatDate(topic.lastReplyAt)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Nenhum tópico encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
