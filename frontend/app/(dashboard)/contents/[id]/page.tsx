'use client';

import { use } from 'react';
import { ArrowLeft, Clock, Eye, Calendar, BookOpen, Share2, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { categories } from '@/lib/categories';
import { fetchContent, fetchContents, ApiError } from '@/lib/api';
import { useApi } from '@/lib/useApiData';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageLoading, PageError } from '@/components/ui/Status';
import { formatDate } from '@/lib/utils';

export default function ContentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const contentId = parseInt(id);

  const { data: content, loading, error, retry } = useApi(() => fetchContent(contentId));
  const { data: allContents } = useApi(fetchContents);

  if (loading) return <PageLoading />;

  if (!content) {
    if (error && !error.includes('não encontrado')) {
      return <PageError message={error} onRetry={retry} />;
    }
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card>
          <CardContent className="p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Conteúdo não encontrado</h2>
            <p className="text-gray-600 mb-6">O conteúdo que procura não existe ou foi removido.</p>
            <Link href="/contents">
              <Button variant="primary">Voltar aos Conteúdos</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const categoryColor = categories.find(c => c.name === content.category)?.color || '#8B0000';

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Back Button */}
      <Link href="/contents">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar aos Conteúdos
        </Button>
      </Link>

      {/* Hero Image */}
      <div className="relative h-96 rounded-2xl overflow-hidden">
        <img
          src={content.imageUrl}
          alt={content.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="mb-4">
            <span
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{ backgroundColor: categoryColor }}
            >
              {content.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(content.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{content.readTime} min de leitura</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{content.views.toLocaleString()} visualizações</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-8">
              {/* Summary */}
              <div className="mb-8 p-6 bg-gray-50 rounded-lg border-l-4" style={{ borderColor: categoryColor }}>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Resumo</h3>
                <p className="text-gray-700">{content.summary}</p>
              </div>

              {/* Full Content */}
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: content.body }}
                style={{
                  '--tw-prose-headings': '#1F2937',
                  '--tw-prose-links': categoryColor,
                } as any}
              />

              {/* Actions */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2">
                      <Bookmark className="w-4 h-4" />
                      Guardar
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Share2 className="w-4 h-4" />
                      Partilhar
                    </Button>
                  </div>
                  <Button variant="primary" className="gap-2">
                    <BookOpen className="w-4 h-4" />
                    Marcar como Lido
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Related Contents */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Conteúdos Relacionados</h3>
              <div className="space-y-4">
                {(allContents ?? [])
                  .filter((c) => c.id !== content.id && c.category === content.category)
                  .slice(0, 3)
                  .map((relatedContent) => (
                    <Link key={relatedContent.id} href={`/contents/${relatedContent.id}`}>
                      <div className="group cursor-pointer">
                        <div className="flex gap-3">
                          <img
                            src={relatedContent.imageUrl}
                            alt={relatedContent.title}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#8B0000] transition-colors line-clamp-2 mb-1">
                              {relatedContent.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>{relatedContent.readTime} min</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
              <Link href="/contents">
                <Button variant="outline" className="w-full mt-4">
                  Ver Todos os Conteúdos
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quiz CTA */}
          <Card className="bg-gradient-to-br from-[#8B0000] to-[#6B0000] text-white">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-2">Teste seus Conhecimentos</h3>
              <p className="text-sm text-white/90 mb-4">
                Faça um quiz sobre este tema e ganhe pontos!
              </p>
              <Link href="/quizzes">
                <Button variant="outline" className="w-full bg-white text-[#8B0000] hover:bg-gray-100">
                  Ver Quizzes
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Progress Card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Seu Progresso</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Conteúdos lidos</span>
                  <span className="font-semibold text-gray-900">12 / 50</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#8B0000] h-2 rounded-full" style={{ width: '24%' }} />
                </div>
                <p className="text-xs text-gray-500">Continue lendo para desbloquear badges!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
