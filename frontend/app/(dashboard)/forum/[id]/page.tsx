'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageSquare, Eye, ThumbsUp, Send } from 'lucide-react';
import { fetchForumTopic, createReplyApi, ApiError } from '@/lib/api';
import { useApi } from '@/lib/useApiData';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { PageLoading, PageError } from '@/components/ui/Status';
import { getStoredUser } from '@/lib/api';
import { formatDate, formatNumber } from '@/lib/utils';

export default function ForumTopicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const topicId = parseInt(id);

  const { data: topicData, loading, error, retry } = useApi(() => fetchForumTopic(topicId));

  const topic = topicData?.topic;
  const replies = topicData?.replies ?? [];
  const currentUser = getStoredUser();

  const [newReply, setNewReply] = useState('');
  const [replyError, setReplyError] = useState('');
  const [likedReplies, setLikedReplies] = useState<Set<number>>(new Set());

  if (loading) return <PageLoading />;

  if (!topic) {
    if (error && !error.includes('não encontrado')) {
      return <PageError message={error} onRetry={retry} />;
    }
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card>
            <CardContent className="p-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tópico não encontrado</h2>
              <p className="text-gray-600 mb-6">O tópico que procura não existe ou foi removido.</p>
              <Link href="/forum">
                <Button variant="primary">Voltar ao Fórum</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleReply = async () => {
    if (newReply.trim().length < 3) return;

    try {
      // A resposta é persistida no backend e o tópico recarregado
      await createReplyApi(topic.id, newReply.trim());
    } catch (err) {
      setReplyError(
        err instanceof ApiError
          ? err.message
          : 'Não foi possível ligar ao servidor. Verifique se o backend está a correr.'
      );
      return;
    }

    setNewReply('');
    setReplyError('');
    retry();
  };

  const toggleLike = (replyId: number) => {
    setLikedReplies((prev) => {
      const next = new Set(prev);
      if (next.has(replyId)) {
        next.delete(replyId);
      } else {
        next.add(replyId);
      }
      return next;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <Link href="/forum">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Fórum
        </Button>
      </Link>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Topic */}
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="rounded-full bg-[#8B0000] px-3 py-1 text-xs font-medium text-white">
                {topic.category}
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Eye className="w-4 h-4" />
                <span>{formatNumber(topic.views)} visualizações</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MessageSquare className="w-4 h-4" />
                <span>{replies.length} respostas</span>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">{topic.title}</h1>

            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
              <img
                src={topic.author.photoUrl}
                alt={topic.author.name}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{topic.author.name}</p>
                <p className="text-xs text-gray-500">{formatDate(topic.createdAt)}</p>
              </div>
            </div>

            {topic.description && <p className="text-gray-700">{topic.description}</p>}
          </CardContent>
        </Card>

        {/* Replies */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">
            {replies.length} {replies.length === 1 ? 'Resposta' : 'Respostas'}
          </h2>

          {replies.map((reply) => {
            const isLiked = likedReplies.has(reply.id);
            return (
              <Card key={reply.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={reply.author.photoUrl}
                      alt={reply.author.name}
                      className="h-10 w-10 rounded-full shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <p className="text-sm font-medium text-gray-900">{reply.author.name}</p>
                        {reply.author.id === topic.author.id && (
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                            Autor
                          </span>
                        )}
                        <span className="text-xs text-gray-500">{formatDate(reply.createdAt)}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{reply.text}</p>
                      <button
                        onClick={() => toggleLike(reply.id)}
                        className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                          isLiked ? 'text-[#8B0000]' : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                        <span>{reply.likes + (isLiked ? 1 : 0)}</span>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {replies.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600">Ainda não há respostas. Seja o primeiro a responder!</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Reply Form */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Responder</h3>
            <div className="flex items-start gap-4">
              {currentUser && (
                <img
                  src={currentUser.photoUrl}
                  alt={currentUser.name}
                  className="h-10 w-10 rounded-full shrink-0"
                />
              )}
              <div className="flex-1">
                <textarea
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  placeholder="Escreva a sua resposta..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent resize-none"
                />
                {replyError && <p className="mt-2 text-sm text-red-600">{replyError}</p>}
                <div className="flex justify-end mt-3">
                  <Button
                    variant="primary"
                    className="gap-2"
                    onClick={handleReply}
                    disabled={newReply.trim().length < 3}
                  >
                    <Send className="w-4 h-4" />
                    Publicar Resposta
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
