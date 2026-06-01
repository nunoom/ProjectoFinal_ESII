'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Heart, Clock, Eye, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { mockContents, categories } from '@/data/mockData';
import { formatDate, formatNumber } from '@/lib/utils';

export default function ContentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Filtrar e ordenar conteúdos
  const filteredContents = mockContents
    .filter(content => {
      const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           content.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || content.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'views') {
        return b.views - a.views;
      }
      if (sortBy === 'readTime') {
        return a.readTime - b.readTime;
      }
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

      {/* Filters Bar */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar por título ou conteúdo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent"
            >
              <option value="all">Todas as categorias</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent"
            >
              <option value="recent">Mais recentes</option>
              <option value="views">Mais vistos</option>
              <option value="readTime">Tempo de leitura</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || selectedCategory !== 'all') && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">Filtros ativos:</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#8B0000] text-white text-sm rounded-full">
                Pesquisa: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm('')}
                  className="hover:bg-white/20 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#8B0000] text-white text-sm rounded-full">
                Categoria: {selectedCategory}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="hover:bg-white/20 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="text-sm text-[#8B0000] hover:underline"
            >
              Limpar todos
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          {filteredContents.length === mockContents.length
            ? `Mostrando todos os ${filteredContents.length} conteúdos`
            : `Encontrados ${filteredContents.length} de ${mockContents.length} conteúdos`}
        </p>
      </div>

      {/* Content Grid */}
      {filteredContents.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredContents.map(content => (
            <Card 
              key={content.id} 
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={content.imageUrl}
                  alt={content.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Category Badge */}
                <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium text-white bg-[#8B0000] rounded-full">
                  {content.category}
                </span>

                {/* Favorite Button */}
                <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                  <Heart className="h-4 w-4 text-gray-600 hover:text-[#8B0000]" />
                </button>
              </div>

              <CardContent className="p-5">
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#8B0000] transition-colors">
                  {content.title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {content.summary}
                </p>

                {/* Metadata */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{content.readTime} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    <span>{formatNumber(content.views)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(content.createdAt)}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Link href={`/contents/${content.id}`}>
                  <Button variant="primary" className="w-full">
                    Ler Agora
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhum conteúdo encontrado
          </h3>
          <p className="text-gray-600 mb-6">
            Tente ajustar os filtros ou pesquisar por outros termos
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
          >
            Limpar filtros
          </Button>
        </div>
      )}

      {/* Pagination (Mock - para implementar depois) */}
      {filteredContents.length > 0 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Anterior
          </Button>
          <Button variant="primary" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Próximo
          </Button>
        </div>
      )}
    </div>
  );
}
