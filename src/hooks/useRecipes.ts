import { useState, useEffect } from 'react';
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
  const { generate, loading: geminiLoading, error: geminiError } = useGemini();

  const searchRecipes = async (filters: SearchFilters) => {
    try {
      setLoading(true);
      setError(null);

      const prompt = createRecipeSearchPrompt(filters);
      const response = await generate({ prompt, temperature: 0.8 });

      if (!response) {
        throw new Error('レシピの生成に失敗しました');
      }

      try {
        const generatedRecipes = parseRecipesFromResponse(response.text);
        setRecipes(generatedRecipes);
      } catch (parseError) {
        console.error('JSON解析エラー:', parseError);
        throw new Error('レシピデータの解析に失敗しました');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipes = async (filters: SearchFilters) => {
    await searchRecipes(filters);
  };

  useEffect(() => {
    const defaultFilters: SearchFilters = {
      cookTime: '30分以内',
      serving: '2',
      ingredients: [],
    };
    fetchRecipes(defaultFilters);
  }, []);

  return {
    recipes,
    loading: loading || geminiLoading,
    error: error || geminiError,
    fetchRecipes,
    searchRecipes,
  };
}
