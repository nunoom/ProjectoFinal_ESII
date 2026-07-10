'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, ArrowLeft, Lock, Eye, EyeOff, KeyRound } from 'lucide-react';
import Button from '@/components/ui/Button';
import { forgotPasswordApi, resetPasswordApi, ApiError } from '@/lib/api';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email inválido');
      return;
    }

    setSubmitting(true);
    try {
      const message = await forgotPasswordApi(email);
      setInfo(message);
      setStep('reset');
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Não foi possível ligar ao servidor. Verifique se o backend está a correr.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!/^\d{6}$/.test(code)) {
      setError('O código tem 6 dígitos');
      return;
    }
    if (newPassword.length < 6) {
      setError('A nova password deve ter pelo menos 6 caracteres');
      return;
    }

    setSubmitting(true);
    try {
      await resetPasswordApi(email, code, newPassword);
      router.push('/login?reset=1');
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
    try {
      const message = await forgotPasswordApi(email);
      setInfo(message);
    } catch {
      setError('Não foi possível reenviar o código.');
    }
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
          {step === 'email' ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900">Esqueceu a password?</h2>
              <p className="mt-2 text-sm text-gray-600">
                Introduza o seu email e enviaremos um código para redefinir a sua password.
              </p>

              <form onSubmit={handleRequestCode} className="mt-6 space-y-6">
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

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={submitting}
                >
                  {submitting ? 'A enviar...' : 'Enviar Código'}
                </Button>
              </form>
            </>
          ) : (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#8B0000]/10 mx-auto mb-4">
                <KeyRound className="h-7 w-7 text-[#8B0000]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 text-center">Redefinir password</h2>
              <p className="mt-2 text-sm text-gray-600 text-center">
                Enviámos um código de 6 dígitos para <strong>{email}</strong>. Introduza-o abaixo
                com a nova password.
              </p>

              <form onSubmit={handleReset} className="mt-6 space-y-5">
                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                    Código de recuperação
                  </label>
                  <input
                    id="code"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value.replace(/\D/g, ''));
                      setError('');
                    }}
                    className="mt-1 block w-full rounded-lg border border-gray-300 py-3 px-3 text-center text-2xl font-mono tracking-[0.5em] text-gray-900 placeholder-gray-300 focus:border-[#8B0000] focus:outline-none focus:ring-1 focus:ring-[#8B0000]"
                    placeholder="000000"
                  />
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    Nova password
                  </label>
                  <div className="relative mt-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="newPassword"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setError('');
                      }}
                      className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 text-gray-900 placeholder-gray-400 focus:border-[#8B0000] focus:outline-none focus:ring-1 focus:ring-[#8B0000]"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}
                {info && !error && <p className="text-sm text-green-600">{info}</p>}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={submitting}
                >
                  {submitting ? 'A redefinir...' : 'Redefinir Password'}
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
                <button
                  type="button"
                  onClick={() => {
                    setStep('email');
                    setCode('');
                    setError('');
                    setInfo('');
                  }}
                  className="font-medium text-gray-600 hover:text-gray-900"
                >
                  Usar outro email
                </button>
              </div>
            </>
          )}

          <Link
            href="/login"
            className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-[#8B0000] hover:text-[#6B0000]"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Login
          </Link>
        </div>
      </div>
    </div>
  );
}
