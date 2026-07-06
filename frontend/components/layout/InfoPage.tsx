import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function InfoPage({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8B0000]">
              <span className="text-xl font-bold text-white">E</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Economia com História</h1>
              <p className="text-xs text-gray-500">Angola</p>
            </div>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-[#8B0000] hover:text-[#6B0000]"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Início
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
