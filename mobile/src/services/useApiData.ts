import { useCallback, useEffect, useRef, useState } from 'react';
import { ApiError, SERVER_ERROR_MESSAGE } from './api';

/**
 * Carrega dados da API. Sem fallback: expõe `loading` e `error` para o
 * ecrã mostrar os estados correspondentes.
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
      .then(setData)
      .catch((e: unknown) => {
        setError(e instanceof ApiError ? e.message : SERVER_ERROR_MESSAGE);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, retry: load };
}
