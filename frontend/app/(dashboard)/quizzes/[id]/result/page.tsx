'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, Trophy, Clock, RotateCcw, ArrowRight, Brain, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { QuizResultView } from '@/types';

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function QuizResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const quizId = parseInt(id);

  const [result, setResult] = useState<QuizResultView | null>(null);
  const [loaded, setLoaded] = useState(false);

  // O resultado é guardado em sessionStorage pela página do quiz
  // (tanto no modo API como no modo demonstração)
  useEffect(() => {
    const stored = sessionStorage.getItem(`quiz-result-${quizId}`);
    if (stored) {
      setResult(JSON.parse(stored));
    }
    setLoaded(true);
  }, [quizId]);

  if (!loaded) {
    return null;
  }

  if (!result) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card>
            <CardContent className="p-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Resultado não disponível</h2>
              <p className="text-gray-600 mb-6">
                Ainda não realizou este quiz. Complete-o primeiro para ver o resultado.
              </p>
              <Link href={`/quizzes/${quizId}`}>
                <Button variant="primary">Fazer Quiz</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const percentage = result.score;
  const passed = percentage >= 50;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Score Card */}
        <Card>
          <CardContent className="p-8 text-center">
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-full mx-auto mb-4 ${
                passed ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              {passed ? (
                <Trophy className="h-10 w-10 text-green-600" />
              ) : (
                <Brain className="h-10 w-10 text-red-600" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {passed ? 'Parabéns!' : 'Continue a Estudar!'}
            </h1>
            <p className="text-gray-600 mb-6">
              {passed
                ? 'Excelente desempenho neste quiz.'
                : 'Não desanime — reveja os conteúdos e tente novamente.'}
            </p>

            <div className="text-5xl font-bold text-[#8B0000] mb-2">{percentage}%</div>
            <p className="text-sm text-gray-500 mb-8">
              {result.correctCount} de {result.totalQuestions} respostas corretas
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <Trophy className="w-5 h-5 text-[#8B0000] mx-auto mb-2" />
                <p className="text-lg font-bold text-gray-900">+{result.pointsEarned}</p>
                <p className="text-xs text-gray-500">Pontos Ganhos</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto mb-2" />
                <p className="text-lg font-bold text-gray-900">{result.correctCount}</p>
                <p className="text-xs text-gray-500">Corretas</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <Clock className="w-5 h-5 text-[#8B0000] mx-auto mb-2" />
                <p className="text-lg font-bold text-gray-900">{formatTime(result.timeSpent)}</p>
                <p className="text-xs text-gray-500">Tempo Gasto</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href={`/quizzes/${quizId}`}>
            <Button variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Refazer Quiz
            </Button>
          </Link>
          <Link href="/ranking">
            <Button variant="outline" className="gap-2">
              <Trophy className="w-4 h-4" />
              Ver Ranking
            </Button>
          </Link>
          <Link href="/quizzes">
            <Button variant="primary" className="gap-2">
              Outros Quizzes
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Answer Review */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Revisão das Respostas — {result.quizTitle}
            </h2>
            <div className="space-y-6">
              {result.review.map((item, index) => (
                <div key={index} className="rounded-lg border border-gray-200 p-6">
                  <div className="flex items-start gap-3 mb-4">
                    {item.correct ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 shrink-0" />
                    )}
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Questão {index + 1}</p>
                      <h3 className="font-semibold text-gray-900">{item.question}</h3>
                    </div>
                  </div>

                  <div className="ml-9 space-y-2 text-sm">
                    <p>
                      <span className="text-gray-500">Sua resposta: </span>
                      <span
                        className={item.correct ? 'text-green-700 font-medium' : 'text-red-700 font-medium'}
                      >
                        {item.selectedText ?? 'Não respondida'}
                      </span>
                    </p>
                    {!item.correct && (
                      <p>
                        <span className="text-gray-500">Resposta correta: </span>
                        <span className="text-green-700 font-medium">{item.correctText}</span>
                      </p>
                    )}
                    {item.explanation && (
                      <p className="flex items-start gap-2 rounded-lg bg-gray-50 p-3 text-gray-600 mt-2">
                        <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-yellow-600" />
                        <span>{item.explanation}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
