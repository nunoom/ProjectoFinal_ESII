'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Brain, Clock, Star, CheckCircle, Search, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { mockQuizzes, categories } from '@/data/mockData';

const difficultyLabel: Record<string, string> = {
  EASY: 'Fácil',
  MEDIUM: 'Médio',
  HARD: 'Difícil',
};

const difficultyClass: Record<string, string> = {
  EASY: 'bg-green-100 text-green-700',
  MEDIUM: 'bg-yellow-100 text-yellow-700',
  HARD: 'bg-red-100 text-red-700',
};

export default function QuizzesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const filteredQuizzes = mockQuizzes.filter(quiz => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || quiz.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quizzes</h1>
        <p className="text-gray-600">
          Teste os seus conhecimentos com {mockQuizzes.length} quizzes sobre história económica angolana
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar quizzes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent"
          />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
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

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent"
          >
            <option value="all">Todas as dificuldades</option>
            <option value="EASY">Fácil</option>
            <option value="MEDIUM">Médio</option>
            <option value="HARD">Difícil</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-600 mb-4">
        {filteredQuizzes.length === mockQuizzes.length
          ? `Mostrando todos os ${filteredQuizzes.length} quizzes`
          : `Encontrados ${filteredQuizzes.length} de ${mockQuizzes.length} quizzes`}
      </p>

      {/* Quiz Grid */}
      {filteredQuizzes.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {filteredQuizzes.map(quiz => (
            <Card key={quiz.id} className="hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-[#8B0000]/10 p-3">
                      <Brain className="h-6 w-6 text-[#8B0000]" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-[#8B0000]">{quiz.category}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${difficultyClass[quiz.difficulty]}`}>
                          {difficultyLabel[quiz.difficulty]}
                        </span>
                        {quiz.completed && (
                          <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                            <CheckCircle className="h-3.5 w-3.5" />
                            Completo
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <span className="text-sm font-bold text-gray-900">{quiz.points} pts</span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">{quiz.title}</h3>
                <p className="text-sm text-gray-600 mb-5">{quiz.description}</p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-5">
                  <div className="flex items-center gap-1.5">
                    <Brain className="h-4 w-4" />
                    <span>{quiz.questionCount} questões</span>
                  </div>
                  {quiz.timeLimit && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      <span>{Math.floor(quiz.timeLimit / 60)} min</span>
                    </div>
                  )}
                </div>

                {/* Action */}
                <Link href={`/quizzes/${quiz.id}`}>
                  <Button variant={quiz.completed ? 'outline' : 'primary'} className="w-full">
                    {quiz.completed ? 'Refazer Quiz' : 'Iniciar Quiz'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Brain className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum quiz encontrado</h3>
          <p className="text-gray-600 mb-6">Tente ajustar os filtros de pesquisa</p>
          <Button variant="outline" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSelectedDifficulty('all'); }}>
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
}
