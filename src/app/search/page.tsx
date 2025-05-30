'use client';

import AppLayout from '@/components/layout/AppLayout';
import SwipeStack from '@/components/search/SwipeStack';
import SwipeActions from '@/components/search/SwipeActions';
import Search from '@/components/search/Search';
import { useRecipes } from '@/hooks/useRecipes';
import { useSwipe } from '@/hooks/useSwipe';

export default function SearchPage() {
  const { recipes, loading, error, fetchRecipes } = useRecipes();
  const swipeHook = useSwipe();

  const search = () => {
    fetchRecipes();
    swipeHook.reset();
  };

  return (
    <AppLayout>
      <div className="mt-2 mx-4">
        {' '}
        {/* 検索フィルター */}
        <div className="mb-4">
          <Search onChangeFilters={search} />
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
      </div>
    </AppLayout>
  );
}
