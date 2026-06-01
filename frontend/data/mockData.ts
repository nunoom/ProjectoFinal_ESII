import { User, Content, Quiz, RankingEntry, ForumTopic, Badge } from '@/types';

// Mock User
export const mockUser: User = {
  id: 1,
  name: 'João Silva',
  email: 'joao@example.com',
  photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao',
  points: 350,
  level: 5,
  role: 'USER',
};

// Mock Contents
export const mockContents: Content[] = [
  {
    id: 1,
    title: 'História do Petróleo em Angola',
    summary: 'Descubra como o petróleo moldou a economia angolana desde a sua descoberta',
    imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800',
    category: 'Petróleo',
    readTime: 10,
    views: 1523,
    createdAt: '2026-04-15T10:00:00Z',
  },
  {
    id: 2,
    title: 'A Evolução do Kwanza',
    summary: 'A história da moeda nacional angolana e suas reformas monetárias',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800',
    category: 'Kwanza',
    readTime: 8,
    views: 987,
    createdAt: '2026-04-20T14:30:00Z',
  },
  {
    id: 3,
    title: 'Impacto Económico da Guerra Civil',
    summary: 'Como a guerra civil afetou a economia angolana e o processo de reconstrução',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800',
    category: 'Guerra Civil',
    readTime: 15,
    views: 2341,
    createdAt: '2026-04-10T09:00:00Z',
  },
  {
    id: 4,
    title: 'Agricultura em Angola',
    summary: 'O potencial agrícola de Angola e os desafios do setor',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
    category: 'Agricultura',
    readTime: 12,
    views: 756,
    createdAt: '2026-04-25T11:15:00Z',
  },
  {
    id: 5,
    title: 'Reformas Económicas Pós-Independência',
    summary: 'As principais reformas económicas implementadas após a independência',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    category: 'Reformas',
    readTime: 11,
    views: 1234,
    createdAt: '2026-04-18T16:45:00Z',
  },
  {
    id: 6,
    title: 'Comércio Internacional de Angola',
    summary: 'Principais parceiros comerciais e produtos de exportação',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800',
    category: 'Comércio',
    readTime: 9,
    views: 892,
    createdAt: '2026-04-22T13:20:00Z',
  },
];

// Mock Quizzes
export const mockQuizzes: Quiz[] = [
  {
    id: 1,
    title: 'Quiz: Petróleo em Angola',
    description: 'Teste seus conhecimentos sobre a história do petróleo angolano',
    category: 'Petróleo',
    difficulty: 'MEDIUM',
    questionCount: 10,
    points: 25,
    timeLimit: 600,
    completed: false,
  },
  {
    id: 2,
    title: 'Quiz: Moeda Nacional',
    description: 'Quanto você sabe sobre o Kwanza?',
    category: 'Kwanza',
    difficulty: 'EASY',
    questionCount: 8,
    points: 10,
    timeLimit: 480,
    completed: true,
  },
  {
    id: 3,
    title: 'Quiz: Guerra Civil e Economia',
    description: 'Impactos económicos do conflito armado',
    category: 'Guerra Civil',
    difficulty: 'HARD',
    questionCount: 15,
    points: 50,
    timeLimit: 900,
    completed: false,
  },
  {
    id: 4,
    title: 'Quiz: Setor Agrícola',
    description: 'Teste seus conhecimentos sobre agricultura angolana',
    category: 'Agricultura',
    difficulty: 'MEDIUM',
    questionCount: 12,
    points: 25,
    timeLimit: 720,
    completed: false,
  },
];

// Mock Ranking
export const mockRanking: RankingEntry[] = [
  {
    position: 1,
    userId: 5,
    userName: 'Maria Santos',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    points: 1250,
    level: 15,
  },
  {
    position: 2,
    userId: 12,
    userName: 'Pedro Costa',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
    points: 980,
    level: 12,
  },
  {
    position: 3,
    userId: 8,
    userName: 'Ana Ferreira',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    points: 875,
    level: 11,
  },
  {
    position: 4,
    userId: 15,
    userName: 'Carlos Mendes',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    points: 720,
    level: 9,
  },
  {
    position: 5,
    userId: 3,
    userName: 'Sofia Alves',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
    points: 650,
    level: 8,
  },
  {
    position: 6,
    userId: 1,
    userName: 'João Silva',
    photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao',
    points: 350,
    level: 5,
  },
];

// Mock Forum Topics
export const mockForumTopics: ForumTopic[] = [
  {
    id: 1,
    title: 'Impacto do petróleo na economia atual',
    category: 'Petróleo',
    author: {
      id: 5,
      name: 'Maria Santos',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    },
    replyCount: 15,
    views: 234,
    lastReplyAt: '2026-05-15T16:20:00Z',
    createdAt: '2026-05-10T10:00:00Z',
  },
  {
    id: 2,
    title: 'Discussão sobre reformas monetárias',
    category: 'Kwanza',
    author: {
      id: 12,
      name: 'Pedro Costa',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
    },
    replyCount: 8,
    views: 156,
    lastReplyAt: '2026-05-14T14:30:00Z',
    createdAt: '2026-05-12T09:15:00Z',
  },
  {
    id: 3,
    title: 'Potencial agrícola de Angola',
    category: 'Agricultura',
    author: {
      id: 8,
      name: 'Ana Ferreira',
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    },
    replyCount: 23,
    views: 412,
    lastReplyAt: '2026-05-16T11:45:00Z',
    createdAt: '2026-05-08T13:00:00Z',
  },
];

// Mock Badges
export const mockBadges: Badge[] = [
  {
    id: 1,
    name: 'Primeiro Passo',
    description: 'Complete seu primeiro quiz',
    icon: '🎯',
    earned: true,
    earnedAt: '2026-05-01T10:00:00Z',
  },
  {
    id: 2,
    name: 'Estudante Dedicado',
    description: 'Complete 10 quizzes',
    icon: '📚',
    earned: false,
  },
  {
    id: 3,
    name: 'Iniciante',
    description: 'Alcance 100 pontos',
    icon: '⭐',
    earned: true,
    earnedAt: '2026-05-05T14:30:00Z',
  },
  {
    id: 4,
    name: 'Intermediário',
    description: 'Alcance 500 pontos',
    icon: '🌟',
    earned: false,
  },
  {
    id: 5,
    name: 'Leitor Ávido',
    description: 'Leia 20 conteúdos',
    icon: '📖',
    earned: false,
  },
  {
    id: 6,
    name: 'Participante Ativo',
    description: 'Crie 10 posts no fórum',
    icon: '💬',
    earned: false,
  },
];

// Categories
export const categories = [
  { id: 'petroleo', name: 'Petróleo', color: '#8B0000' },
  { id: 'kwanza', name: 'Kwanza', color: '#FFD700' },
  { id: 'guerra-civil', name: 'Guerra Civil', color: '#696969' },
  { id: 'agricultura', name: 'Agricultura', color: '#228B22' },
  { id: 'reformas', name: 'Reformas', color: '#4169E1' },
  { id: 'comercio', name: 'Comércio', color: '#FF8C00' },
];
