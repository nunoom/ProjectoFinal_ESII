'use client';

import { useEffect, useState } from 'react';
import { Trophy, Medal, TrendingUp, Crown } from 'lucide-react';
import { fetchRanking, getStoredUser } from '@/lib/api';
import { useApi } from '@/lib/useApiData';
import { Card, CardContent } from '@/components/ui/Card';
import { PageLoading, PageError } from '@/components/ui/Status';
import { formatNumber } from '@/lib/utils';

export default function RankingPage() {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const { data: rankingData, loading, error, retry } = useApi(fetchRanking);

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) setCurrentUserId(stored.id);
  }, []);

  if (loading) return <PageLoading />;
  if (error || !rankingData) return <PageError message={error ?? 'Erro ao carregar'} onRetry={retry} />;

  const ranking = rankingData.rankings;
  const podium = ranking.slice(0, 3);
  const currentUserEntry = ranking.find((entry) => entry.userId === currentUserId);

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Ranking</h1>
        <p className="text-gray-600 mt-2">
          Veja a classificação dos estudantes mais dedicados da plataforma
        </p>
      </div>

      {/* Podium */}
      <div className="grid grid-cols-3 gap-4 items-end max-w-3xl mx-auto">
        {/* 2nd Place */}
        <Card>
          <CardContent className="p-6 text-center">
            <div className="relative inline-block mb-3">
              <img
                src={podium[1]?.photoUrl}
                alt={podium[1]?.userName}
                className="h-16 w-16 rounded-full mx-auto border-4 border-gray-300"
              />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-gray-300 text-sm font-bold text-gray-700">
                2
              </span>
            </div>
            <Medal className="w-5 h-5 text-gray-400 mx-auto mb-1" />
            <p className="font-semibold text-gray-900 text-sm truncate">{podium[1]?.userName}</p>
            <p className="text-xs text-gray-500">Nível {podium[1]?.level}</p>
            <p className="text-lg font-bold text-[#8B0000] mt-1">{formatNumber(podium[1]?.points ?? 0)} pts</p>
          </CardContent>
        </Card>

        {/* 1st Place */}
        <Card className="border-2 border-yellow-400 shadow-lg">
          <CardContent className="p-6 pb-8 text-center">
            <Crown className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <div className="relative inline-block mb-3">
              <img
                src={podium[0]?.photoUrl}
                alt={podium[0]?.userName}
                className="h-20 w-20 rounded-full mx-auto border-4 border-yellow-400"
              />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-yellow-900">
                1
              </span>
            </div>
            <p className="font-bold text-gray-900 truncate">{podium[0]?.userName}</p>
            <p className="text-xs text-gray-500">Nível {podium[0]?.level}</p>
            <p className="text-xl font-bold text-[#8B0000] mt-1">{formatNumber(podium[0]?.points ?? 0)} pts</p>
          </CardContent>
        </Card>

        {/* 3rd Place */}
        <Card>
          <CardContent className="p-6 text-center">
            <div className="relative inline-block mb-3">
              <img
                src={podium[2]?.photoUrl}
                alt={podium[2]?.userName}
                className="h-16 w-16 rounded-full mx-auto border-4 border-orange-300"
              />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-orange-300 text-sm font-bold text-orange-800">
                3
              </span>
            </div>
            <Medal className="w-5 h-5 text-orange-400 mx-auto mb-1" />
            <p className="font-semibold text-gray-900 text-sm truncate">{podium[2]?.userName}</p>
            <p className="text-xs text-gray-500">Nível {podium[2]?.level}</p>
            <p className="text-lg font-bold text-[#8B0000] mt-1">{formatNumber(podium[2]?.points ?? 0)} pts</p>
          </CardContent>
        </Card>
      </div>

      {/* Full Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase">
                  <th className="px-6 py-4">Posição</th>
                  <th className="px-6 py-4">Estudante</th>
                  <th className="px-6 py-4">Nível</th>
                  <th className="px-6 py-4 text-right">Pontos</th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((entry) => {
                  const isCurrentUser = entry.userId === currentUserId;
                  return (
                    <tr
                      key={entry.userId}
                      className={`border-b border-gray-100 last:border-0 ${
                        isCurrentUser ? 'bg-[#8B0000]/5' : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm ${
                            entry.position === 1
                              ? 'bg-yellow-100 text-yellow-700'
                              : entry.position === 2
                                ? 'bg-gray-200 text-gray-700'
                                : entry.position === 3
                                  ? 'bg-orange-100 text-orange-700'
                                  : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {entry.position}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={entry.photoUrl}
                            alt={entry.userName}
                            className="h-10 w-10 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {entry.userName}
                              {isCurrentUser && (
                                <span className="ml-2 rounded-full bg-[#8B0000] px-2 py-0.5 text-xs text-white">
                                  Você
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">Nível {entry.level}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-bold text-gray-900">
                          {formatNumber(entry.points)} pts
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Current User Summary */}
      {currentUserEntry && (
        <Card className="bg-gradient-to-r from-[#8B0000] to-[#6B0000] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm opacity-90">A sua posição atual</p>
                  <p className="text-2xl font-bold">#{currentUserEntry.position}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-5 h-5" />
                <span>
                  Faça mais quizzes para subir no ranking e desbloquear novos badges!
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
