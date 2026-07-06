'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { MailCheck, ShieldCheck, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import { verifyEmailApi, resendCodeApi, ApiError } from '@/lib/api';

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get('email') ?? '';

  const [email, setEmail] = useState(emailFromUrl);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email inválido');
      return;
    }
    if (!/^\d{6}$/.test(code)) {
      setError('O código tem 6 dígitos');
      return;
    }

    setSubmitting(true);
    try {
      await verifyEmailApi(email, code);
      router.push('/login?verified=1');
    } catch (err) {
      setSubmitting(false);
      setError(
        err instanceof ApiError
          ? err.message
          : 'Não foi possível ligar ao servidor. Verifique se o backend está a correr.'
      );
    }
  };

  const handleResend = async () => {
    setError('');
    setInfo('');
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Introduza o email para reenviar o código');
      return;
    }
    try {
      const message = await resendCodeApi(email);
      setInfo(message);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Não foi possível ligar ao servidor. Verifique se o backend está a correr.'
      );
    }
  };

  return (
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
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#8B0000]/10 mx-auto mb-4">
          <MailCheck className="h-7 w-7 text-[#8B0000]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 text-center">Verifique o seu email</h2>
        <p className="mt-2 text-sm text-gray-600 text-center">
          Enviámos um código de 6 dígitos para o seu email. Introduza-o abaixo para ativar a conta.
        </p>

        <form onSubmit={handleVerify} className="mt-6 space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 py-3 px-3 text-gray-900 placeholder-gray-400 focus:border-[#8B0000] focus:outline-none focus:ring-1 focus:ring-[#8B0000]"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              Código de verificação
            </label>
            <input
              id="code"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              className="mt-1 block w-full rounded-lg border border-gray-300 py-3 px-3 text-center text-2xl font-mono tracking-[0.5em] text-gray-900 placeholder-gray-300 focus:border-[#8B0000] focus:outline-none focus:ring-1 focus:ring-[#8B0000]"
              placeholder="000000"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {info && <p className="text-sm text-green-600">{info}</p>}

          <Button type="submit" variant="primary" size="lg" className="w-full gap-2" disabled={submitting}>
            <ShieldCheck className="h-5 w-5" />
            {submitting ? 'A verificar...' : 'Verificar Email'}
          </Button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={handleResend}
            className="font-medium text-[#8B0000] hover:text-[#6B0000]"
          >
            Reenviar código
          </button>
          <Link
            href="/login"
            className="flex items-center gap-1 font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Suspense fallback={null}>
        <VerifyEmailForm />
      </Suspense>
    </div>
  );
}
