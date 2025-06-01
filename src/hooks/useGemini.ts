import { useState, useCallback } from 'react';
import { GeminiRequest, GeminiResponse, UseGeminiReturn } from '@/types';

export function useGemini(): UseGeminiReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResponse, setLastResponse] = useState<GeminiResponse | null>(null);

  const generate = useCallback(
    async (request: GeminiRequest): Promise<GeminiResponse | null> => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        });

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error || 'Gemini APIリクエストが失敗しました');
        }

        const geminiResponse = result.data as GeminiResponse;
        setLastResponse(geminiResponse);
        return geminiResponse;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : '予期しないエラーが発生しました';
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    error,
    generate,
    lastResponse,
  };
}
