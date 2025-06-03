'use client';

import { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SwipeStack from '@/components/recipe/SwipeStack';
import SwipeActions from '@/components/recipe/SwipeActions';
import Search from '@/components/recipe/Search';
import RecipeDialog from '@/components/recipe/dialog/RecipeDialog';
import LoadingProgress from '@/components/recipe/LoadingProgress';
import { useRecipes } from '@/hooks/useRecipes';
import { useSwipe } from '@/hooks/useSwipe';
import { useFilters } from '@/hooks/useFilters';

export default function RecipePage() {
  const [isOnline, setIsOnline] = useState(true);
  const { recipes, loading, error, fetchRecipes } = useRecipes();
  const filtersHook = useFilters();
  const swipeHook = useSwipe(recipes);

  useEffect(() => {
    // 初期状態の設定
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const search = () => {
    if (!isOnline) {
      return; // オフライン時は検索しない
    }
    fetchRecipes(filtersHook.filters);
    swipeHook.reset();
  };

  return (
    <AppLayout>
      <div className="h-full flex flex-col pb-4 md:pb-8">
        {' '}
        {/* 検索フィルター */}
        <div className="flex-shrink-0 px-3 mt-3">
          <Search
            {...filtersHook}
            onSearch={search}
            isLoading={loading}
            isOffline={!isOnline}
          />
        </div>{' '}
        {/* ステータス表示 */}
        <div className="flex-shrink-0 px-3 md:px-4">
          {!isOnline && (
            <div className="text-center mb-2 md:mb-3">
              <div className="inline-flex items-center space-x-1 md:space-x-2 text-xs md:text-sm text-orange-600 bg-orange-50 px-2 py-1 md:px-3 md:py-2 rounded-lg">
                <span>📶</span>
                <span>
                  オフライン - レシピ生成にはインターネット接続が必要です
                </span>
              </div>
            </div>
          )}
          {loading && (
            <LoadingProgress isLoading={loading} estimatedTime={30} />
          )}
          {error && (
            <div className="text-center mb-2 md:mb-3">
              <div className="inline-flex items-center space-x-1 md:space-x-2 text-xs md:text-sm text-red-600 bg-red-50 px-2 py-1 md:px-3 md:py-2 rounded-lg">
                <span>❌</span>
                <span>エラー: {error}</span>
              </div>
            </div>
          )}
          {!loading && !error && recipes.length === 0 && isOnline && (
            <div className="text-center mb-2 md:mb-3">
              <div className="inline-flex items-center space-x-1 md:space-x-2 text-xs md:text-sm text-gray-600 bg-gray-50 px-2 py-1 md:px-3 md:py-2 rounded-lg">
                <span>😢</span>
                <span>条件に合うレシピが見つかりませんでした</span>
              </div>
            </div>
          )}
        </div>
        {/* メインコンテンツエリア - 残りのスペースを使用 */}
        {!loading && (
          <div className="flex-1 flex flex-col justify-center px-2 sm:px-3 md:px-4 min-h-0">
            <SwipeStack recipes={recipes} onSearch={search} {...swipeHook} />
            {swipeHook.currentIndex < recipes.length && (
              <div className="flex-shrink-0 mt-2 md:mt-4">
                <SwipeActions {...swipeHook} />
              </div>
            )}
          </div>
        )}
        {/* レシピ詳細ダイアログ */}
        <RecipeDialog
          recipe={swipeHook.selectedRecipe}
          isOpen={swipeHook.isDialogOpen}
          onClose={swipeHook.closeDialog}
        />
      </div>
    </AppLayout>
  );
}
