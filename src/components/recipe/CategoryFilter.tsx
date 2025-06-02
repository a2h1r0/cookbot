'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Tag } from 'lucide-react';
import { Category } from '@/types';

interface CategoryFilterProps {
  selectedCategory?: Category;
  onCategoryChange: (category: Category | undefined) => void;
}

const categoryLabels: Record<Category, string> = {
  [Category.FISH]: '魚料理',
  [Category.MEAT]: '肉料理',
  [Category.VEGETABLE]: '野菜料理',
  [Category.SOUP]: 'スープ',
  [Category.DESSERT]: 'デザート',
  [Category.PIZZA]: 'ピザ',
  [Category.BEVERAGE]: '飲み物',
  [Category.OTHER]: 'その他',
};

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const categories = Object.values(Category);

  const hasActiveFilter = selectedCategory !== undefined;

  return (
    <div>
      {/* フラットヘッダー */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-2 hover:bg-white/30 transition-all duration-200 rounded-lg px-2"
      >
        <div className="flex items-center space-x-2">
          <Tag className="w-4 h-4 text-blue-500" />
          <span className="font-medium text-gray-800 text-sm">カテゴリ</span>
          {hasActiveFilter && (
            <div className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
              {categoryLabels[selectedCategory]}
            </div>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {/* 展開可能なコンテンツ */}
      {isExpanded && (
        <div className="mt-2 px-2 pb-2">
          <div className="flex flex-wrap gap-2">
            {/* "すべて"オプション */}
            <button
              onClick={() => onCategoryChange(undefined)}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                !selectedCategory
                  ? 'bg-blue-100 border-blue-300 text-blue-700'
                  : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
              }`}
            >
              すべて
            </button>

            {/* カテゴリオプション */}
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
