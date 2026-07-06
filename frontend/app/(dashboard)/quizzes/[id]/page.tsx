'use client';

import { use, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Brain, Clock, Trophy, AlertTriangle } from 'lucide-react';
import { fetchQuizDetail, submitQuizApi } from '@/lib/api';
import { useApi } from '@/lib/useApiData';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { PageLoading, PageError } from '@/components/ui/Status';
import { QuizResultView } from '@/types';

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function QuizPlayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const quizId = parseInt(id);

  // Quiz da API — as respostas corretas nunca chegam ao cliente;
  // a correção é feita pelo backend na submissão
  const { data: quiz, loading, error, retry } = useApi(() => fetchQuizDetail(quizId));
  const questions = quiz?.questions ?? [];

  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleStart = () => {
    setTimeLeft(quiz?.timeLimit ?? 0);
    setStarted(true);
  };

  const handleSubmit = useCallback(async () => {
    if (!quiz || submitting) return;
    setSubmitting(true);

    const timeSpent = (quiz.timeLimit ?? 0) - timeLeft;

    try {
      // Correção no servidor: pontos reais atribuídos ao utilizador
      const submission = questions
        .filter((q) => answers[q.id] !== undefined)
        .map((q) => ({ questionId: q.id, selectedOptionId: answers[q.id] }));
      const api = await submitQuizApi(quiz.id, submission, timeSpent);
      const result: QuizResultView = {
        quizId: quiz.id,
        quizTitle: quiz.title,
        score: api.score,
        correctCount: api.correctAnswers,
        totalQuestions: api.totalQuestions,
        pointsEarned: api.pointsEarned,
        timeSpent,
        review: api.results.map((r) => {
          const question = questions.find((q) => q.id === r.questionId);
          const options = question?.options ?? [];
          return {
            question: question?.text ?? '',
            selectedText: options.find((o) => o.id === r.selectedOption)?.text ?? null,
            correctText: options.find((o) => o.id === r.correctOption)?.text ?? '',
            correct: r.correct,
            explanation: r.explanation,
          };
        }),
      };
      sessionStorage.setItem(`quiz-result-${quiz.id}`, JSON.stringify(result));
      router.push(`/quizzes/${quiz.id}/result`);
    } catch {
      setSubmitting(false);
      setSubmitError('Não foi possível submeter o quiz. Verifique a ligação ao servidor.');
    }
  }, [quiz, questions, answers, timeLeft, submitting, router]);

  // Timer countdown; submete automaticamente quando o tempo acaba
  useEffect(() => {
    if (!started || !quiz?.timeLimit) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [started, timeLeft, quiz?.timeLimit, handleSubmit]);

  if (loading) return <PageLoading />;

  if (!quiz || questions.length === 0) {
    if (error && !error.includes('não encontrado')) {
      return <PageError message={error} onRetry={retry} />;
    }
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card>
            <CardContent className="p-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz não encontrado</h2>
              <p className="text-gray-600 mb-6">O quiz que procura não existe ou foi removido.</p>
              <Link href="/quizzes">
                <Button variant="primary">Voltar aos Quizzes</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Ecrã de introdução
  if (!started) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-6">
        <Link href="/quizzes">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar aos Quizzes
          </Button>
        </Link>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#8B0000]/10 mx-auto mb-6">
                <Brain className="h-8 w-8 text-[#8B0000]" />
              </div>
              <span className="text-sm font-medium text-[#8B0000]">{quiz.category}</span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">{quiz.title}</h1>
              <p className="text-gray-600 mb-8">{quiz.description}</p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="rounded-lg bg-gray-50 p-4">
                  <Brain className="w-5 h-5 text-[#8B0000] mx-auto mb-2" />
                  <p className="text-lg font-bold text-gray-900">{questions.length}</p>
                  <p className="text-xs text-gray-500">Questões</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <Trophy className="w-5 h-5 text-[#8B0000] mx-auto mb-2" />
                  <p className="text-lg font-bold text-gray-900">{quiz.points}</p>
                  <p className="text-xs text-gray-500">Pontos</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <Clock className="w-5 h-5 text-[#8B0000] mx-auto mb-2" />
                  <p className="text-lg font-bold text-gray-900">
                    {quiz.timeLimit ? formatTime(quiz.timeLimit) : '—'}
                  </p>
                  <p className="text-xs text-gray-500">Tempo Limite</p>
                </div>
              </div>

              <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4 mb-8 text-left">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">Antes de começar:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>O cronómetro começa assim que clicar em "Começar"</li>
                      <li>Pode navegar entre questões e rever as suas respostas</li>
                      <li>O quiz é submetido automaticamente quando o tempo acabar</li>
                      <li>Os pontos ganhos contam para o seu nível e para o ranking</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button variant="primary" size="lg" className="w-full" onClick={handleStart}>
                Começar Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const isLast = currentIndex === questions.length - 1;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Top Bar: progresso e timer */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{quiz.title}</h1>
          <p className="text-sm text-gray-500">
            Questão {currentIndex + 1} de {questions.length} • {answeredCount} respondidas
          </p>
        </div>
        {quiz.timeLimit && (
          <div
            className={`flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-lg font-bold ${
              timeLeft <= 60 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-900'
            }`}
          >
            <Clock className="w-5 h-5" />
            {formatTime(timeLeft)}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-[#8B0000] h-2 rounded-full transition-all"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="max-w-3xl mx-auto w-full">
        <Card>
          <CardContent className="p-8">
            <span className="text-xs font-medium text-gray-500 uppercase">
              {question.type === 'TRUE_FALSE' ? 'Verdadeiro ou Falso' : 'Escolha Múltipla'}
            </span>
            <h2 className="text-xl font-bold text-gray-900 mt-2 mb-6">{question.text}</h2>

            <div className="space-y-3">
              {question.options.map((option, optionIndex) => {
                const isSelected = answers[question.id] === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: option.id }))}
                    className={`w-full flex items-center gap-4 rounded-lg border-2 p-4 text-left transition-colors ${
                      isSelected
                        ? 'border-[#8B0000] bg-[#8B0000]/5'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                        isSelected
                          ? 'border-[#8B0000] bg-[#8B0000] text-white'
                          : 'border-gray-300 text-gray-400'
                      }`}
                    >
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    <span className={`text-sm ${isSelected ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Submit error */}
        {submitError && (
          <p className="mt-4 text-center text-sm text-red-600">{submitError}</p>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentIndex((i) => i - 1)}
            disabled={currentIndex === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </Button>

          {/* Question dots */}
          <div className="hidden md:flex items-center gap-2">
            {questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(index)}
                className={`h-8 w-8 rounded-full text-xs font-bold transition-colors ${
                  index === currentIndex
                    ? 'bg-[#8B0000] text-white'
                    : answers[q.id]
                      ? 'bg-[#8B0000]/20 text-[#8B0000]'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {isLast ? (
            <Button
              variant="primary"
              disabled={submitting}
              onClick={() => {
                if (answeredCount < questions.length) {
                  setShowConfirm(true);
                } else {
                  handleSubmit();
                }
              }}
            >
              {submitting ? 'A submeter...' : 'Submeter Quiz'}
            </Button>
          ) : (
            <Button variant="primary" onClick={() => setCurrentIndex((i) => i + 1)} className="gap-2">
              Próxima
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="max-w-md w-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Submeter quiz incompleto?</h3>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Ainda tem {questions.length - answeredCount}{' '}
                {questions.length - answeredCount === 1 ? 'questão por responder' : 'questões por responder'}.
                Questões sem resposta contam como incorretas.
              </p>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowConfirm(false)}>
                  Continuar a Responder
                </Button>
                <Button variant="primary" disabled={submitting} onClick={handleSubmit}>
                  Submeter Mesmo Assim
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
