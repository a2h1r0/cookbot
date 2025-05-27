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

      let fetchedRecipes = data.data || [];

      // クライアントサイドで追加フィルタリング
      fetchedRecipes = fetchedRecipes.filter((recipe: Recipe) => {
        // 調理時間フィルター
        if (searchFilters.cookTime) {
          const cookTimeMinutes = parseInt(recipe.cookTime);
          const timeFilter = searchFilters.cookTime;
          let matchesTime = false;

          switch (timeFilter) {
            case '10':
              matchesTime = cookTimeMinutes <= 10;
              break;
            case '20':
              matchesTime = cookTimeMinutes <= 20;
              break;
            case '30':
              matchesTime = cookTimeMinutes <= 30;
              break;
            case '60':
              matchesTime = cookTimeMinutes <= 60;
              break;
            case '60+':
              matchesTime = cookTimeMinutes > 60;
              break;
            default:
              matchesTime = true;
          }

          if (!matchesTime) return false;
        } // 人数フィルター
        if (searchFilters.serving) {
          const servingFilter = searchFilters.serving;
          let matchesServing = false;

          if (servingFilter === 4) {
            matchesServing = recipe.servings >= 4;
          } else {
            matchesServing = recipe.servings === servingFilter;
          }

          if (!matchesServing) return false;
        }

        // 食材フィルター
        if (searchFilters.ingredients.length > 0) {
          const hasMatchingIngredient = searchFilters.ingredients.some(
            (ingredient) =>
              recipe.ingredients.some((recipeIngredient) =>
                recipeIngredient.name
                  .toLowerCase()
                  .includes(ingredient.toLowerCase())
              ) || recipe.title.toLowerCase().includes(ingredient.toLowerCase())
          );

          if (!hasMatchingIngredient) return false;
        }

        return true;
      });

      setRecipes(fetchedRecipes);
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
