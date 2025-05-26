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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      {/* ヘッダー */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        {' '}
        <div className="flex items-center space-x-2">
          <Carrot className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-900">食材フィルター</span>
          {activeFilters.hasIngredientsFilter && (
            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">
              ON
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* フィルター内容 */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={handleIngredientsToggle}
            className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
              activeFilters.hasIngredientsFilter
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Carrot
                className={`w-6 h-6 ${
                  activeFilters.hasIngredientsFilter
                    ? 'text-blue-600'
                    : 'text-gray-600'
                }`}
              />
              <div className="text-left">
                <div
                  className={`font-medium ${
                    activeFilters.hasIngredientsFilter
                      ? 'text-blue-900'
                      : 'text-gray-900'
                  }`}
                >
                  手持ちの食材で作る
                </div>
                <div className="text-sm text-gray-500">
                  手持ちの食材を活用したレシピを探す
                </div>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                activeFilters.hasIngredientsFilter
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}
            >
              {activeFilters.hasIngredientsFilter && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
