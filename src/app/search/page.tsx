'use client';

import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import SwipeStack, { SwipeStackRef } from '@/components/search/SwipeStack';
import SwipeActions from '@/components/search/SwipeActions';
import Search from '@/components/search/Search';
import { useRecipes } from '@/hooks/useRecipes';
import { useSwipe } from '@/hooks/useSwipe';
import { Recipe } from '@/types';

export default function SearchPage() {
  const router = useRouter();
  const swipeStackRef = useRef<SwipeStackRef>(null);
  const { recipes, loading, error, fetchRecipes } = useRecipes();

  // ハンドラー関数
  const handleLike = (recipe: Recipe) => {
    router.push(`/recipe?id=${recipe.id}`);
  };

  const handlePass = (recipe: Recipe) => {
    console.log('Passed:', recipe.title);
  };

  // スワイプフックを使用
  const swipeState = useSwipe({
    recipes,
    onLike: handleLike,
    onPass: handlePass,
    onSearch: fetchRecipes,
  });

  const handleFiltersChange = () => {
    fetchRecipes();
    // // スワイプ状態をリセット
    // swipeState.resetSwipe();
  };

  return (
    <AppLayout>
      <div className="mt-2 mx-4">
        {' '}
        {/* 検索フィルター */}
        <div className="mb-4">
          <Search onChangeFilters={handleFiltersChange} />
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
        )}{' '}
        {/* スワイプカードスタック */}{' '}
        <SwipeStack
          ref={swipeStackRef}
          currentIndex={swipeState.currentIndex}
          recipes={recipes}
          isComplete={swipeState.isComplete}
          visibleCards={swipeState.visibleCards}
          onSwipe={swipeState.handleSwipe}
          onSearch={swipeState.search}
        />
        {/* スワイプアクション - 完了時は非表示 */}
        {!swipeState.isComplete && (
          <SwipeActions
            onPass={swipeState.swipeLeft}
            onLike={swipeState.swipeRight}
          />
        )}
      </div>
    </AppLayout>
  );
}
