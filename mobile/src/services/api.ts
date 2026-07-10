// Cliente da API REST do backend Spring Boot (docs/api/01-endpoints.md).
// Todos os ecrãs carregam dados exclusivamente desta API.

import { Platform } from 'react-native';
import { User, Content, Quiz, RankingEntry, ForumTopic, Badge } from '../types';

// Em produção, definir EXPO_PUBLIC_API_URL (ex.: https://eha-api.up.railway.app/api).
// Sem essa variável, usa o backend local: no emulador Android "localhost" é o
// próprio emulador, por isso usa-se 10.0.2.2.
const API_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  Platform.select({
    android: 'http://10.0.2.2:8080/api',
    default: 'http://localhost:8080/api',
  });

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const SERVER_ERROR_MESSAGE =
  'Não foi possível ligar ao servidor. Verifique se o backend está a correr.';

// Sessão em memória (dura enquanto a app estiver aberta)
let authToken: string | null = null;
let currentUser: User | null = null;

export function getCurrentUser(): User | null {
  return currentUser;
}

export function isLoggedIn(): boolean {
  return authToken !== null;
}

export function logout() {
  authToken = null;
  currentUser = null;
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init?.headers as Record<string, string>),
  };
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const response = await fetch(`${API_URL}${path}`, { ...init, headers });
  if (!response.ok) {
    let message = `Erro ${response.status}`;
    try {
      const body = await response.json();
      if (body.message) message = body.message;
    } catch {
      // resposta sem corpo JSON
    }
    throw new ApiError(response.status, message);
  }
  return (await response.json()) as T;
}

// ---------- Auth ----------

export async function apiLogin(email: string, password: string): Promise<User> {
  const data = await apiFetch<{ token: string; refreshToken: string; user: User }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  authToken = data.token;
  currentUser = data.user;
  return data.user;
}

export async function apiRegister(name: string, email: string, password: string): Promise<void> {
  // A conta fica pendente de verificação: o backend envia um código por email
  await apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

export async function verifyEmail(email: string, code: string): Promise<string> {
  const data = await apiFetch<{ message: string }>('/auth/verify-email', {
    method: 'POST',
    body: JSON.stringify({ email, code }),
  });
  return data.message;
}

export async function resendCode(email: string): Promise<string> {
  const data = await apiFetch<{ message: string }>('/auth/resend-code', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
  return data.message;
}

export async function forgotPassword(email: string): Promise<string> {
  const data = await apiFetch<{ message: string }>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
  return data.message;
}

export async function resetPassword(
  email: string,
  code: string,
  newPassword: string
): Promise<string> {
  const data = await apiFetch<{ message: string }>('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ email, code, newPassword }),
  });
  return data.message;
}

export async function updateProfile(name: string, bio: string): Promise<User> {
  const user = await apiFetch<User>('/users/me', {
    method: 'PUT',
    body: JSON.stringify({ name, bio }),
  });
  currentUser = user;
  return user;
}

// ---------- Conteúdos ----------

export async function fetchContents(): Promise<Content[]> {
  const data = await apiFetch<{ content: Content[] }>('/contents?size=100');
  return data.content;
}

export async function fetchContent(id: number): Promise<Content & { body: string }> {
  const data = await apiFetch<Content & { content: string }>(`/contents/${id}`);
  return { ...data, body: data.content };
}

// ---------- Quizzes ----------

export async function fetchQuizzes(): Promise<Quiz[]> {
  const data = await apiFetch<{ quizzes: Quiz[] }>('/quizzes');
  return data.quizzes;
}

export interface QuizQuestion {
  id: number;
  text: string;
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE';
  options: { id: number; text: string }[];
}

export interface QuizDetail {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: Quiz['difficulty'];
  points: number;
  timeLimit?: number;
  questions: QuizQuestion[];
}

export async function fetchQuizDetail(id: number): Promise<QuizDetail> {
  return apiFetch<QuizDetail>(`/quizzes/${id}`);
}

export interface SubmitResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  pointsEarned: number;
  passed: boolean;
}

export async function submitQuiz(
  quizId: number,
  answers: { questionId: number; selectedOptionId: number }[],
  timeSpent: number
): Promise<SubmitResult> {
  const result = await apiFetch<SubmitResult>(`/quizzes/${quizId}/submit`, {
    method: 'POST',
    body: JSON.stringify({ answers, timeSpent }),
  });
  // Atualizar os pontos do utilizador em sessão
  if (currentUser) {
    currentUser = {
      ...currentUser,
      points: currentUser.points + result.pointsEarned,
      level: Math.floor((currentUser.points + result.pointsEarned) / 100) + 1,
    };
  }
  return result;
}

// ---------- Ranking ----------

export async function fetchRanking(): Promise<RankingEntry[]> {
  const data = await apiFetch<{ rankings: RankingEntry[] }>('/ranking/global');
  return data.rankings;
}

// ---------- Fórum ----------

interface ApiTopic {
  id: number;
  title: string;
  category: string;
  author: { id: number; name: string; photoUrl?: string };
  replyCount: number;
  views: number;
  lastReplyAt: string;
  createdAt: string;
}

export async function fetchForumTopics(): Promise<ForumTopic[]> {
  const data = await apiFetch<{ topics: ApiTopic[] }>('/forum/topics');
  return data.topics.map((t) => ({
    id: t.id,
    title: t.title,
    author: t.author.name,
    authorPhotoUrl: t.author.photoUrl,
    category: t.category,
    replies: t.replyCount,
    views: t.views,
    lastActivity: t.lastReplyAt,
  }));
}

// ---------- Badges ----------

interface ApiBadge {
  id: number;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
}

export async function fetchBadges(): Promise<Badge[]> {
  const data = await apiFetch<ApiBadge[]>('/badges');
  return data.map((b) => ({
    id: b.id,
    name: b.name,
    description: b.description,
    icon: b.icon,
    unlocked: b.earned,
    unlockedAt: b.earnedAt,
    category: 'Geral',
  }));
}
