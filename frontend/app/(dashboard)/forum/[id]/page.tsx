'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MessageSquare, Eye, Send } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { mockForumTopics, mockForumReplies, mockUser } from '@/data/mockData';
import { formatDate } from '@/lib/utils';

export default function ForumTopicPage() {
  const params = useParams();
  const topicId = parseInt(params.id as string);
  const topic = mockForumTopics.find(t => t.id === topicId);
  const initialReplies = mockForumReplies[topicId] ?? [];

  const [replies, setReplies] = useState(initialReplies);
  const [newReply, setNewReply] = useState('');

  if (!topic) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Tópico não encontrado</h1>
        <Link href="/forum"><Button variant="primary">Voltar ao Fórum</Button></Link>
      </div>
    );
  }

  const handleSendReply = () => {
    if (!newReply.trim()) return;
    setReplies(prev => [
      ...prev,
      {
        id: prev.length + 1,
        topicId,
        author: { id: mockUser.id, name: mockUser.name, photoUrl: mockUser.photoUrl },
        content: newReply.trim(),
        createdAt: new Date().toISOString(),
      },
    ]);
    setNewReply('');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Back */}
      <Link href="/forum">
        <Button variant="ghost" size="sm" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao Fórum
        </Button>
      </Link>

      {/* Topic card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <img
              src={topic.author.photoUrl}
              alt={topic.author.name}
              className="w-12 h-12 rounded-full flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 text-xs font-medium text-white bg-[#8B0000] rounded-full">
                  {topic.category}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{topic.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>por <span className="font-medium text-gray-700">{topic.author.name}</span></span>
                <span>{formatDate(topic.createdAt)}</span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5" />
                  {replies.length} respostas
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  {topic.views} views
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Replies */}
      <div className="space-y-4 mb-8">
        <h2 className="text-lg font-semibold text-gray-900">
          {replies.length} resposta(s)
        </h2>

        {replies.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Seja o primeiro a responder!</p>
            </CardContent>
          </Card>
        ) : (
          replies.map((reply, idx) => (
            <Card key={reply.id}>
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <img
                    src={reply.author.photoUrl ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${reply.author.name}`}
                    alt={reply.author.name}
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{reply.author.name}</span>
                      {reply.author.id === mockUser.id && (
                        <span className="px-1.5 py-0.5 text-xs bg-[#8B0000] text-white rounded-full">Você</span>
                      )}
                      <span className="text-xs text-gray-400">{formatDate(reply.createdAt)}</span>
                      <span className="text-xs text-gray-400">#{idx + 1}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{reply.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* New reply */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold text-gray-900 mb-3">A sua resposta</h3>
          <div className="flex items-start gap-3">
            <img
              src={mockUser.photoUrl}
              alt={mockUser.name}
              className="w-10 h-10 rounded-full flex-shrink-0"
            />
            <div className="flex-1">
              <textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Escreva a sua resposta..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent"
              />
              <div className="flex justify-end mt-3">
                <Button
                  variant="primary"
                  onClick={handleSendReply}
                  disabled={!newReply.trim()}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Responder
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
