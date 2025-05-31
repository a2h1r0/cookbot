import { useState, useCallback } from 'react';

export interface GeminiRequest {
  prompt: string;
  model?: string;
  temperature?: number;
}

export interface GeminiResponse {
  text: string;
  model: string;
  temperature: number;
  prompt: string;
}

export interface UseGeminiReturn {
  loading: boolean;
  error: string | null;
  generate: (request: GeminiRequest) => Promise<GeminiResponse | null>;
  lastResponse: GeminiResponse | null;
}

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
