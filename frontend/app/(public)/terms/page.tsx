import InfoPage from '@/components/layout/InfoPage';

export default function TermsPage() {
  return (
    <InfoPage
      title="Termos e Condições"
      subtitle="Última atualização: 1 de junho de 2026"
    >
      <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">1. Aceitação dos Termos</h2>
          <p>
            Ao aceder e utilizar a plataforma Economia com História: Angola (EHA), o utilizador
            aceita os presentes Termos e Condições. Se não concordar com algum dos termos, não
            deverá utilizar a plataforma.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">2. Objeto da Plataforma</h2>
          <p>
            A EHA é uma plataforma educacional desenvolvida no âmbito académico (ISPTEC —
            Engenharia de Software II) que disponibiliza conteúdos, quizzes e fóruns de discussão
            sobre a história económica de Angola. Os conteúdos têm fins exclusivamente educativos.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">3. Conta de Utilizador</h2>
          <p>
            O utilizador é responsável por manter a confidencialidade das suas credenciais de
            acesso e por todas as atividades realizadas na sua conta. Deve fornecer informações
            verdadeiras no registo e notificar-nos de qualquer uso não autorizado.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">4. Conduta no Fórum</h2>
          <p>
            Nos fóruns de discussão não é permitido publicar conteúdo ofensivo, discriminatório,
            ilegal ou fora do tema. Os moderadores reservam-se o direito de remover publicações e
            suspender contas que violem estas regras.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">5. Propriedade Intelectual</h2>
          <p>
            Os conteúdos educacionais disponibilizados na plataforma são protegidos por direitos de
            autor. É permitida a sua utilização para fins pessoais e educativos, sendo proibida a
            reprodução comercial sem autorização.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">6. Alterações aos Termos</h2>
          <p>
            Reservamo-nos o direito de atualizar estes termos a qualquer momento. As alterações
            entram em vigor após a sua publicação na plataforma.
          </p>
        </section>
      </div>
    </InfoPage>
  );
}
