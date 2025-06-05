'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import { UseFiltersReturn } from '@/types';

type FreewordFilterProps = Omit<
  UseFiltersReturn,
  | 'toggleCategory'
  | 'updateCookTime'
  | 'updateServing'
  | 'addIngredient'
  | 'removeIngredient'
>;

export default function FreewordFilter({
  filters,
  updateFreeword,
}: FreewordFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClearFreeword = () => {
    updateFreeword('');
  };

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-2 hover:bg-white/30 transition-all duration-200 rounded-lg px-2"
      >
        <div className="flex items-center space-x-2">
          <Search className="w-4 h-4 text-blue-500" />
          <span className="font-medium text-gray-800 text-sm">
            フリーワード
          </span>
          {filters.freeword && (
            <div className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
              {filters.freeword}
            </div>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="border-gray-200/30">
          <div className="space-y-3">
            <div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={filters.freeword}
                  onChange={(e) => updateFreeword(e.target.value)}
                  placeholder="キーワードなどで検索．．．"
                  className="flex-1 px-3 py-2 text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200"
                />
                {filters.freeword && (
                  <button
                    onClick={handleClearFreeword}
                    className="px-3 py-2 text-gray-600 rounded-lg text-sm font-medium bg-gray-200 hover:bg-gray-300 transition-colors duration-200 flex items-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
