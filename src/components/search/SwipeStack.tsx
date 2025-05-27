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
}

export interface SwipeStackRef {
  swipeLeft: () => void;
  swipeRight: () => void;
  undo: () => void;
  canUndo: () => boolean;
  restart: () => void;
}

const SwipeStack = forwardRef<SwipeStackRef, SwipeStackProps>(
  ({ recipes, onLike, onPass, onComplete }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [swipeHistory, setSwipeHistory] = useState<
      Array<{ recipe: Recipe; direction: 'left' | 'right' }>
    >([]);

    const handleSwipe = (direction: 'left' | 'right', recipe: Recipe) => {
      // スワイプ履歴に追加
      setSwipeHistory((prev) => [...prev, { recipe, direction }]);

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
    const handleUndo = () => {
      if (swipeHistory.length === 0 || currentIndex === 0) return;

      setSwipeHistory((prev) => prev.slice(0, -1));
      setCurrentIndex((prev) => prev - 1);
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
      undo: handleUndo,
      canUndo: () => swipeHistory.length > 0 && currentIndex > 0,
      restart: () => {
        setCurrentIndex(0);
        setSwipeHistory([]);
      },
    }));

    // 表示するカードの数（最大3枚）
    const visibleCards = recipes.slice(currentIndex, currentIndex + 3);
    if (currentIndex >= recipes.length) {
      const handleRestart = () => {
        setCurrentIndex(0);
        setSwipeHistory([]);
      };

      return (
        <div className="h-96 flex items-center justify-center">
          <SwipeCompletion onRestart={handleRestart} />
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
