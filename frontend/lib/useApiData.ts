'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ApiError } from '@/lib/api';

/**
 * Carrega dados da API. Sem fallback: enquanto carrega devolve `loading`,
 * e se a API estiver indisponível devolve `error` para a página mostrar
 * o estado de erro correspondente.
 */
export function useApi<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    fetcherRef
      .current()
      .then((result) => {
        setData(result);
      })
      .catch((e: unknown) => {
        setError(
          e instanceof ApiError
            ? e.message
            : 'Não foi possível ligar ao servidor. Verifique se o backend está a correr.'
        );
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, setData, loading, error, retry: load };
}
