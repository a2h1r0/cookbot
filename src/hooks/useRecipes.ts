import { useState, useEffect, useMemo } from 'react';
import { Recipe, SearchFilter } from '@/types';

export function useRecipes(searchFilters: SearchFilter) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError(null);

      let url = '/api/search?q=ハンバーグ';

      const response = await fetch(url);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'レシピの取得に失敗しました');
      }

      let recipes = data.data || [];

      setRecipes(recipes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRecipes();
  }, [
    searchFilters.cookTime,
    searchFilters.serving,
    searchFilters.ingredients,
  ]);

  return {
    recipes,
    loading,
    error,
    refetch: fetchRecipes,
  };
}
