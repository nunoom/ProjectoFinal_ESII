'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Brain,
  Trophy,
  TrendingUp,
  Award,
  Pencil,
  Check,
  X,
  CheckCircle2,
} from 'lucide-react';
import {
  fetchMe,
  fetchBadges,
  fetchRanking,
  fetchQuizHistory,
  updateProfileApi,
  ApiError,
} from '@/lib/api';
import { useApi } from '@/lib/useApiData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import BadgeIcon from '@/components/ui/BadgeIcon';
import { PageLoading, PageError } from '@/components/ui/Status';
import { formatDate } from '@/lib/utils';

export default function ProfilePage() {
  const { data: user, setData: setUser, loading, error, retry } = useApi(fetchMe);
  const { data: badges } = useApi(fetchBadges);
  const { data: rankingData } = useApi(fetchRanking);
  const { data: quizHistory } = useApi(fetchQuizHistory);

  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editError, setEditError] = useState('');

  if (loading) return <PageLoading />;
  if (error || !user) return <PageError message={error ?? 'Erro ao carregar'} onRetry={retry} />;

  const rankingEntry = rankingData?.rankings.find((entry) => entry.userId === user.id);
  const allBadges = badges ?? [];
  const earnedBadges = allBadges.filter((badge) => badge.earned);
  const history = quizHistory ?? [];

  const startEditing = () => {
    setEditName(user.name);
    setEditing(true);
  };

  const handleSave = async () => {
    if (editName.trim().length < 3) {
      setEditError('O nome deve ter pelo menos 3 caracteres');
      return;
    }
    try {
      const updated = await updateProfileApi(editName.trim(), user.bio ?? '');
      setUser(updated);
    } catch (err) {
      setEditError(
        err instanceof ApiError
          ? err.message
          : 'Não foi possível ligar ao servidor. Verifique se o backend está a correr.'
      );
      return;
    }
    setEditing(false);
    setEditError('');
  };

  const handleCancel = () => {
    setEditName(user.name);
    setEditing(false);
    setEditError('');
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={user.photoUrl}
              alt={user.name}
              className="h-24 w-24 rounded-full border-4 border-[#8B0000]/20"
            />
            <div className="flex-1 text-center md:text-left">
              {editing ? (
                <div className="space-y-3 max-w-sm">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent"
                    />
                  </div>
                  {editError && <p className="text-sm text-red-600">{editError}</p>}
                  <div className="flex gap-2 justify-center md:justify-start">
                    <Button variant="primary" size="sm" className="gap-1" onClick={handleSave}>
                      <Check className="w-4 h-4" />
                      Guardar
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1" onClick={handleCancel}>
                      <X className="w-4 h-4" />
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 justify-center md:justify-start mb-1">
                    <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                    <button
                      onClick={startEditing}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                      title="Editar perfil"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-600 mb-3">{user.email}</p>
                  <div className="flex items-center gap-3 justify-center md:justify-start flex-wrap">
                    <span className="rounded-full bg-[#8B0000] px-3 py-1 text-xs font-medium text-white">
                      Nível {user.level}
                    </span>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                      {user.points} pontos
                    </span>
                    {rankingEntry && (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                        #{rankingEntry.position} no ranking
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Level Progress */}
            <div className="w-full md:w-64">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Nível {user.level}</span>
                <span>{user.points}/500 pts</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-[#8B0000] to-[#6B0000] h-3 rounded-full"
                  style={{ width: `${Math.min((user.points / 500) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {Math.max(500 - user.points, 0)} pontos para o nível {user.level + 1}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Nível Atual</p>
                <p className="text-2xl font-bold text-gray-900">{user.level}</p>
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
                <p className="text-2xl font-bold text-gray-900">{history.length}</p>
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
                <p className="text-2xl font-bold text-gray-900">{user.points}</p>
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
                <p className="text-sm font-medium text-gray-500">Badges Ganhos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {earnedBadges.length}/{allBadges.length}
                </p>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {allBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`rounded-lg border p-4 ${
                    badge.earned
                      ? 'border-[#8B0000]/30 bg-[#8B0000]/5'
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-lg ${
                    badge.earned ? 'bg-[#8B0000]/10' : 'bg-gray-200'
                  }`}>
                    <BadgeIcon slug={badge.icon} className={`h-5 w-5 ${badge.earned ? 'text-[#8B0000]' : 'text-gray-400'}`} />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900">{badge.name}</h4>
                  <p className="text-xs text-gray-600 mb-2">{badge.description}</p>
                  {badge.earned && badge.earnedAt ? (
                    <p className="flex items-center gap-1 text-xs text-green-600 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      Conquistado em {formatDate(badge.earnedAt)}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-400">Por conquistar</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quiz History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Histórico de Quizzes</CardTitle>
              <Link href="/quizzes">
                <Button variant="ghost" size="sm">
                  Ver todos
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {history.length > 0 ? (
              history.slice(0, 5).map((attempt, index) => (
                <Link
                  key={index}
                  href={`/quizzes/${attempt.quizId}`}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:border-[#8B0000] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{attempt.quizTitle}</p>
                      <p className="text-xs text-gray-500">
                        {attempt.score}% • {formatDate(attempt.completedAt)}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#8B0000]">+{attempt.pointsEarned} pts</span>
                </Link>
              ))
            ) : (
              <div className="text-center py-8">
                <Brain className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">Ainda não completou nenhum quiz</p>
                <Link href="/quizzes">
                  <Button variant="primary">Fazer Primeiro Quiz</Button>
                </Link>
              </div>
            )}

            {/* Progress CTA */}
            <div className="rounded-lg bg-gradient-to-r from-[#8B0000] to-[#6B0000] p-4 text-white mt-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Continue a aprender!</p>
                  <p className="text-xs opacity-90">
                    Complete mais quizzes para ganhar pontos e subir de nível.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
