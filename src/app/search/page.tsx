'use client';

import { useRef, useState } from 'react';
import Header from '@/components/layout/Header';
import SwipeStack, { SwipeStackRef } from '@/components/search/SwipeStack';
import SwipeActions from '@/components/search/SwipeActions';
import { mockRecipes } from '@/data/mockRecipes';
import { Recipe } from '@/types';

export default function Search() {
  const swipeStackRef = useRef<SwipeStackRef>(null);
  const [likedRecipes, setLikedRecipes] = useState<Recipe[]>([]);
  const [passedRecipes, setPassedRecipes] = useState<Recipe[]>([]);

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
      <div className="p-4">
        <Header />

        <main className="max-w-md mx-auto mt-8">
          {/* ページタイトル */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              レシピを探す
            </h1>
            <p className="text-gray-600">
              気になるレシピをスワイプしてください
            </p>
          </div>

          {/* スワイプカードスタック */}
          <SwipeStack
            ref={swipeStackRef}
            recipes={mockRecipes}
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
