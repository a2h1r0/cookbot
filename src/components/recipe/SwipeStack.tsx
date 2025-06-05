'use client';

import SwipeCard from './SwipeCard';
import SwipeCompletion from './SwipeCompletion';
import { Recipe } from '@/types';
import { UseSwipeReturn } from '@/types';

interface SwipeStackProps extends UseSwipeReturn {
  recipes: Recipe[];
  onSearch: () => void;
}

export default function SwipeStack({
  recipes,
  currentIndex,
  swipe,
  onSearch,
}: SwipeStackProps) {
  if (currentIndex >= recipes.length) {
    return <SwipeCompletion onSearch={onSearch} />;
  }
  return (
    <div className="relative h-96 w-full max-w-sm mx-auto">
      {/* カードスタック */}{' '}
      {recipes.slice(currentIndex).map((recipe, index) => {
        const isTop = index === 0;

        return (
          <div
            key={recipe.id}
            className="absolute inset-0"
            style={{
              transform: `scale(${1 - index * 0.05}) translateY(${
                index * 10
              }px)`,
              zIndex: recipes.slice(currentIndex).length - index,
            }}
          >
            {' '}
            {isTop ? (
              <SwipeCard recipe={recipe} onSwipe={swipe} isTop={true} />
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
