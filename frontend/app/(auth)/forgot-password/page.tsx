'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Email é obrigatório');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email inválido');
      return;
    }

    // Mock: em produção, chamar API de recuperação de password
    setSent(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center justify-center space-x-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#8B0000]">
            <span className="text-2xl font-bold text-white">E</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Economia com História</h1>
            <p className="text-xs text-gray-500">Angola</p>
          </div>
        </Link>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {sent ? (
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Email enviado!</h2>
              <p className="text-sm text-gray-600 mb-6">
                Se existir uma conta associada a <strong>{email}</strong>, receberá um email com
                instruções para redefinir a sua password.
              </p>
              <Link href="/login">
                <Button variant="primary" className="w-full">
                  Voltar ao Login
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900">Esqueceu a password?</h2>
              <p className="mt-2 text-sm text-gray-600">
                Introduza o seu email e enviaremos instruções para redefinir a sua password.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="relative mt-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      className={`block w-full rounded-lg border ${
                        error ? 'border-red-300' : 'border-gray-300'
                      } py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-[#8B0000] focus:outline-none focus:ring-1 focus:ring-[#8B0000]`}
                      placeholder="seu@email.com"
                    />
                  </div>
                  {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full">
                  Enviar Instruções
                </Button>
              </form>

              <Link
                href="/login"
                className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-[#8B0000] hover:text-[#6B0000]"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar ao Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
