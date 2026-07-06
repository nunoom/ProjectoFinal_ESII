import InfoPage from '@/components/layout/InfoPage';

const faqs = [
  {
    question: 'O que é a plataforma Economia com História: Angola?',
    answer:
      'É uma plataforma educacional que ensina a história económica de Angola através de conteúdos interativos, quizzes gamificados, fóruns de discussão e rankings competitivos.',
  },
  {
    question: 'A plataforma é gratuita?',
    answer:
      'Sim, a plataforma é totalmente gratuita. Foi desenvolvida com o objetivo de democratizar o acesso ao conhecimento sobre economia angolana.',
  },
  {
    question: 'Como ganho pontos e subo de nível?',
    answer:
      'Ganha pontos ao completar quizzes (quanto melhor o resultado, mais pontos), ler conteúdos e participar no fórum. Ao acumular pontos, sobe de nível e desbloqueia badges.',
  },
  {
    question: 'Posso refazer um quiz?',
    answer:
      'Sim, pode refazer qualquer quiz as vezes que quiser para melhorar o seu conhecimento e a sua pontuação.',
  },
  {
    question: 'Como funciona o ranking?',
    answer:
      'O ranking ordena os estudantes pela pontuação total acumulada. Pode consultar o ranking global, mensal ou semanal na página de Ranking.',
  },
  {
    question: 'Posso criar tópicos no fórum?',
    answer:
      'Sim, qualquer utilizador registado pode criar tópicos de discussão e responder aos tópicos existentes, desde que respeite as regras de conduta.',
  },
  {
    question: 'A plataforma funciona no telemóvel?',
    answer:
      'Sim. Além do site ser responsivo, existe uma aplicação móvel desenvolvida em React Native com suporte para Android e iOS.',
  },
];

export default function FaqPage() {
  return (
    <InfoPage
      title="Perguntas Frequentes"
      subtitle="Respostas às dúvidas mais comuns sobre a plataforma"
    >
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
            <h2 className="text-base font-bold text-gray-900 mb-2">{faq.question}</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </InfoPage>
  );
}
