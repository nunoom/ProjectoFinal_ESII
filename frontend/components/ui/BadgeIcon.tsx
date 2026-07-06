import {
  Target,
  BookOpen,
  Star,
  Award,
  Library,
  MessageCircle,
  Medal,
  LucideIcon,
} from 'lucide-react';

// A API guarda um slug de ícone por badge; aqui mapeia-se para lucide
const iconMap: Record<string, LucideIcon> = {
  target: Target,
  'book-open': BookOpen,
  star: Star,
  award: Award,
  library: Library,
  'message-circle': MessageCircle,
};

export default function BadgeIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = iconMap[slug] ?? Medal;
  return <Icon className={className} />;
}
