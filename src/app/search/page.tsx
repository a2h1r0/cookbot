'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import SwipeStack, { SwipeStackRef } from '@/components/search/SwipeStack';
import SwipeActions from '@/components/search/SwipeActions';
import Search from '@/components/search/Search';
import { useRecipes } from '@/hooks/useRecipes';
import { Recipe } from '@/types';

interface SearchFilter {
  categories: string[];
  cookTimes: string[];
  servings: number[];
  hasIngredientsFilter: boolean;
}

export default function SearchPage() {
  const router = useRouter();
  const swipeStackRef = useRef<SwipeStackRef>(null);
  const [searchFilters, setSearchFilters] = useState<SearchFilter>({
    categories: [],
    cookTimes: [],
    servings: [],
    hasIngredientsFilter: false,
  });

  // カスタムフックを使用してレシピを取得
  const { recipes, loading, error } = useRecipes(searchFilters);
  // フィルターが変更されたらSwipeStackをリセット
  useEffect(() => {
    swipeStackRef.current?.restart();
  }, [searchFilters]);
  const handleLike = (recipe: Recipe) => {
    console.log('Liked:', recipe.title);
    // レシピ詳細ページに遷移（レシピデータをクエリパラメータで渡す）
    router.push(`/recipe?id=${recipe.id}`);
  };

  const handlePass = (recipe: Recipe) => {
    console.log('Passed:', recipe.title);
  };

  const handlePassAction = () => {
    swipeStackRef.current?.swipeLeft();
  };

  const handleLikeAction = () => {
    swipeStackRef.current?.swipeRight();
  };

  const handleUndo = () => {
    swipeStackRef.current?.undo();
  };

  const canUndo = swipeStackRef.current?.canUndo() ?? false;  return (
    <AppLayout>
      <div className="mt-8">
        {/* 検索フィルター */}
        <Search
          onFilterChange={setSearchFilters}
          activeFilters={searchFilters}
        />
        {/* フィルター結果表示 */}
        {loading && (
          <div className="text-center mb-4">
            <span className="text-sm text-gray-600">レシピを読み込み中...</span>
          </div>
        )}
        {error && (
          <div className="text-center mb-4">
            <span className="text-sm text-red-600">エラー: {error}</span>
          </div>
        )}
        {!loading && !error && recipes.length === 0 && (
          <div className="text-center mb-4">
            <span className="text-sm text-gray-600">
              条件に合うレシピが見つかりませんでした
            </span>
          </div>
        )}
        {/* スワイプカードスタック */}
        <SwipeStack
          ref={swipeStackRef}
          recipes={recipes}
          onLike={handleLike}
          onPass={handlePass}
        />
        {/* スワイプアクション */}
        <SwipeActions
          onPass={handlePassAction}
          onLike={handleLikeAction}
          onUndo={handleUndo}
          canUndo={canUndo}
        />
      </div>
    </AppLayout>
  );
}
