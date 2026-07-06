'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Brain, Trophy, MessageSquare, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getStoredUser } from '@/lib/api';
import { User as UserType } from '@/types';

const navigation = [
  { name: 'Início', href: '/dashboard', icon: Home },
  { name: 'Conteúdos', href: '/contents', icon: BookOpen },
  { name: 'Quizzes', href: '/quizzes', icon: Brain },
  { name: 'Ranking', href: '/ranking', icon: Trophy },
  { name: 'Fórum', href: '/forum', icon: MessageSquare },
  { name: 'Perfil', href: '/profile', icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const pointsToNext = user ? Math.max(user.level * 100 - user.points, 0) : 0;
  const progress = user ? Math.min(((user.points % 100) / 100) * 100, 100) : 0;

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-gray-200 bg-white">
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-[#8B0000] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Stats Card */}
      {user && (
        <div className="m-4 rounded-lg border border-gray-200 bg-gradient-to-br from-[#8B0000] to-[#6B0000] p-4 text-white">
          <h3 className="text-sm font-medium opacity-90">Seu Progresso</h3>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Nível {user.level}</span>
              <span>{user.points} pts</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/20">
              <div className="h-full rounded-full bg-white" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-xs opacity-75">
              {pointsToNext} pontos para o nível {user.level + 1}
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
