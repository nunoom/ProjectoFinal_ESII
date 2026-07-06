'use client';

import { Loader2, ServerOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export function PageLoading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-3 text-gray-500">
        <Loader2 className="h-8 w-8 animate-spin text-[#8B0000]" />
        <p className="text-sm">A carregar...</p>
      </div>
    </div>
  );
}

export function PageError({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Card>
        <CardContent className="p-12 text-center max-w-md">
          <ServerOff className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Servidor indisponível</h2>
          <p className="text-gray-600 mb-6">{message}</p>
          {onRetry && (
            <Button variant="primary" onClick={onRetry}>
              Tentar Novamente
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
