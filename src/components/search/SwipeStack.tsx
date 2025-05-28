'use client';

import { useImperativeHandle, forwardRef } from 'react';
import SwipeCard from './SwipeCard';
import SwipeCompletion from './SwipeCompletion';
import { Recipe } from '@/types';

interface SwipeStackProps {
  currentIndex: number;
  recipes: Recipe[];
  isComplete: boolean;
  visibleCards: Recipe[];
  onSwipe: (direction: 'left' | 'right', recipe: Recipe) => void;
  onSearch: () => void;
}

export interface SwipeStackRef {
  swipeLeft: () => void;
  swipeRight: () => void;
}

const SwipeStack = forwardRef<SwipeStackRef, SwipeStackProps>(
  (
    { currentIndex, recipes, isComplete, visibleCards, onSwipe, onSearch },
    ref
  ) => {
    // 外部からスワイプ操作を可能にする（ただし実際の処理は親コンポーネントで行う）
    useImperativeHandle(ref, () => ({
      swipeLeft: () => {
        if (currentIndex < recipes.length) {
          onSwipe('left', recipes[currentIndex]);
        }
      },
      swipeRight: () => {
        if (currentIndex < recipes.length) {
          onSwipe('right', recipes[currentIndex]);
        }
      },
    }));

    if (isComplete) {
      return (
        <div className="h-96 flex items-center justify-center">
          <SwipeCompletion onSearch={onSearch} />
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
              {' '}
              {isTop ? (
                <SwipeCard recipe={recipe} onSwipe={onSwipe} isTop={true} />
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
