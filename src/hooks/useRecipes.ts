import { useState, useEffect, useMemo } from 'react';
import { Recipe, SearchFilter } from '@/types';

export function useRecipes(searchFilters: SearchFilter) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // フィルター条件を検索クエリに変換
  const searchQuery = useMemo(() => {
    const queryParts: string[] = [];

    // 手持ち食材フィルター
    if (searchFilters.ingredients.length > 0) {
      queryParts.push(...searchFilters.ingredients);
    }

    // 何もフィルターがない場合は空文字列を返す（全件取得）
    return queryParts.length > 0 ? queryParts.join(' ') : '';
  }, [searchFilters.ingredients]);

  // レシピを取得する関数
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
  }; // フィルターが変更されたらレシピを再取得
  useEffect(() => {
    fetchRecipes();
  }, [
    searchQuery,
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
