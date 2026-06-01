'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Heart, Share2, Printer, Clock, Eye, Calendar, BookOpen } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockContents } from '@/data/mockData';
import { formatDate, formatNumber } from '@/lib/utils';

export default function ContentDetailPage() {
  const params = useParams();
  const contentId = parseInt(params.id as string);
  const content = mockContents.find(c => c.id === contentId);

  if (!content) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Conteúdo não encontrado
        </h1>
        <p className="text-gray-600 mb-6">
          O conteúdo que procura não existe ou foi removido.
        </p>
        <Link href="/contents">
          <Button variant="primary">
            Voltar para Conteúdos
          </Button>
        </Link>
      </div>
    );
  }

  // Conteúdos relacionados (mesma categoria)
  const relatedContents = mockContents
    .filter(c => c.id !== content.id && c.category === content.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="border-b bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <Link href="/contents">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Conteúdos
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[400px] w-full">
        <img
          src={content.imageUrl}
          alt={content.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto max-w-4xl">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-[#8B0000] rounded-full mb-4">
              {content.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {content.title}
            </h1>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{content.readTime} min de leitura</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{formatNumber(content.views)} visualizações</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(content.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Actions Bar */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Heart className="mr-2 h-4 w-4" />
                Favoritar
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Imprimir
              </Button>
            </div>
            <div className="text-sm text-gray-500">
              <BookOpen className="inline h-4 w-4 mr-1" />
              Artigo educacional
            </div>
          </div>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            {/* Lead/Summary */}
            <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
              {content.summary}
            </p>

            {/* Main Content */}
            <div className="space-y-6 text-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Introdução
              </h2>
              <p>
                A história económica de Angola é marcada por transformações profundas que 
                moldaram o desenvolvimento do país ao longo das décadas. Este conteúdo 
                explora os principais eventos e fatores que influenciaram a economia angolana, 
                desde o período colonial até os dias atuais.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Contexto Histórico
              </h2>
              <p>
                Durante o período colonial, a economia angolana era predominantemente baseada 
                na agricultura e na extração de recursos naturais. O café, o algodão e os 
                diamantes eram os principais produtos de exportação, controlados por empresas 
                portuguesas e internacionais.
              </p>
              <p>
                Com a independência em 1975, Angola enfrentou desafios significativos na 
                reestruturação da sua economia. A guerra civil que se seguiu teve um impacto 
                devastador no desenvolvimento económico do país, destruindo infraestruturas 
                e deslocando milhões de pessoas.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Desenvolvimento Económico
              </h2>
              <p>
                Nas últimas décadas, Angola tem trabalhado na diversificação da sua economia, 
                reduzindo a dependência do petróleo e investindo em setores como a agricultura, 
                turismo e tecnologia. O governo implementou várias reformas económicas visando 
                atrair investimento estrangeiro e promover o empreendedorismo local.
              </p>

              {/* Highlight Box */}
              <div className="bg-[#8B0000]/5 border-l-4 border-[#8B0000] p-6 my-8">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Ponto-chave
                </h3>
                <p className="text-gray-700 mb-0">
                  A diversificação económica é fundamental para o desenvolvimento sustentável 
                  de Angola, reduzindo a vulnerabilidade às flutuações dos preços do petróleo 
                  no mercado internacional.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Desafios e Oportunidades
              </h2>
              <p>
                Apesar dos progressos alcançados, Angola ainda enfrenta desafios significativos, 
                incluindo a necessidade de melhorar a infraestrutura, combater a corrupção e 
                promover a educação e formação profissional. No entanto, o país possui um 
                enorme potencial, com recursos naturais abundantes, uma população jovem e 
                dinâmica, e uma localização estratégica no continente africano.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Conclusão
              </h2>
              <p>
                A história económica de Angola é uma narrativa de resiliência e transformação. 
                Compreender este percurso é essencial para apreciar os desafios atuais e as 
                oportunidades futuras que o país enfrenta no seu caminho para o desenvolvimento 
                sustentável e a prosperidade.
              </p>
            </div>
          </article>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Tópicos relacionados:
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer">
                História Económica
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer">
                {content.category}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer">
                Desenvolvimento
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer">
                Angola
              </span>
            </div>
          </div>

          {/* Related Contents */}
          {relatedContents.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Conteúdos Relacionados
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedContents.map(related => (
                  <Link
                    key={related.id}
                    href={`/contents/${related.id}`}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <div className="relative h-40 overflow-hidden rounded-t-lg">
                        <img
                          src={related.imageUrl}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <span className="absolute top-2 left-2 px-2 py-1 text-xs font-medium text-white bg-[#8B0000] rounded-full">
                          {related.category}
                        </span>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#8B0000] transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {related.summary}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {related.readTime} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {formatNumber(related.views)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-12 p-8 bg-gradient-to-r from-[#8B0000] to-[#6B0000] rounded-2xl text-white text-center">
            <h3 className="text-2xl font-bold mb-3">
              Gostou deste conteúdo?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Teste seus conhecimentos com um quiz sobre este tema e ganhe pontos!
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/quizzes">
                <Button variant="secondary" size="lg">
                  Fazer Quiz
                </Button>
              </Link>
              <Link href="/contents">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-[#8B0000]"
                >
                  Ver Mais Conteúdos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
