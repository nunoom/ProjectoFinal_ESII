'use client';

import { useState } from 'react';
import { Trophy, Medal, Crown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockRanking, mockUser } from '@/data/mockData';
import { cn } from '@/lib/utils';

const tabs = ['Global', 'Semanal', 'Mensal'] as const;
type Tab = typeof tabs[number];

const positionIcon = (pos: number) => {
  if (pos === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
  if (pos === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (pos === 3) return <Medal className="h-5 w-5 text-amber-600" />;
  return null;
};

const positionBg = (pos: number) => {
  if (pos === 1) return 'bg-yellow-50 border-yellow-200';
  if (pos === 2) return 'bg-gray-50 border-gray-200';
  if (pos === 3) return 'bg-amber-50 border-amber-200';
  return 'bg-white border-gray-200';
};

export default function RankingPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Global');

  const top3 = mockRanking.slice(0, 3);
  const rest = mockRanking.slice(3);
  const currentUserEntry = mockRanking.find(r => r.userId === mockUser.id);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#8B0000]/10 mb-4">
          <Trophy className="h-8 w-8 text-[#8B0000]" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ranking</h1>
        <p className="text-gray-600">Os melhores estudantes de história económica angolana</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-8 max-w-xs mx-auto">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 py-2 text-sm font-medium rounded-lg transition-all',
              activeTab === tab
                ? 'bg-white text-[#8B0000] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-4 mb-10">
        {/* 2nd place */}
        {top3[1] && (
          <div className="flex flex-col items-center">
            <img
              src={top3[1].photoUrl}
              alt={top3[1].userName}
              className="w-16 h-16 rounded-full border-4 border-gray-300 mb-2"
            />
            <p className="text-sm font-semibold text-gray-900 text-center">{top3[1].userName}</p>
            <p className="text-xs text-gray-500">{top3[1].points} pts</p>
            <div className="mt-2 w-20 h-16 bg-gray-200 rounded-t-lg flex items-center justify-center">
              <span className="text-2xl font-black text-gray-500">2</span>
            </div>
          </div>
        )}

        {/* 1st place */}
        {top3[0] && (
          <div className="flex flex-col items-center">
            <Crown className="h-6 w-6 text-yellow-500 mb-1" />
            <img
              src={top3[0].photoUrl}
              alt={top3[0].userName}
              className="w-20 h-20 rounded-full border-4 border-yellow-400 mb-2"
            />
            <p className="text-sm font-bold text-gray-900 text-center">{top3[0].userName}</p>
            <p className="text-xs text-gray-500">{top3[0].points} pts</p>
            <div className="mt-2 w-20 h-24 bg-yellow-400 rounded-t-lg flex items-center justify-center">
              <span className="text-3xl font-black text-white">1</span>
            </div>
          </div>
        )}

        {/* 3rd place */}
        {top3[2] && (
          <div className="flex flex-col items-center">
            <img
              src={top3[2].photoUrl}
              alt={top3[2].userName}
              className="w-16 h-16 rounded-full border-4 border-amber-500 mb-2"
            />
            <p className="text-sm font-semibold text-gray-900 text-center">{top3[2].userName}</p>
            <p className="text-xs text-gray-500">{top3[2].points} pts</p>
            <div className="mt-2 w-20 h-10 bg-amber-400 rounded-t-lg flex items-center justify-center">
              <span className="text-xl font-black text-white">3</span>
            </div>
          </div>
        )}
      </div>

      {/* Full ranking table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Classificação Completa</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {mockRanking.map(entry => {
              const isCurrentUser = entry.userId === mockUser.id;
              return (
                <div
                  key={entry.userId}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-xl border-2 transition-all',
                    positionBg(entry.position),
                    isCurrentUser && 'ring-2 ring-[#8B0000]'
                  )}
                >
                  {/* Position */}
                  <div className="flex items-center justify-center w-10">
                    {positionIcon(entry.position) ?? (
                      <span className="text-lg font-bold text-gray-500">#{entry.position}</span>
                    )}
                  </div>

                  {/* Avatar */}
                  <img
                    src={entry.photoUrl}
                    alt={entry.userName}
                    className="w-12 h-12 rounded-full"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 truncate">{entry.userName}</p>
                      {isCurrentUser && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-[#8B0000] text-white rounded-full">
                          Você
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">Nível {entry.level}</p>
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{entry.points}</p>
                    <p className="text-xs text-gray-500">pontos</p>
                  </div>

                  {/* Progress bar */}
                  <div className="hidden sm:block w-24">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#8B0000] rounded-full"
                        style={{ width: `${Math.min(100, (entry.points / mockRanking[0].points) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Your position highlight */}
          {currentUserEntry && (
            <div className="mt-6 p-4 bg-[#8B0000]/5 border border-[#8B0000]/20 rounded-xl">
              <p className="text-sm font-semibold text-[#8B0000] mb-1">A sua posição</p>
              <p className="text-gray-700">
                Está em <span className="font-bold">#{currentUserEntry.position}</span> lugar com{' '}
                <span className="font-bold">{currentUserEntry.points} pontos</span>.{' '}
                {currentUserEntry.position > 1 && (
                  <>
                    Precisa de{' '}
                    <span className="font-bold text-[#8B0000]">
                      {mockRanking[currentUserEntry.position - 2].points - currentUserEntry.points} pontos
                    </span>{' '}
                    para subir uma posição.
                  </>
                )}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
