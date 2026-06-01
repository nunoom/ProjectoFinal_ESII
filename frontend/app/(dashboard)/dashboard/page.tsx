import Link from 'next/link';
import { ArrowRight, BookOpen, Brain, Trophy, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { mockContents, mockQuizzes, mockRanking } from '@/data/mockData';
import { formatDate, formatNumber } from '@/lib/utils';

export default function DashboardPage() {
  const recentContents = mockContents.slice(0, 3);
  const featuredQuizzes = mockQuizzes.slice(0, 2);
  const topRanking = mockRanking.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <section className="rounded-2xl bg-gradient-to-r from-[#8B0000] to-[#6B0000] p-8 text-white md:p-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">
            Bem-vindo de volta!
          </h1>
          <p className="text-lg opacity-90 mb-6">
            Continue sua jornada de aprendizagem sobre a história económica de Angola.
            Explore novos conteúdos e desafie-se com quizzes.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contents">
              <Button variant="secondary" size="lg">
                Explorar Conteúdos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/quizzes">
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-[#8B0000]">
                Fazer Quiz
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Conteúdos Lidos</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Quizzes Feitos</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <Brain className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pontos Totais</p>
                <p className="text-2xl font-bold text-gray-900">350</p>
              </div>
              <div className="rounded-full bg-yellow-100 p-3">
                <Trophy className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Posição no Ranking</p>
                <p className="text-2xl font-bold text-gray-900">#6</p>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Contents */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Conteúdos Recentes</CardTitle>
                <Link href="/contents">
                  <Button variant="ghost" size="sm">
                    Ver todos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentContents.map((content) => (
                <Link
                  key={content.id}
                  href={`/contents/${content.id}`}
                  className="flex gap-4 rounded-lg border border-gray-200 p-4 transition-all hover:border-[#8B0000] hover:shadow-md"
                >
                  <img
                    src={content.imageUrl}
                    alt={content.title}
                    className="h-24 w-32 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-full bg-[#8B0000] px-2 py-1 text-xs font-medium text-white">
                        {content.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {content.readTime} min de leitura
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {content.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {content.summary}
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                      <span>{formatNumber(content.views)} visualizações</span>
                      <span>{formatDate(content.createdAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured Quizzes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quizzes em Destaque</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {featuredQuizzes.map((quiz) => (
                <Link
                  key={quiz.id}
                  href={`/quizzes/${quiz.id}`}
                  className="block rounded-lg border border-gray-200 p-4 transition-all hover:border-[#8B0000] hover:shadow-md"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-[#8B0000]">
                      {quiz.category}
                    </span>
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                      quiz.difficulty === 'EASY' ? 'bg-green-100 text-green-700' :
                      quiz.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {quiz.difficulty === 'EASY' ? 'Fácil' :
                       quiz.difficulty === 'MEDIUM' ? 'Médio' : 'Difícil'}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {quiz.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">
                    {quiz.questionCount} questões • {quiz.points} pontos
                  </p>
                  {quiz.completed && (
                    <span className="text-xs text-green-600 font-medium">
                      ✓ Completado
                    </span>
                  )}
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Top Ranking */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Top Ranking</CardTitle>
                <Link href="/ranking">
                  <Button variant="ghost" size="sm">
                    Ver mais
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {topRanking.map((entry) => (
                <div
                  key={entry.userId}
                  className="flex items-center gap-3"
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full font-bold ${
                    entry.position === 1 ? 'bg-yellow-100 text-yellow-700' :
                    entry.position === 2 ? 'bg-gray-200 text-gray-700' :
                    entry.position === 3 ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {entry.position}
                  </div>
                  <img
                    src={entry.photoUrl}
                    alt={entry.userName}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {entry.userName}
                    </p>
                    <p className="text-xs text-gray-500">
                      Nível {entry.level} • {entry.points} pts
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
