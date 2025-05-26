import { useState, useEffect, useMemo } from 'react';
import { Recipe } from '@/types';

interface SearchFilter {
  categories: string[];
  cookTimes: string[];
  servings: number[];
  hasIngredientsFilter: boolean;
}

export function useRecipes(searchFilters: SearchFilter) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // フィルター条件を検索クエリに変換
  const searchQuery = useMemo(() => {
    const queryParts: string[] = [];

    // カテゴリフィルターをクエリに追加
    if (searchFilters.categories.length > 0) {
      const categoryTerms = searchFilters.categories.map((category) => {
        switch (category) {
          case 'japanese':
            return '和食 親子丼 唐揚げ';
          case 'western':
            return '洋食 パンケーキ ハンバーグ';
          case 'italian':
            return 'イタリアン カルボナーラ カプレーゼ';
          case 'thai':
            return 'タイ料理 ガパオ';
          case 'chinese':
            return '中華 エビチリ';
          case 'dessert':
            return 'デザート ケーキ タルト';
          case 'salad':
            return 'サラダ';
          case 'soup':
            return 'スープ ミネストローネ';
          default:
            return category;
        }
      });
      queryParts.push(...categoryTerms);    }

    // 手持ち食材フィルター
    if (searchFilters.hasIngredientsFilter) {
      queryParts.push('親子丼 カルボナーラ 唐揚げ ハンバーグ パンケーキ');
    }

    // 何もフィルターがない場合は空文字列を返す（全件取得）
    return queryParts.length > 0 ? queryParts.join(' ') : '';
  }, [searchFilters]);

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
        if (searchFilters.cookTimes.length > 0) {
          const cookTimeMinutes = parseInt(recipe.cookTime);
          const matchesTime = searchFilters.cookTimes.some((timeFilter) => {
            switch (timeFilter) {
              case '10':
                return cookTimeMinutes <= 10;
              case '20':
                return cookTimeMinutes <= 20;
              case '30':
                return cookTimeMinutes <= 30;
              case '60':
                return cookTimeMinutes <= 60;
              case '60+':
                return cookTimeMinutes > 60;
              default:
                return false;
            }
          });
          if (!matchesTime) return false;
        }

        // 人数フィルター
        if (searchFilters.servings.length > 0) {
          const matchesServing = searchFilters.servings.some(
            (servingFilter) => {
              if (servingFilter === 4) {
                return recipe.servings >= 4;
              }
              return recipe.servings === servingFilter;
            }
          );
          if (!matchesServing) return false;
        }

        return true;
      });

      setRecipes(fetchedRecipes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  // フィルターが変更されたらレシピを再取得
  useEffect(() => {
    fetchRecipes();
  }, [searchQuery, searchFilters.cookTimes, searchFilters.servings]);

  return {
    recipes,
    loading,
    error,
    refetch: fetchRecipes,
  };
}
