import { useCallback, useEffect, useState } from 'react';
import { Recipe } from '@/types';
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
  const {
    generateRecipe,
    loading: geminiLoading,
    error: geminiError,
  } = useGemini();
  const fetchRecipes = useCallback(
    async (filters: SearchFilters) => {
      try {
        setLoading(true);
        setError(null);

        const prompt = createRecipeSearchPrompt(filters);
        const response = await generateRecipe({ prompt, temperature: 0.8 });

        if (!response) {
          throw new Error('レシピの生成に失敗しました');
        }

        try {
          const generatedRecipes = parseRecipesFromResponse(response.text);
          setRecipes(generatedRecipes);
        } catch (_parseError) {
          throw new Error('レシピデータの解析に失敗しました');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'エラーが発生しました';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [generateRecipe]
  );
  const searchRecipes = useCallback(
    async (filters: SearchFilters) => {
      await fetchRecipes(filters);
    },
    [fetchRecipes]
  );
  useEffect(() => {
    searchRecipes({
      cookTime: '30分以内',
      serving: '2人分',
      categories: [],
      ingredients: [],
    });
  }, [searchRecipes]);

  return {
    recipes,
    loading: loading || geminiLoading,
    error: error || geminiError,
    searchRecipes,
  };
}
