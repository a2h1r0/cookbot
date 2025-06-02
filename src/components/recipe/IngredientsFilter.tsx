'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Carrot, Plus, X } from 'lucide-react';
import { UseFiltersReturn } from '@/types';

type IngredientsFilterProps = Omit<
  UseFiltersReturn,
  'toggleCategory' | 'selectAllCategories' | 'updateCookTime' | 'updateServing'
>;

export default function IngredientsFilter({
  filters,
  addIngredient,
  removeIngredient,
}: IngredientsFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleAddIngredient = () => {
    if (inputValue.trim() && !filters.ingredients.includes(inputValue.trim())) {
      addIngredient(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  return (
    <div>
      {/* フラットヘッダー */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-2 hover:bg-white/30 transition-all duration-200 rounded-lg px-2"
      >
        <div className="flex items-center space-x-2">
          <Carrot className="w-4 h-4 text-green-500" />
          <span className="font-medium text-gray-800 text-sm">
            食材フィルター
          </span>
          {filters.ingredients.length > 0 && (
            <div className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
              {filters.ingredients.length}個
            </div>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {/* フラットなフィルター内容 */}
      {isExpanded && (
        <div className="border-gray-200/30">
          <div className="space-y-3">
            {/* 食材入力フィールド */}
            <div>
              <div className="flex items-center space-x-1.5 mb-1.5">
                <h3 className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                  手持ちの食材
                </h3>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="食材名を入力..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-gray-800 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200"
                />
                <button
                  onClick={handleAddIngredient}
                  disabled={!inputValue.trim()}
                  className="px-3 py-2 text-white rounded-lg text-sm font-medium bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 追加された食材のリスト */}
            {filters.ingredients.length > 0 && (
              <div>
                <div className="flex flex-wrap gap-2">
                  {filters.ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      <span>{ingredient}</span>
                      <button
                        onClick={() => removeIngredient(ingredient)}
                        className="text-green-600 hover:text-green-800 transition-colors duration-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
