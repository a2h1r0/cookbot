'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import SwipeStack, { SwipeStackRef } from '@/components/search/SwipeStack';
import SwipeActions from '@/components/search/SwipeActions';
import Search from '@/components/search/Search';
import { useRecipes } from '@/hooks/useRecipes';
import { Recipe, SearchFilter } from '@/types';

export default function SearchPage() {
  const router = useRouter();
  const swipeStackRef = useRef<SwipeStackRef>(null);  const [searchFilters, setSearchFilters] = useState<SearchFilter>({
    cookTime: '',
    serving: 0,
    hasIngredientsFilter: false,
    ingredients: [],
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

  const canUndo = swipeStackRef.current?.canUndo() ?? false;
  return (
    <AppLayout>
      <div className="mt-2 mx-4">
        {/* 検索フィルター */}
        <div className="mb-4">
          <Search
            onFilterChange={setSearchFilters}
            activeFilters={searchFilters}
          />
        </div>

        {/* フィルター結果表示 */}
        {loading && (
          <div className="text-center mb-3">
            <div className="inline-flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
              <span>レシピを読み込み中...</span>
            </div>
          </div>
        )}
        {error && (
          <div className="text-center mb-3">
            <div className="inline-flex items-center space-x-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              <span>❌</span>
              <span>エラー: {error}</span>
            </div>
          </div>
        )}
        {!loading && !error && recipes.length === 0 && (
          <div className="text-center mb-3">
            <div className="inline-flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
              <span>🤔</span>
              <span>条件に合うレシピが見つかりませんでした</span>
            </div>
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
