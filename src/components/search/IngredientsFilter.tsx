'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Carrot } from 'lucide-react';

interface SearchFilter {
  categories: string[];
  cookTimes: string[];
  servings: number[];
  hasIngredientsFilter: boolean; // TODO: たぶんここがingredientsでstring[]を返す．選択された食材一覧．
}

interface IngredientsFilterProps {
  onFilterChange: (filters: SearchFilter) => void;
  activeFilters: SearchFilter;
}

export default function IngredientsFilter({
  onFilterChange,
  activeFilters,
}: IngredientsFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleIngredientsToggle = () => {
    onFilterChange({
      ...activeFilters,
      hasIngredientsFilter: !activeFilters.hasIngredientsFilter,
    });
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
          {activeFilters.hasIngredientsFilter && (
            <div className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
              ON
            </div>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>      {/* フラットなフィルター内容 */}
      {isExpanded && (
        <div className="mt-2 pt-2 border-t border-gray-200/30">
          <div className="py-2">
            <button
              onClick={handleIngredientsToggle}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-all duration-200 ${
                activeFilters.hasIngredientsFilter
                  ? 'bg-green-50'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Carrot
                  className={`w-4 h-4 ${
                    activeFilters.hasIngredientsFilter
                      ? 'text-green-600'
                      : 'text-gray-600'
                  }`}
                />
                <div className="text-left">
                  <div
                    className={`font-medium text-sm ${
                      activeFilters.hasIngredientsFilter
                        ? 'text-green-800'
                        : 'text-gray-800'
                    }`}
                  >
                    手持ちの食材で作る
                  </div>
                  <div className="text-xs text-gray-500">
                    手持ちの食材を活用したレシピ
                  </div>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  activeFilters.hasIngredientsFilter
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-300'
                }`}
              >
                {activeFilters.hasIngredientsFilter && (
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                )}
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
