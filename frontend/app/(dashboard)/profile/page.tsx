'use client';

import { useState } from 'react';
import { User, Mail, Edit2, Save, X, Trophy, BookOpen, Brain, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { mockUser, mockBadges, mockQuizzes, mockRanking } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);

  const userRanking = mockRanking.find(r => r.userId === mockUser.id);
  const completedQuizzes = mockQuizzes.filter(q => q.completed);
  const earnedBadges = mockBadges.filter(b => b.earned);
  const nextLevelPoints = 500;
  const progressPercent = Math.min(100, Math.round((mockUser.points / nextLevelPoints) * 100));

  const handleSave = () => {
    // In a real app this would call an API
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Perfil</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6">
          {/* Avatar card */}
          <Card>
            <CardContent className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <img
                  src={mockUser.photoUrl}
                  alt={mockUser.name}
                  className="w-24 h-24 rounded-full mx-auto border-4 border-[#8B0000]/20"
                />
                <span className="absolute -bottom-1 -right-1 px-2 py-0.5 text-xs font-bold bg-[#8B0000] text-white rounded-full">
                  Nível {mockUser.level}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">{name}</h2>
              <p className="text-sm text-gray-500">{email}</p>
              <span className={cn(
                'inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full',
                mockUser.role === 'ADMIN' ? 'bg-red-100 text-red-700' :
                mockUser.role === 'MODERATOR' ? 'bg-blue-100 text-blue-700' :
                'bg-green-100 text-green-700'
              )}>
                {mockUser.role === 'ADMIN' ? 'Administrador' :
                 mockUser.role === 'MODERATOR' ? 'Moderador' : 'Utilizador'}
              </span>

              {/* XP bar */}
              <div className="mt-5">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{mockUser.points} pts</span>
                  <span>{nextLevelPoints} pts (Nível {mockUser.level + 1})</span>
                </div>
                <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8B0000] rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {nextLevelPoints - mockUser.points} pontos para o próximo nível
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Estatísticas</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {[
                { icon: BookOpen, label: 'Conteúdos lidos', value: '12', color: 'text-blue-500' },
                { icon: Brain, label: 'Quizzes completos', value: completedQuizzes.length.toString(), color: 'text-green-500' },
                { icon: Star, label: 'Pontos totais', value: mockUser.points.toString(), color: 'text-yellow-500' },
                { icon: Trophy, label: 'Posição ranking', value: `#${userRanking?.position ?? '–'}`, color: 'text-[#8B0000]' },
              ].map(stat => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <stat.icon className={cn('h-4 w-4', stat.color)} />
                    <span className="text-sm text-gray-600">{stat.label}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Edit profile */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Informações Pessoais</CardTitle>
                {isEditing ? (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                      <X className="mr-1 h-4 w-4" />
                      Cancelar
                    </Button>
                    <Button variant="primary" size="sm" onClick={handleSave}>
                      <Save className="mr-1 h-4 w-4" />
                      Guardar
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit2 className="mr-1 h-4 w-4" />
                    Editar
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <User className="inline h-4 w-4 mr-1" />
                  Nome
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent"
                  />
                ) : (
                  <p className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-900">{name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent"
                  />
                ) : (
                  <p className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-900">{email}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Conquistas</CardTitle>
                <span className="text-sm text-gray-500">
                  {earnedBadges.length}/{mockBadges.length} obtidas
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {mockBadges.map(badge => (
                  <div
                    key={badge.id}
                    className={cn(
                      'flex flex-col items-center p-4 rounded-xl border-2 text-center transition-all',
                      badge.earned
                        ? 'border-[#8B0000]/20 bg-[#8B0000]/5'
                        : 'border-gray-100 bg-gray-50 opacity-50 grayscale'
                    )}
                  >
                    <span className="text-3xl mb-2">{badge.icon}</span>
                    <p className="text-sm font-semibold text-gray-900">{badge.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                    {badge.earned && badge.earnedAt && (
                      <p className="text-xs text-[#8B0000] mt-1.5 font-medium">
                        Obtida a {new Date(badge.earnedAt).toLocaleDateString('pt-PT')}
                      </p>
                    )}
                    {!badge.earned && (
                      <p className="text-xs text-gray-400 mt-1.5">Bloqueada</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quiz history */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Histórico de Quizzes</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {completedQuizzes.length > 0 ? (
                <div className="space-y-3">
                  {completedQuizzes.map(quiz => (
                    <div
                      key={quiz.id}
                      className="flex items-center gap-4 p-4 rounded-xl border border-green-200 bg-green-50"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{quiz.title}</p>
                        <p className="text-sm text-gray-500">
                          {quiz.questionCount} questões · {quiz.points} pontos disponíveis
                        </p>
                      </div>
                      <span className="px-3 py-1 text-xs font-medium bg-green-600 text-white rounded-full flex-shrink-0">
                        Completo
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Brain className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Ainda não completou nenhum quiz.</p>
                  <a href="/quizzes" className="text-[#8B0000] text-sm font-medium hover:underline mt-1 inline-block">
                    Explorar quizzes →
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
