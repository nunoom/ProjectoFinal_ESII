'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Trophy, CheckCircle, XCircle, RotateCcw, ArrowRight, Clock } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockQuizzes, mockQuizQuestions } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface StoredResult {
  answers: Record<number, number>;
  timeTaken: number;
}

export default function QuizResultPage() {
  const params = useParams();
  const quizId = parseInt(params.id as string);
  const quiz = mockQuizzes.find(q => q.id === quizId);
  const questions = mockQuizQuestions[quizId] ?? [];

  const [result, setResult] = useState<StoredResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(`quiz-result-${quizId}`);
    if (stored) {
      setResult(JSON.parse(stored));
    }
  }, [quizId]);

  if (!quiz) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Quiz não encontrado</h1>
        <Link href="/quizzes"><Button variant="primary">Voltar para Quizzes</Button></Link>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Sem resultados</h1>
        <p className="text-gray-600 mb-6">Por favor faça o quiz primeiro.</p>
        <Link href={`/quizzes/${quizId}`}><Button variant="primary">Fazer Quiz</Button></Link>
      </div>
    );
  }

  const { answers, timeTaken } = result;
  const correct = questions.filter(q => answers[q.id] === q.correctOptionId).length;
  const total = questions.length;
  const score = Math.round((correct / total) * 100);
  const pointsEarned = Math.round((correct / total) * quiz.points);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m === 0) return `${s}s`;
    return `${m}m ${s}s`;
  };

  const grade =
    score >= 80 ? { label: 'Excelente!', color: 'text-green-600', bg: 'bg-green-50' } :
    score >= 60 ? { label: 'Bom!', color: 'text-blue-600', bg: 'bg-blue-50' } :
    score >= 40 ? { label: 'Pode melhorar', color: 'text-yellow-600', bg: 'bg-yellow-50' } :
                  { label: 'Tente novamente', color: 'text-red-600', bg: 'bg-red-50' };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Result Hero */}
      <Card className="mb-8 overflow-hidden">
        <div className="bg-gradient-to-r from-[#8B0000] to-[#6B0000] p-8 text-white text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-4">
            <Trophy className="h-10 w-10 text-yellow-300" />
          </div>
          <h1 className="text-3xl font-bold mb-1">{grade.label}</h1>
          <p className="text-white/80">{quiz.title}</p>
        </div>
        <CardContent className="p-0">
          <div className="grid grid-cols-3 divide-x divide-gray-200">
            <div className="p-6 text-center">
              <p className="text-3xl font-bold text-gray-900">{score}%</p>
              <p className="text-sm text-gray-500 mt-1">Pontuação</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-3xl font-bold text-gray-900">{correct}/{total}</p>
              <p className="text-sm text-gray-500 mt-1">Corretas</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-3xl font-bold text-[#8B0000]">+{pointsEarned}</p>
              <p className="text-sm text-gray-500 mt-1">Pontos ganhos</p>
            </div>
          </div>
          {quiz.timeLimit && (
            <div className="px-6 pb-4 flex justify-center">
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                Tempo: {formatTime(timeTaken)}
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Score bar */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">Desempenho geral</span>
            <span className={cn('font-bold', grade.color)}>{grade.label}</span>
          </div>
          <div className="h-4 w-full rounded-full bg-gray-200 overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-all duration-1000', {
                'bg-green-500': score >= 80,
                'bg-blue-500': score >= 60 && score < 80,
                'bg-yellow-500': score >= 40 && score < 60,
                'bg-red-500': score < 40,
              })}
              style={{ width: `${score}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Question review */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">Revisão das Respostas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          {questions.map((question, idx) => {
            const userAnswerId = answers[question.id];
            const isCorrect = userAnswerId === question.correctOptionId;
            const userOption = question.options.find(o => o.id === userAnswerId);
            const correctOption = question.options.find(o => o.id === question.correctOptionId);

            return (
              <div
                key={question.id}
                className={cn(
                  'rounded-xl border-2 p-5',
                  isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                )}
              >
                <div className="flex items-start gap-3 mb-3">
                  {isCorrect
                    ? <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    : <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-500 mb-1">Questão {idx + 1}</p>
                    <p className="font-medium text-gray-900">{question.text}</p>
                  </div>
                </div>

                <div className="ml-8 space-y-1.5 text-sm">
                  {userAnswerId ? (
                    <p className={cn('flex items-center gap-2', isCorrect ? 'text-green-700' : 'text-red-700')}>
                      <span className="font-medium">A sua resposta:</span>
                      <span>{userOption?.text}</span>
                    </p>
                  ) : (
                    <p className="text-gray-500 italic">Não respondeu</p>
                  )}
                  {!isCorrect && (
                    <p className="flex items-center gap-2 text-green-700">
                      <span className="font-medium">Resposta correta:</span>
                      <span>{correctOption?.text}</span>
                    </p>
                  )}
                  <p className="text-gray-600 mt-2 bg-white/60 rounded-lg px-3 py-2">
                    {question.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href={`/quizzes/${quizId}`} className="flex-1">
          <Button variant="outline" className="w-full">
            <RotateCcw className="mr-2 h-4 w-4" />
            Refazer Quiz
          </Button>
        </Link>
        <Link href="/ranking" className="flex-1">
          <Button variant="outline" className="w-full">
            <Trophy className="mr-2 h-4 w-4" />
            Ver Ranking
          </Button>
        </Link>
        <Link href="/quizzes" className="flex-1">
          <Button variant="primary" className="w-full">
            Outros Quizzes
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
