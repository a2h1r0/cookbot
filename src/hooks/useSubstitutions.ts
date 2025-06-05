import { useCallback, useState } from 'react';
import { Substitution } from '@/types';
import { useGemini } from './useGemini';
import {
  createSubstitutionPrompt,
  parseSubstitutionsFromResponse,
} from '@/utils/substitutionPrompts';

export function useSubstitutions() {
  const [substitutions, setSubstitutions] = useState<(Substitution | null)[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    generateSubstitution,
    loading: geminiLoading,
    error: geminiError,
  } = useGemini();

  const fetchSubstitutions = useCallback(
    async (ingredients: string[]) => {
      if (ingredients.length === 0) {
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const prompt = createSubstitutionPrompt(ingredients);
        const response = await generateSubstitution({
          prompt,
          temperature: 0.7,
          ingredients,
        });

        if (!response) {
          throw new Error('代用提案の生成に失敗しました');
        }
        try {
          const parsedSubstitutions = parseSubstitutionsFromResponse(
            response.text
          );
          const validSubstitutions = parsedSubstitutions.filter(
            (s: Substitution | null): s is Substitution => s !== null
          );

          setSubstitutions(parsedSubstitutions);
        } catch (parseError) {
          throw new Error('代用提案データの解析に失敗しました');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'エラーが発生しました';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [generateSubstitution]
  );
  const searchSubstitutions = useCallback(
    async (ingredients: string[]) => {
      await fetchSubstitutions(ingredients);
    },
    [fetchSubstitutions]
  );

  return {
    substitutions,
    loading: loading || geminiLoading,
    error: error || geminiError,
    searchSubstitutions,
  };
}
