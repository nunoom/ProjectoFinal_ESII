'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { mockQuizzes, mockQuizQuestions } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = parseInt(params.id as string);

  const quiz = mockQuizzes.find(q => q.id === quizId);
  const questions = mockQuizQuestions[quizId] ?? [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(quiz?.timeLimit ?? 0);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = useCallback(() => {
    // Persist answers to sessionStorage for the result page
    sessionStorage.setItem(
      `quiz-result-${quizId}`,
      JSON.stringify({ answers, timeTaken: (quiz?.timeLimit ?? 0) - timeLeft })
    );
    router.push(`/quizzes/${quizId}/result`);
  }, [answers, quizId, quiz?.timeLimit, timeLeft, router]);

  // Countdown timer
  useEffect(() => {
    if (!quiz?.timeLimit || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [quiz?.timeLimit, handleSubmit, timeLeft]);

  if (!quiz || questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Quiz não encontrado</h1>
        <Link href="/quizzes">
          <Button variant="primary">Voltar para Quizzes</Button>
        </Link>
      </div>
    );
  }

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const answeredCount = Object.keys(answers).length;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const isTimeCritical = quiz.timeLimit && timeLeft < 60;

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/quizzes">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </Link>

        <div className="text-center">
          <p className="text-sm font-semibold text-gray-900">{quiz.title}</p>
          <p className="text-xs text-gray-500">
            Questão {currentIndex + 1} de {questions.length}
          </p>
        </div>

        {quiz.timeLimit ? (
          <div className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold',
            isTimeCritical
              ? 'bg-red-100 text-red-700 animate-pulse'
              : 'bg-gray-100 text-gray-700'
          )}>
            <Clock className="h-4 w-4" />
            {formatTime(timeLeft)}
          </div>
        ) : (
          <div className="w-24" />
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{answeredCount} respondidas</span>
          <span>{questions.length - answeredCount} restantes</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-[#8B0000] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <Card className="mb-6">
        <CardContent className="p-8">
          <div className="mb-2">
            <span className="text-xs font-medium text-[#8B0000] uppercase tracking-wide">
              {question.type === 'TRUE_FALSE' ? 'Verdadeiro / Falso' : 'Escolha múltipla'}
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-8 leading-relaxed">
            {question.text}
          </h2>

          <div className="space-y-3">
            {question.options.map(option => {
              const isSelected = answers[question.id] === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => setAnswers(prev => ({ ...prev, [question.id]: option.id }))}
                  className={cn(
                    'w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all duration-200',
                    isSelected
                      ? 'border-[#8B0000] bg-[#8B0000]/5 text-[#8B0000]'
                      : 'border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold',
                      isSelected
                        ? 'border-[#8B0000] bg-[#8B0000] text-white'
                        : 'border-gray-300 text-gray-400'
                    )}>
                      {String.fromCharCode(64 + option.id)}
                    </span>
                    {option.text}
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentIndex(i => i - 1)}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Anterior
        </Button>

        {/* Question dots */}
        <div className="flex gap-1.5 flex-wrap justify-center max-w-xs">
          {questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                'w-7 h-7 rounded-full text-xs font-medium transition-all',
                i === currentIndex
                  ? 'bg-[#8B0000] text-white scale-110'
                  : answers[q.id]
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {isLast ? (
          <Button variant="primary" onClick={() => setShowConfirm(true)}>
            Submeter
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => setCurrentIndex(i => i + 1)}
          >
            Próxima
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-yellow-100 mb-4">
                <AlertCircle className="h-7 w-7 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Submeter Quiz?</h3>
              {answeredCount < questions.length && (
                <p className="text-sm text-yellow-700 bg-yellow-50 rounded-lg px-4 py-2 mb-4">
                  Ainda tem {questions.length - answeredCount} questão(ões) sem resposta.
                </p>
              )}
              <p className="text-gray-600 mb-6">
                Respondeu a {answeredCount} de {questions.length} questões. Tem a certeza que quer submeter?
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowConfirm(false)}>
                  Cancelar
                </Button>
                <Button variant="primary" className="flex-1" onClick={handleSubmit}>
                  Confirmar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
