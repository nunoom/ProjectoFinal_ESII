'use client';

import Link from 'next/link';
import { Search, Bell, User, Menu } from 'lucide-react';
import { mockUser } from '@/data/mockData';
import Button from '../ui/Button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8B0000]">
            <span className="text-xl font-bold text-white">E</span>
          </div>
          <div className="hidden md:block">
            <h1 className="text-lg font-bold text-gray-900">
              Economia com História
            </h1>
            <p className="text-xs text-gray-500">Angola</p>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="hidden flex-1 max-w-md mx-8 md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar conteúdos, quizzes..."
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-[#8B0000] focus:outline-none focus:ring-1 focus:ring-[#8B0000]"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative rounded-lg p-2 hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3 rounded-lg border border-gray-200 px-3 py-2 hover:bg-gray-50 cursor-pointer">
            <img
              src={mockUser.photoUrl}
              alt={mockUser.name}
              className="h-8 w-8 rounded-full"
            />
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900">{mockUser.name}</p>
              <p className="text-xs text-gray-500">
                Nível {mockUser.level} • {mockUser.points} pts
              </p>
            </div>
          </div>

          {/* Mobile Menu */}
          <button className="md:hidden rounded-lg p-2 hover:bg-gray-100">
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
