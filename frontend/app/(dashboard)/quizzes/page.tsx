'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Brain, Clock, Trophy, CheckCircle2 } from 'lucide-react';
import { categories } from '@/lib/categories';
import { fetchQuizzes } from '@/lib/api';
import { useApi } from '@/lib/useApiData';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { PageLoading, PageError } from '@/components/ui/Status';

const difficultyLabels: Record<string, string> = {
  EASY: 'Fácil',
  MEDIUM: 'Médio',
  HARD: 'Difícil',
};

const difficultyStyles: Record<string, string> = {
  EASY: 'bg-green-100 text-green-700',
  MEDIUM: 'bg-yellow-100 text-yellow-700',
  HARD: 'bg-red-100 text-red-700',
};

export default function QuizzesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const { data: quizzes, loading, error, retry } = useApi(fetchQuizzes);

  if (loading) return <PageLoading />;
  if (error || !quizzes) return <PageError message={error ?? 'Erro ao carregar'} onRetry={retry} />;

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || quiz.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const completedCount = quizzes.filter((q) => q.completed).length;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quizzes</h1>
          <p className="text-gray-600 mt-2">
            Teste os seus conhecimentos e ganhe pontos para subir no ranking
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span>
            {completedCount} de {quizzes.length} quizzes completados
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Pesquisar quizzes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Categoria:</span>
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
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Dificuldade:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['all', 'EASY', 'MEDIUM', 'HARD'].map((difficulty) => (
                    <button
                      key={difficulty}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedDifficulty === difficulty
                          ? 'bg-[#8B0000] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {difficulty === 'all' ? 'Todas' : difficultyLabels[difficulty]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              {filteredQuizzes.length}{' '}
              {filteredQuizzes.length === 1 ? 'quiz encontrado' : 'quizzes encontrados'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quizzes Grid */}
      {filteredQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredQuizzes.map((quiz) => (
            <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8B0000]/10">
                      <Brain className="h-6 w-6 text-[#8B0000]" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-[#8B0000]">{quiz.category}</span>
                      <h3 className="text-lg font-bold text-gray-900">{quiz.title}</h3>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${difficultyStyles[quiz.difficulty]}`}
                  >
                    {difficultyLabels[quiz.difficulty]}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4">{quiz.description}</p>

                <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <Brain className="w-4 h-4" />
                    <span>{quiz.questionCount} questões</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    <span>{quiz.points} pontos</span>
                  </div>
                  {quiz.timeLimit && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{Math.round(quiz.timeLimit / 60)} min</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  {quiz.completed ? (
                    <span className="flex items-center gap-1 text-sm text-green-600 font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      Completado
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500">Ainda não realizado</span>
                  )}
                  <Link href={`/quizzes/${quiz.id}`}>
                    <Button variant={quiz.completed ? 'outline' : 'primary'}>
                      {quiz.completed ? 'Refazer Quiz' : 'Começar Quiz'}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum quiz encontrado</h3>
            <p className="text-gray-600">Tente ajustar os filtros ou a pesquisa</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
