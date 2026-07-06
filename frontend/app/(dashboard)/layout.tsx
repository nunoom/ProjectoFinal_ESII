'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { isLoggedIn } from '@/lib/api';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  // Área protegida: sem sessão iniciada, redireciona para o login
  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace('/login');
    } else {
      setChecked(true);
    }
  }, [router]);

  if (!checked) {
    return null;
  }

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
