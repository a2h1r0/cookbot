'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
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
  const [likedRecipes, setLikedRecipes] = useState<Recipe[]>([]);
  const [passedRecipes, setPassedRecipes] = useState<Recipe[]>([]);  const [searchFilters, setSearchFilters] = useState<SearchFilter>({
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
    setLikedRecipes((prev) => [...prev, recipe]);
    console.log('Liked:', recipe.title);
    // レシピ詳細ページに遷移（レシピデータをクエリパラメータで渡す）
    router.push(`/recipe?id=${recipe.id}`);
  };

  const handlePass = (recipe: Recipe) => {
    setPassedRecipes((prev) => [...prev, recipe]);
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div>
        <Header />{' '}
        <main className="max-w-md mx-auto mt-8">
          {' '}
          {/* 検索フィルター */}
          <Search
            onFilterChange={setSearchFilters}
            activeFilters={searchFilters}          />
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
              <span className="text-sm text-gray-600">条件に合うレシピが見つかりませんでした</span>
            </div>
          )}
          {!loading && !error && recipes.length > 0 && (
            <div className="text-center mb-4">
              <span className="text-sm text-gray-600">
                {recipes.length}件のレシピが見つかりました
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
          {/* 統計情報 */}
          <div className="mt-12 text-center text-sm text-gray-500">
            <div className="flex justify-center space-x-6">
              <div>
                <span className="font-medium text-green-600">
                  {likedRecipes.length}
                </span>
                <span className="ml-1">お気に入り</span>
              </div>
              <div>
                <span className="font-medium text-red-600">
                  {passedRecipes.length}
                </span>
                <span className="ml-1">スキップ</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
