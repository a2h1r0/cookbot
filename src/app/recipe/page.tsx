'use client';

import AppLayout from '@/components/layout/AppLayout';
import SwipeStack from '@/components/search/SwipeStack';
import SwipeActions from '@/components/search/SwipeActions';
import Search from '@/components/search/Search';
import RecipeDialog from '@/components/recipe/RecipeDialog';
import { useRecipes } from '@/hooks/useRecipes';
import { useSwipe } from '@/hooks/useSwipe';
import { useFilters } from '@/hooks/useFilters';
import { useEffect } from 'react';

export default function RecipePage() {
  const { recipes, loading, error, fetchRecipes } = useRecipes();
  const filtersHook = useFilters();
  const swipeHook = useSwipe(recipes);

  const search = () => {
    fetchRecipes(filtersHook.filters);
    swipeHook.reset();
  };

  useEffect(() => {
    search();
  }, [filtersHook.filters]);

  return (
    <AppLayout>
      <div className="mt-2 mx-4">
        {' '}
        {/* 検索フィルター */}
        <div className="mb-4">
          <Search {...filtersHook} />
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
        <SwipeStack recipes={recipes} onSearch={search} {...swipeHook} />
        {swipeHook.currentIndex < recipes.length && (
          <SwipeActions {...swipeHook} />
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
