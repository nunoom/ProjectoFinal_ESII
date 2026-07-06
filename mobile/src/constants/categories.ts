import { Category } from '../types';

// Categorias temáticas da plataforma (configuração da aplicação).
// O campo icon é um nome de ícone Ionicons.
export const categories: Category[] = [
  { id: 'petroleo', name: 'Petróleo', color: '#8B0000', icon: 'water' },
  { id: 'kwanza', name: 'Kwanza', color: '#B8860B', icon: 'cash' },
  { id: 'guerra-civil', name: 'Guerra Civil', color: '#696969', icon: 'shield' },
  { id: 'agricultura', name: 'Agricultura', color: '#228B22', icon: 'leaf' },
  { id: 'reformas', name: 'Reformas', color: '#4169E1', icon: 'stats-chart' },
  { id: 'comercio', name: 'Comércio', color: '#B45309', icon: 'boat' },
];

// Mapeia o slug de ícone dos badges (API) para Ionicons
export const badgeIcons: Record<string, string> = {
  target: 'flag',
  'book-open': 'book',
  star: 'star',
  award: 'ribbon',
  library: 'library',
  'message-circle': 'chatbubbles',
};
