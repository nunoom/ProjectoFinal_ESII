export interface User {
  id: number;
  name: string;
  email: string;
  photoUrl?: string;
  bio?: string;
  points: number;
  level: number;
  role: 'USER' | 'MODERATOR' | 'ADMIN';
}

export interface Content {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  category: string;
  readTime: number;
  views: number;
  createdAt: string;
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  questionCount: number;
  points: number;
  timeLimit?: number;
  completed: boolean;
}

export interface Question {
  id: number;
  text: string;
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE';
  options: QuestionOption[];
  correctOptionId: number;
}

export interface QuestionOption {
  id: number;
  text: string;
}

export interface RankingEntry {
  position: number;
  userId: number;
  userName: string;
  photoUrl?: string;
  points: number;
  level: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface ForumTopic {
  id: number;
  title: string;
  author: string;
  authorPhotoUrl?: string;
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
  isPinned?: boolean;
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
  category: string;
}

export interface Notification {
  id: number;
  type: 'badge' | 'quiz' | 'ranking' | 'content' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  icon: string;
}

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  VerifyEmail: { email: string };
  ForgotPassword: undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;
  ContentDetail: { contentId: number };
  QuizPlay: { quizId: number };
  QuizResult: {
    quizId: number;
    score: number;
    total: number;
    timeSpent: number;
    pointsEarned: number;
    percentage: number;
  };
  Forum: undefined;
  Badges: undefined;
  Settings: undefined;
  EditProfile: undefined;
  Notifications: undefined;
};
