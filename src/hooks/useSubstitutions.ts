import { useCallback, useState } from 'react';
import { Substitution } from '@/types';
import { useGemini } from './useGemini';
import {
  createSubstitutionPrompt,
  parseSubstitutionsFromResponse,
} from '@/utils/recipePrompts';

export function useSubstitutions() {
  const [substitutions, setSubstitutions] = useState<Substitution[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    generateSubstitution,
    loading: geminiLoading,
    error: geminiError,
  } = useGemini();

  const searchSubstitutions = useCallback(
    async (ingredients: string[]) => {
      const requestId = Math.random().toString(36).substr(2, 9);
      const startTime = Date.now();

      console.log(
        `[SUBSTITUTIONS-${requestId}] === Substitution Search Started ===`
      );
      console.log(
        `[SUBSTITUTIONS-${requestId}] Timestamp: ${new Date().toISOString()}`
      );
      console.log(
        `[SUBSTITUTIONS-${requestId}] Target Ingredients:`,
        ingredients
      );

      if (ingredients.length === 0) {
        console.log(`[SUBSTITUTIONS-${requestId}] No ingredients provided`);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log(
          `[SUBSTITUTIONS-${requestId}] Creating substitution prompt...`
        );
        const prompt = createSubstitutionPrompt(ingredients);
        console.log(`[SUBSTITUTIONS-${requestId}] Prompt created:`, {
          promptLength: prompt.length,
          promptPreview:
            prompt.substring(0, 200) + (prompt.length > 200 ? '...' : ''),
        });

        console.log(
          `[SUBSTITUTIONS-${requestId}] Calling Gemini generateSubstitution...`
        );
        const geminiStartTime = Date.now();
        const response = await generateSubstitution({
          prompt,
          temperature: 0.7,
          ingredients,
        });
        const geminiDuration = Date.now() - geminiStartTime;

        console.log(
          `[SUBSTITUTIONS-${requestId}] Gemini substitution response received:`,
          {
            geminiDuration: `${geminiDuration}ms`,
            hasResponse: !!response,
            responseTextLength: response?.text?.length || 0,
          }
        );

        if (!response) {
          console.error(`[SUBSTITUTIONS-${requestId}] No response from Gemini`);
          throw new Error('代用提案の生成に失敗しました');
        }

        try {
          console.log(
            `[SUBSTITUTIONS-${requestId}] Parsing substitutions from response...`
          );
          const parseStartTime = Date.now();
          const parsedSubstitutions = parseSubstitutionsFromResponse(
            response.text
          );
          const parseDuration = Date.now() - parseStartTime;
          console.log(
            `[SUBSTITUTIONS-${requestId}] Substitutions parsed successfully:`,
            {
              parseDuration: `${parseDuration}ms`,
              substitutionCount: parsedSubstitutions.length,
              substitutions: parsedSubstitutions.map((s: Substitution) => ({
                original: s.original,
                substitute: s.substitute,
              })),
            }
          );

          setSubstitutions(parsedSubstitutions);
        } catch (parseError) {
          const totalDuration = Date.now() - startTime;
          console.error(
            `[SUBSTITUTIONS-${requestId}] Parse error after ${totalDuration}ms:`,
            {
              parseError,
              responseText: response.text,
            }
          );
          throw new Error('代用提案データの解析に失敗しました');
        }
      } catch (err) {
        const totalDuration = Date.now() - startTime;
        const errorMessage =
          err instanceof Error ? err.message : 'エラーが発生しました';
        console.error(
          `[SUBSTITUTIONS-${requestId}] Substitution search error after ${totalDuration}ms:`,
          {
            errorType: err?.constructor?.name || 'Unknown',
            errorMessage,
            ingredients,
          }
        );
        setError(errorMessage);
      } finally {
        const finalDuration = Date.now() - startTime;
        console.log(
          `[SUBSTITUTIONS-${requestId}] Substitution search completed in ${finalDuration}ms`
        );
        setLoading(false);
      }
    },
    [generateSubstitution]
  );
  const fetchSubstitutions = useCallback(
    async (ingredients: string[]) => {
      await searchSubstitutions(ingredients);
    },
    [searchSubstitutions]
  );

  return {
    substitutions,
    loading: loading || geminiLoading,
    error: error || geminiError,
    fetchSubstitutions,
    searchSubstitutions,
  };
}
