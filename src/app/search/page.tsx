'use client';

import { useRef, useState, useMemo, useEffect } from 'react';
import Header from '@/components/layout/Header';
import SwipeStack, { SwipeStackRef } from '@/components/search/SwipeStack';
import SwipeActions from '@/components/search/SwipeActions';
import Search from '@/components/search/Search';
import { mockRecipes } from '@/data/mockRecipes';
import { Recipe } from '@/types';

interface SearchFilter {
  categories: string[];
  cookTimes: string[];
  difficulties: string[];
  servings: number[];
  hasIngredientsFilter: boolean;
}

export default function SearchPage() {
  const swipeStackRef = useRef<SwipeStackRef>(null);
  const [likedRecipes, setLikedRecipes] = useState<Recipe[]>([]);
  const [passedRecipes, setPassedRecipes] = useState<Recipe[]>([]);  const [searchFilters, setSearchFilters] = useState<SearchFilter>({
    categories: [],
    cookTimes: [],
    difficulties: [],
    servings: [],
    hasIngredientsFilter: false,
  });

  // フィルタリングされたレシピを計算
  const filteredRecipes = useMemo(() => {
    return mockRecipes.filter((recipe) => {
      // カテゴリフィルター（レシピタイトルや説明で判定）
      if (searchFilters.categories.length > 0) {
        const matchesCategory = searchFilters.categories.some((category) => {
          switch (category) {
            case 'japanese':
              return (
                recipe.title.includes('親子丼') ||
                recipe.title.includes('和風') ||
                recipe.title.includes('唐揚げ')
              );
            case 'western':
              return (
                recipe.title.includes('パンケーキ') ||
                recipe.title.includes('ハンバーグ')
              );
            case 'chinese':
              return recipe.title.includes('エビチリ');
            case 'italian':
              return (
                recipe.title.includes('カルボナーラ') ||
                recipe.title.includes('アクアパッツァ') ||
                recipe.title.includes('カプレーゼ')
              );
            case 'thai':
              return recipe.title.includes('ガパオ');
            case 'dessert':
              return (
                recipe.title.includes('ケーキ') ||
                recipe.title.includes('タルト') ||
                recipe.title.includes('パンケーキ')
              );
            case 'salad':
              return recipe.title.includes('サラダ');
            case 'soup':
              return recipe.title.includes('ミネストローネ');
            default:
              return false;
          }
        });
        if (!matchesCategory) return false;
      }

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

      // 難易度フィルター
      if (searchFilters.difficulties.length > 0) {
        if (!searchFilters.difficulties.includes(recipe.difficulty))
          return false;
      }

      // 人数フィルター
      if (searchFilters.servings.length > 0) {
        const matchesServing = searchFilters.servings.some((servingFilter) => {
          if (servingFilter === 4) {
            return recipe.servings >= 4;
          }
          return recipe.servings === servingFilter;
        });
        if (!matchesServing) return false;
      }      // 手持ちの食材フィルター
      if (searchFilters.hasIngredientsFilter) {
        // 手持ちの基本的な材料で作れそうなレシピかチェック
        // 卵料理、簡単なパスタ、基本的な和食などを対象
        const ingredientsFriendly = [
          '親子丼',
          'カルボナーラ',
          '唐揚げ',
          'ハンバーグ',
          'パンケーキ',
          'オムライス',
          '卵焼き',
          '野菜炒め',
        ];
        const isIngredientsFriendly = ingredientsFriendly.some((dish) =>
          recipe.title.includes(dish)
        );
        if (!isIngredientsFriendly) return false;
      }

      return true;
    });
  }, [searchFilters]);

  // フィルターが変更されたらSwipeStackをリセット
  useEffect(() => {
    swipeStackRef.current?.restart();
  }, [searchFilters]);

  const handleLike = (recipe: Recipe) => {
    setLikedRecipes((prev) => [...prev, recipe]);
    console.log('Liked:', recipe.title);
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
            activeFilters={searchFilters}
          />
          {/* フィルター結果表示 */}
          {filteredRecipes.length !== mockRecipes.length && (
            <div className="text-center mb-4">
              <span className="text-sm text-gray-600">
                {filteredRecipes.length}件のレシピが見つかりました
              </span>
            </div>
          )}
          {/* スワイプカードスタック */}
          <SwipeStack
            ref={swipeStackRef}
            recipes={filteredRecipes}
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
