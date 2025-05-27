'use client';

import { useState, useImperativeHandle, forwardRef } from 'react';
import SwipeCard from './SwipeCard';
import SwipeCompletion from './SwipeCompletion';
import { Recipe } from '@/types';

interface SwipeStackProps {
  recipes: Recipe[];
  onLike: (recipe: Recipe) => void;
  onPass: (recipe: Recipe) => void;
  onComplete?: () => void;
  onSearch?: () => void;
}

export interface SwipeStackRef {
  swipeLeft: () => void;
  swipeRight: () => void;
  restart: () => void;
}

const SwipeStack = forwardRef<SwipeStackRef, SwipeStackProps>(
  ({ recipes, onLike, onPass, onComplete, onSearch }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleSwipe = (direction: 'left' | 'right', recipe: Recipe) => {
      // コールバックを実行
      if (direction === 'right') {
        onLike(recipe);
      } else {
        onPass(recipe);
      }

      // 次のカードに移動
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      // 完了チェック
      if (nextIndex >= recipes.length && onComplete) {
        onComplete();
      }
    };
    // 外部からスワイプ操作を可能にする
    useImperativeHandle(ref, () => ({
      swipeLeft: () => {
        if (currentIndex < recipes.length) {
          handleSwipe('left', recipes[currentIndex]);
        }
      },
      swipeRight: () => {
        if (currentIndex < recipes.length) {
          handleSwipe('right', recipes[currentIndex]);
        }
      },
      restart: () => {
        setCurrentIndex(0);
      },
    }));

    // 表示するカードの数（最大3枚）
    const visibleCards = recipes.slice(currentIndex, currentIndex + 3);
    if (currentIndex >= recipes.length) {
      const handleSearch = () => {
        // 再検索を実行
        if (onSearch) {
          onSearch();
        }
        // インデックスをリセット
        setCurrentIndex(0);
      };

      return (
        <div className="h-96 flex items-center justify-center">
          <SwipeCompletion onSearch={handleSearch} />
        </div>
      );
    }

    return (
      <div className="relative h-96 w-full max-w-sm mx-auto">
        {/* カードスタック */}
        {visibleCards.map((recipe, index) => {
          const cardIndex = currentIndex + index;
          const isTop = index === 0;

          return (
            <div
              key={recipe.id}
              className="absolute inset-0"
              style={{
                transform: `scale(${1 - index * 0.05}) translateY(${
                  index * 10
                }px)`,
                zIndex: visibleCards.length - index,
              }}
            >
              {isTop ? (
                <SwipeCard recipe={recipe} onSwipe={handleSwipe} isTop={true} />
              ) : (
                <div className="bg-white rounded-2xl shadow-lg h-full max-w-sm mx-auto">
                  <div className="h-64 bg-gray-100 rounded-t-2xl"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded mb-4"></div>
                    <div className="flex space-x-4">
                      <div className="h-3 bg-gray-100 rounded flex-1"></div>
                      <div className="h-3 bg-gray-100 rounded flex-1"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

SwipeStack.displayName = 'SwipeStack';

export default SwipeStack;
