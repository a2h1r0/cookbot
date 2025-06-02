import { useCallback, useEffect, useState } from 'react';
import { Category, Recipe } from '@/types';
import { useGemini } from './useGemini';
import {
  createRecipeSearchPrompt,
  parseRecipesFromResponse,
} from '@/utils/recipePrompts';
import { SearchFilters } from '@/types';

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { generate, loading: geminiLoading, error: geminiError } = useGemini();
  const searchRecipes = useCallback(
    async (filters: SearchFilters) => {
      const requestId = Math.random().toString(36).substr(2, 9);
      const startTime = Date.now();

      console.log(`[RECIPES-${requestId}] === Recipe Search Started ===`);
      console.log(
        `[RECIPES-${requestId}] Timestamp: ${new Date().toISOString()}`
      );
      console.log(`[RECIPES-${requestId}] Search Filters:`, filters);

      try {
        setLoading(true);
        setError(null);

        console.log(`[RECIPES-${requestId}] Creating prompt...`);
        const prompt = createRecipeSearchPrompt(filters);
        console.log(`[RECIPES-${requestId}] Prompt created:`, {
          promptLength: prompt.length,
          promptPreview:
            prompt.substring(0, 200) + (prompt.length > 200 ? '...' : ''),
        });

        console.log(`[RECIPES-${requestId}] Calling Gemini generate...`);
        const geminiStartTime = Date.now();
        const response = await generate({ prompt, temperature: 0.8 });
        const geminiDuration = Date.now() - geminiStartTime;

        console.log(`[RECIPES-${requestId}] Gemini response received:`, {
          geminiDuration: `${geminiDuration}ms`,
          hasResponse: !!response,
          responseTextLength: response?.text?.length || 0,
        });

        if (!response) {
          console.error(`[RECIPES-${requestId}] No response from Gemini`);
          throw new Error('レシピの生成に失敗しました');
        }

        try {
          console.log(
            `[RECIPES-${requestId}] Parsing recipes from response...`
          );
          const parseStartTime = Date.now();
          const generatedRecipes = parseRecipesFromResponse(response.text);
          const parseDuration = Date.now() - parseStartTime;

          console.log(`[RECIPES-${requestId}] Recipes parsed successfully:`, {
            parseDuration: `${parseDuration}ms`,
            recipeCount: generatedRecipes.length,
            recipeIds: generatedRecipes.map((r) => r.id),
          });

          setRecipes(generatedRecipes);
        } catch (parseError) {
          const totalDuration = Date.now() - startTime;
          console.error(
            `[RECIPES-${requestId}] JSON解析エラー after ${totalDuration}ms:`,
            {
              parseError,
              responseText: response.text,
            }
          );
          throw new Error('レシピデータの解析に失敗しました');
        }
      } catch (err) {
        const totalDuration = Date.now() - startTime;
        const errorMessage =
          err instanceof Error ? err.message : 'エラーが発生しました';
        console.error(
          `[RECIPES-${requestId}] Recipe search error after ${totalDuration}ms:`,
          {
            errorType: err?.constructor?.name || 'Unknown',
            errorMessage,
            filters,
          }
        );
        setError(errorMessage);
      } finally {
        const finalDuration = Date.now() - startTime;
        console.log(
          `[RECIPES-${requestId}] Recipe search completed in ${finalDuration}ms`
        );
        setLoading(false);
      }
    },
    [generate]
  );
  const fetchRecipes = useCallback(
    async (filters: SearchFilters) => {
      await searchRecipes(filters);
    },
    [searchRecipes]
  );
  useEffect(() => {
    console.log('[RECIPES] Initial recipe fetch triggered');
    fetchRecipes({
      cookTime: '30分以内',
      serving: '2人分',
      categories: [],
      ingredients: Object.values(Category),
    });
  }, [fetchRecipes]);

  return {
    recipes,
    loading: loading || geminiLoading,
    error: error || geminiError,
    fetchRecipes,
    searchRecipes,
  };
}
