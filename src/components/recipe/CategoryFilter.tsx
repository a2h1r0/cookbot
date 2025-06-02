'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Tag } from 'lucide-react';
import { Category } from '@/types';

interface CategoryFilterProps {
  selectedCategories: Category[];
  onToggleCategory: (category: Category) => void;
  onSelectAllCategories: () => void;
}

const categoryLabels: Record<Category, string> = {
  [Category.FISH]: '魚料理',
  [Category.MEAT]: '肉料理',
  [Category.VEGETABLE]: '野菜料理',
  [Category.SOUP]: 'スープ',
  [Category.DESSERT]: 'デザート',
  [Category.PIZZA]: 'ピザ',
  [Category.BEVERAGE]: '飲み物',
  [Category.JAPANESE]: '和食',
  [Category.ITALIAN]: 'イタリアン',
  [Category.CHINESE]: '中華',
  [Category.KOREAN]: '韓国料理',
  [Category.THAI]: 'タイ料理',
  [Category.INDIAN]: 'インド料理',
  [Category.FRENCH]: 'フレンチ',
  [Category.AMERICAN]: 'アメリカン',
};

export function CategoryFilter({
  selectedCategories,
  onToggleCategory,
  onSelectAllCategories,
}: CategoryFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const categories = Object.values(Category);

  const isAllSelected = selectedCategories.length === categories.length;

  return (
    <div>
      {/* フラットヘッダー */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-2 hover:bg-white/30 transition-all duration-200 rounded-lg px-2"
      >
        {' '}
        <div className="flex items-center space-x-2">
          <Tag className="w-4 h-4 text-blue-500" />
          <span className="font-medium text-gray-800 text-sm">カテゴリ</span>
          {isAllSelected ? (
            <div className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
              すべて
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              {selectedCategories.slice(0, 2).map((category) => (
                <div
                  key={category}
                  className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium"
                >
                  {categoryLabels[category]}
                </div>
              ))}
              {selectedCategories.length > 2 && (
                <div className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  +{selectedCategories.length - 2}
                </div>
              )}
            </div>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>{' '}
      {/* 展開可能なコンテンツ */}
      {isExpanded && (
        <div className="mt-2 px-2 pb-2">
          {' '}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={onSelectAllCategories}
              className="px-3 py-1.5 text-sm rounded-full border border-green-300 bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
            >
              すべて選択
            </button>
            {/* カテゴリオプション */}
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category);
              const isLastSelected =
                selectedCategories.length === 1 && isSelected;
              return (
                <button
                  key={category}
                  onClick={() => !isLastSelected && onToggleCategory(category)}
                  disabled={isLastSelected}
                  className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                    isSelected
                      ? 'bg-blue-100 border-blue-300 text-blue-700'
                      : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                  } ${isLastSelected ? 'cursor-not-allowed opacity-75' : ''}`}
                >
                  {categoryLabels[category]}
                  {isLastSelected && (
                    <span className="ml-1 text-xs">（最低1つ必要）</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
