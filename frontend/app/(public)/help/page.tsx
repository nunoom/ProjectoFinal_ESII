import Link from 'next/link';
import { BookOpen, Brain, Trophy, MessageSquare, HelpCircle, Mail } from 'lucide-react';
import InfoPage from '@/components/layout/InfoPage';

const helpSections = [
  {
    icon: BookOpen,
    title: 'Conteúdos',
    description:
      'Explore a biblioteca de conteúdos sobre história económica angolana. Use a pesquisa e os filtros por categoria para encontrar temas do seu interesse.',
  },
  {
    icon: Brain,
    title: 'Quizzes',
    description:
      'Teste os seus conhecimentos com quizzes de vários níveis de dificuldade. Cada quiz tem tempo limite e atribui pontos consoante o seu desempenho.',
  },
  {
    icon: Trophy,
    title: 'Ranking e Pontos',
    description:
      'Acumule pontos ao completar quizzes e ler conteúdos. Acompanhe a sua posição no ranking e conquiste badges à medida que progride.',
  },
  {
    icon: MessageSquare,
    title: 'Fórum',
    description:
      'Participe nas discussões, crie novos tópicos e responda a outros estudantes. Mantenha sempre uma conduta respeitosa.',
  },
];

export default function HelpPage() {
  return (
    <InfoPage
      title="Centro de Ajuda"
      subtitle="Aprenda a tirar o máximo partido da plataforma"
    >
      <div className="space-y-6">
        {helpSections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.title} className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#8B0000]/10">
                <Icon className="h-6 w-6 text-[#8B0000]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900 mb-1">{section.title}</h2>
                <p className="text-sm text-gray-700 leading-relaxed">{section.description}</p>
              </div>
            </div>
          );
        })}

        <div className="rounded-lg bg-gray-50 p-6 mt-8">
          <div className="flex items-center gap-3 mb-3">
            <HelpCircle className="h-5 w-5 text-[#8B0000]" />
            <h2 className="text-base font-bold text-gray-900">Ainda tem dúvidas?</h2>
          </div>
          <p className="text-sm text-gray-700 mb-4">
            Consulte as{' '}
            <Link href="/faq" className="font-medium text-[#8B0000] hover:text-[#6B0000]">
              Perguntas Frequentes
            </Link>{' '}
            ou entre em contacto com a nossa equipa.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#8B0000] hover:text-[#6B0000]"
          >
            <Mail className="h-4 w-4" />
            Ir para a página de Contacto
          </Link>
        </div>
      </div>
    </InfoPage>
  );
}
