import { useState, useCallback } from 'react';
import { GeminiRequest, GeminiResponse, UseGeminiReturn } from '@/types';

export function useGemini(): UseGeminiReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResponse, setLastResponse] = useState<GeminiResponse | null>(null);
  const generateRecipe = useCallback(
    async (request: GeminiRequest): Promise<GeminiResponse | null> => {
      const requestId = Math.random().toString(36).substr(2, 9);
      const startTime = Date.now();

      console.log(`[CLIENT-${requestId}] === Gemini Request Started ===`);
      console.log(
        `[CLIENT-${requestId}] Timestamp: ${new Date().toISOString()}`
      );
      console.log(`[CLIENT-${requestId}] Request:`, {
        promptLength: request.prompt?.length || 0,
        promptPreview:
          request.prompt?.substring(0, 100) +
          (request.prompt?.length > 100 ? '...' : ''),
        model: request.model || 'default',
        temperature: request.temperature || 'default',
      });

      try {
        setLoading(true);
        setError(null);

        console.log(
          `[CLIENT-${requestId}] Sending fetch request to /api/recipe...`
        );
        const fetchStartTime = Date.now();

        const response = await fetch('/api/recipe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        });

        const fetchDuration = Date.now() - fetchStartTime;
        console.log(`[CLIENT-${requestId}] Fetch completed:`, {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok,
          fetchDuration: `${fetchDuration}ms`,
          headers: Object.fromEntries(response.headers.entries()),
        });

        const result = await response.json();
        const totalDuration = Date.now() - startTime;

        console.log(`[CLIENT-${requestId}] Response received:`, {
          success: result.success,
          totalDuration: `${totalDuration}ms`,
          responseSize: JSON.stringify(result).length,
          hasError: !!result.error,
          errorMessage: result.error || null,
        });

        if (!result.success) {
          console.error(`[CLIENT-${requestId}] API Error:`, {
            error: result.error,
            details: result.details,
            status: response.status,
          });
          throw new Error(result.error || 'Gemini APIリクエストが失敗しました');
        }

        const geminiResponse = result.data as GeminiResponse;
        console.log(`[CLIENT-${requestId}] Success:`, {
          textLength: geminiResponse.text?.length || 0,
          textPreview:
            geminiResponse.text?.substring(0, 200) +
            (geminiResponse.text?.length > 200 ? '...' : ''),
          model: geminiResponse.model,
          temperature: geminiResponse.temperature,
        });

        setLastResponse(geminiResponse);
        return geminiResponse;
      } catch (err) {
        const totalDuration = Date.now() - startTime;
        const errorMessage =
          err instanceof Error ? err.message : '予期しないエラーが発生しました';

        console.error(`[CLIENT-${requestId}] Error after ${totalDuration}ms:`, {
          errorType: err?.constructor?.name || 'Unknown',
          errorMessage,
          stack: err instanceof Error ? err.stack : undefined,
        });

        setError(errorMessage);
        return null;
      } finally {
        const finalDuration = Date.now() - startTime;
        console.log(
          `[CLIENT-${requestId}] Request completed in ${finalDuration}ms`
        );
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    error,
    generateRecipe,
    lastResponse,
  };
}
