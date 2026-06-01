import Link from 'next/link';
import { ArrowRight, BookOpen, Brain, Trophy, Users, CheckCircle, Star } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8B0000]">
              <span className="text-xl font-bold text-white">E</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Economia com História
              </h1>
              <p className="text-xs text-gray-500">Angola</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link href="/register">
              <Button variant="primary">Começar Grátis</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#8B0000] via-[#6B0000] to-[#4B0000] py-20 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
              <Star className="mr-2 h-4 w-4 text-yellow-300" />
              Plataforma educacional 100% gratuita
            </div>
            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
              Aprenda História Económica de Angola
            </h1>
            <p className="mb-8 text-xl text-white/90 md:text-2xl">
              Explore conteúdos interativos, teste seus conhecimentos com quizzes
              e participe de discussões com outros estudantes.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Criar Conta Grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-white bg-transparent text-white hover:bg-white hover:text-[#8B0000] sm:w-auto"
                >
                  Já tenho conta
                </Button>
              </Link>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span>Sem custos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span>Acesso offline</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span>Certificados</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Tudo o que precisa para aprender
            </h2>
            <p className="text-xl text-gray-600">
              Uma plataforma completa para estudar história económica angolana
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg">
              <div className="mb-4 inline-flex rounded-lg bg-blue-100 p-3">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                Conteúdos Ricos
              </h3>
              <p className="text-gray-600">
                Artigos, vídeos e infográficos sobre petróleo, kwanza, agricultura e mais.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg">
              <div className="mb-4 inline-flex rounded-lg bg-green-100 p-3">
                <Brain className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                Quizzes Interativos
              </h3>
              <p className="text-gray-600">
                Teste seus conhecimentos com quizzes de diferentes níveis de dificuldade.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg">
              <div className="mb-4 inline-flex rounded-lg bg-yellow-100 p-3">
                <Trophy className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                Sistema de Ranking
              </h3>
              <p className="text-gray-600">
                Compete com outros estudantes e suba no ranking global e semanal.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg">
              <div className="mb-4 inline-flex rounded-lg bg-purple-100 p-3">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                Fórum de Discussão
              </h3>
              <p className="text-gray-600">
                Participe de discussões e troque ideias com outros estudantes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-[#8B0000]">500+</div>
              <div className="text-gray-600">Conteúdos Educacionais</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-[#8B0000]">200+</div>
              <div className="text-gray-600">Quizzes Disponíveis</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-[#8B0000]">10K+</div>
              <div className="text-gray-600">Estudantes Ativos</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-[#8B0000]">95%</div>
              <div className="text-gray-600">Taxa de Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Tópicos Abordados
            </h2>
            <p className="text-xl text-gray-600">
              Explore diversos temas da história económica angolana
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Petróleo', color: 'bg-red-500', count: '45 conteúdos' },
              { name: 'Kwanza', color: 'bg-yellow-500', count: '32 conteúdos' },
              { name: 'Guerra Civil', color: 'bg-gray-500', count: '28 conteúdos' },
              { name: 'Agricultura', color: 'bg-green-500', count: '38 conteúdos' },
              { name: 'Reformas', color: 'bg-blue-500', count: '25 conteúdos' },
              { name: 'Comércio', color: 'bg-orange-500', count: '30 conteúdos' },
            ].map((topic) => (
              <div
                key={topic.name}
                className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg"
              >
                <div className={`h-12 w-12 rounded-lg ${topic.color}`}></div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{topic.name}</h3>
                  <p className="text-sm text-gray-600">{topic.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#8B0000] to-[#6B0000] py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Pronto para começar a aprender?
          </h2>
          <p className="mb-8 text-xl text-white/90">
            Junte-se a milhares de estudantes que já estão aprendendo com a EHA
          </p>
          <Link href="/register">
            <Button variant="secondary" size="lg">
              Criar Conta Grátis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8B0000]">
                  <span className="text-xl font-bold text-white">E</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">EHA</h3>
                  <p className="text-xs text-gray-500">Angola</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Democratizando o acesso ao conhecimento sobre história económica angolana.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-bold text-gray-900">Plataforma</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/contents" className="hover:text-[#8B0000]">Conteúdos</Link></li>
                <li><Link href="/quizzes" className="hover:text-[#8B0000]">Quizzes</Link></li>
                <li><Link href="/ranking" className="hover:text-[#8B0000]">Ranking</Link></li>
                <li><Link href="/forum" className="hover:text-[#8B0000]">Fórum</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-bold text-gray-900">Suporte</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/help" className="hover:text-[#8B0000]">Central de Ajuda</Link></li>
                <li><Link href="/faq" className="hover:text-[#8B0000]">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-[#8B0000]">Contacto</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-bold text-gray-900">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/privacy" className="hover:text-[#8B0000]">Privacidade</Link></li>
                <li><Link href="/terms" className="hover:text-[#8B0000]">Termos de Uso</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>© 2026 Economia com História: Angola. Todos os direitos reservados.</p>
            <p className="mt-2">Desenvolvido por Equipa EHA - ISPTEC</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
