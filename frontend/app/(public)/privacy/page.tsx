import InfoPage from '@/components/layout/InfoPage';

export default function PrivacyPage() {
  return (
    <InfoPage
      title="Política de Privacidade"
      subtitle="Última atualização: 1 de junho de 2026"
    >
      <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">1. Dados Recolhidos</h2>
          <p>
            Recolhemos apenas os dados necessários ao funcionamento da plataforma: nome, endereço
            de email e dados de utilização (conteúdos lidos, resultados de quizzes, participações
            no fórum e pontuações).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">2. Finalidade do Tratamento</h2>
          <p>
            Os dados são utilizados para: autenticação e gestão de conta, personalização da
            experiência de aprendizagem, cálculo de rankings e atribuição de badges, e melhoria da
            plataforma.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">3. Partilha de Dados</h2>
          <p>
            Não vendemos nem partilhamos os seus dados pessoais com terceiros. O seu nome e
            pontuação são visíveis publicamente apenas no ranking e nas suas participações no
            fórum.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">4. Segurança</h2>
          <p>
            Aplicamos medidas técnicas adequadas para proteger os seus dados, incluindo
            encriptação de passwords e comunicações seguras (HTTPS).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">5. Direitos do Utilizador</h2>
          <p>
            Pode a qualquer momento aceder, corrigir ou eliminar os seus dados pessoais através da
            página de perfil, ou contactando a equipa através da página de contacto.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">6. Contexto Académico</h2>
          <p>
            Esta plataforma foi desenvolvida no âmbito da disciplina de Engenharia de Software II
            do ISPTEC. Os dados introduzidos podem ser utilizados apenas para fins de demonstração
            e avaliação académica.
          </p>
        </section>
      </div>
    </InfoPage>
  );
}
