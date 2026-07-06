// Types para o projeto EHA

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
  explanation?: string;
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

export interface ForumTopic {
  id: number;
  title: string;
  description?: string;
  category: string;
  author: {
    id: number;
    name: string;
    photoUrl?: string;
  };
  replyCount: number;
  views: number;
  lastReplyAt: string;
  createdAt: string;
}

export interface ForumReply {
  id: number;
  topicId: number;
  author: {
    id: number;
    name: string;
    photoUrl?: string;
  };
  text: string;
  likes: number;
  createdAt: string;
}

export interface QuizResult {
  quizId: number;
  answers: Record<number, number>;
  correctCount: number;
  totalQuestions: number;
  pointsEarned: number;
  timeSpent: number;
  completedAt: string;
}

// Vista de resultado guardada em sessionStorage entre a página do quiz e a de resultado.
// Produzida tanto pela correção local (mock) como pela resposta da API.
export interface QuizResultView {
  quizId: number;
  quizTitle: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  pointsEarned: number;
  timeSpent: number;
  review: {
    question: string;
    selectedText: string | null;
    correctText: string;
    correct: boolean;
    explanation?: string;
  }[];
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
}
