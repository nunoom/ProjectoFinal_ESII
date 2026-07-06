// Cliente da API REST do backend Spring Boot (docs/api/01-endpoints.md).
// Todas as páginas usam este cliente com fallback para dados mock quando a
// API não está disponível (ver lib/useApiData.ts), pelo que o frontend
// continua funcional sem backend ligado.

import { User, Content, Quiz, RankingEntry, ForumTopic, ForumReply, Badge } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api';

const TOKEN_KEY = 'eha_token';
const REFRESH_KEY = 'eha_refresh_token';
const USER_KEY = 'eha_user';

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// ---------- Sessão (localStorage) ----------

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as User) : null;
}

export function storeAuth(token: string, refreshToken: string, user: User) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function storeUser(user: User) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isLoggedIn(): boolean {
  return getToken() !== null;
}

// ---------- Fetch base ----------

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init?.headers as Record<string, string>),
  };
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
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
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

// ---------- Auth ----------

interface ApiUser {
  id: number;
  name: string;
  email: string;
  bio?: string;
  photoUrl?: string;
  points: number;
  level: number;
  role: 'USER' | 'MODERATOR' | 'ADMIN';
}

function toUser(u: ApiUser): User {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    bio: u.bio,
    photoUrl: u.photoUrl,
    points: u.points,
    level: u.level,
    role: u.role,
  };
}

export async function apiLogin(email: string, password: string): Promise<User> {
  const data = await apiFetch<{ token: string; refreshToken: string; user: ApiUser }>(
    '/auth/login',
    { method: 'POST', body: JSON.stringify({ email, password }) }
  );
  const user = toUser(data.user);
  storeAuth(data.token, data.refreshToken, user);
  return user;
}

export async function apiRegister(name: string, email: string, password: string): Promise<void> {
  // A conta fica pendente de verificação: o backend envia um código por email
  await apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

export async function verifyEmailApi(email: string, code: string): Promise<string> {
  const data = await apiFetch<{ message: string }>('/auth/verify-email', {
    method: 'POST',
    body: JSON.stringify({ email, code }),
  });
  return data.message;
}

export async function resendCodeApi(email: string): Promise<string> {
  const data = await apiFetch<{ message: string }>('/auth/resend-code', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
  return data.message;
}

export async function fetchMe(): Promise<User> {
  const user = toUser(await apiFetch<ApiUser>('/users/me'));
  storeUser(user);
  return user;
}

export async function updateProfileApi(name: string, bio: string): Promise<User> {
  const user = toUser(
    await apiFetch<ApiUser>('/users/me', {
      method: 'PUT',
      body: JSON.stringify({ name, bio }),
    })
  );
  storeUser(user);
  return user;
}

// ---------- Conteúdos ----------

interface ApiContentSummary {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  category: string;
  readTime: number;
  views: number;
  createdAt: string;
}

export async function fetchContents(): Promise<Content[]> {
  const data = await apiFetch<{ content: ApiContentSummary[] }>('/contents?size=100');
  return data.content;
}

export async function fetchContent(id: number): Promise<Content & { body: string }> {
  const data = await apiFetch<ApiContentSummary & { content: string }>(`/contents/${id}`);
  return { ...data, body: data.content };
}

// ---------- Quizzes ----------

export async function fetchQuizzes(): Promise<Quiz[]> {
  const data = await apiFetch<{ quizzes: (Quiz & { difficulty: Quiz['difficulty'] })[] }>(
    '/quizzes'
  );
  return data.quizzes;
}

export interface ApiQuizQuestion {
  id: number;
  text: string;
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE';
  options: { id: number; text: string }[];
}

export interface ApiQuizDetail {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: Quiz['difficulty'];
  points: number;
  timeLimit?: number;
  questions: ApiQuizQuestion[];
}

export async function fetchQuizDetail(id: number): Promise<ApiQuizDetail> {
  return apiFetch<ApiQuizDetail>(`/quizzes/${id}`);
}

export interface ApiSubmitResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  pointsEarned: number;
  passed: boolean;
  results: {
    questionId: number;
    correct: boolean;
    selectedOption: number | null;
    correctOption: number;
    explanation?: string;
  }[];
}

export async function submitQuizApi(
  id: number,
  answers: { questionId: number; selectedOptionId: number }[],
  timeSpent: number
): Promise<ApiSubmitResult> {
  return apiFetch<ApiSubmitResult>(`/quizzes/${id}/submit`, {
    method: 'POST',
    body: JSON.stringify({ answers, timeSpent }),
  });
}

// ---------- Ranking ----------

export interface RankingData {
  rankings: RankingEntry[];
  currentUser: { position: number; points: number; level: number } | null;
}

export async function fetchRanking(): Promise<RankingData> {
  return apiFetch<RankingData>('/ranking/global');
}

// ---------- Fórum ----------

interface ApiTopicSummary {
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
  const data = await apiFetch<{ topics: ApiTopicSummary[] }>('/forum/topics');
  return data.topics;
}

export interface ApiTopicDetail {
  id: number;
  title: string;
  content: string;
  category: string;
  author: { id: number; name: string; photoUrl?: string };
  views: number;
  createdAt: string;
  replies: {
    id: number;
    content: string;
    author: { id: number; name: string; photoUrl?: string };
    likes: number;
    createdAt: string;
  }[];
}

export async function fetchForumTopic(
  id: number
): Promise<{ topic: ForumTopic; replies: ForumReply[] }> {
  const data = await apiFetch<ApiTopicDetail>(`/forum/topics/${id}`);
  return {
    topic: {
      id: data.id,
      title: data.title,
      description: data.content,
      category: data.category,
      author: data.author,
      replyCount: data.replies.length,
      views: data.views,
      lastReplyAt: data.createdAt,
      createdAt: data.createdAt,
    },
    replies: data.replies.map((r) => ({
      id: r.id,
      topicId: data.id,
      author: r.author,
      text: r.content,
      likes: r.likes,
      createdAt: r.createdAt,
    })),
  };
}

export async function createTopicApi(
  title: string,
  content: string,
  category: string
): Promise<number> {
  const data = await apiFetch<{ id: number }>('/forum/topics', {
    method: 'POST',
    body: JSON.stringify({ title, content, category }),
  });
  return data.id;
}

export async function createReplyApi(topicId: number, content: string): Promise<void> {
  await apiFetch(`/forum/topics/${topicId}/replies`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
}

// ---------- Badges e histórico ----------

interface ApiBadge {
  id: number;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
}

export async function fetchBadges(): Promise<Badge[]> {
  return apiFetch<ApiBadge[]>('/badges');
}

export interface QuizHistoryEntry {
  quizId: number;
  quizTitle: string;
  score: number;
  pointsEarned: number;
  completedAt: string;
}

export async function fetchQuizHistory(): Promise<QuizHistoryEntry[]> {
  const data = await apiFetch<{ attempts: QuizHistoryEntry[] }>('/quizzes/history');
  return data.attempts;
}
