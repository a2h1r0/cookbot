'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Users } from 'lucide-react';
import { UseFiltersReturn } from '@/types';

type BasicFilterProps = Omit<
  UseFiltersReturn,
  'toggleCategory' | 'selectAllCategories'
>;

export default function BasicFilter({
  filters,
  updateCookTime,
  updateServing,
}: BasicFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cookTimes = [
    '10分以内',
    '20分以内',
    '30分以内',
    '1時間以内',
    '1時間以上',
  ];
  const servings = ['1人分', '2人分', '3人分', '4人分以上'];

  // 選択中の項目を取得
  const selectedCookTime = filters.cookTime;
  const selectedServing = filters.serving;

  const hasActiveFilters = selectedCookTime || selectedServing;

  return (
    <div>
      {/* フラットヘッダー */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-2 hover:bg-white/30 transition-all duration-200 rounded-lg px-2"
      >
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-orange-500" />
          <span className="font-medium text-gray-800 text-sm">
            調理時間・人数
          </span>{' '}
          {hasActiveFilters && (
            <div className="flex items-center space-x-1">
              {selectedCookTime && (
                <div className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  {selectedCookTime}
                </div>
              )}
              {selectedServing && (
                <div className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  {selectedServing}
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
      </button>

      {/* フラットなフィルター内容 */}
      {isExpanded && (
        <div className="mt-2 pt-2 border-t border-gray-200/30">
          <div className="py-2 space-y-3">
            {/* 調理時間 */}
            <div>
              <div className="flex items-center space-x-1.5 mb-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-600" />
                <h3 className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                  調理時間
                </h3>
              </div>{' '}
              <div className="flex flex-wrap gap-1">
                {cookTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => updateCookTime(time)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      filters.cookTime === time
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* セパレーター */}
            <div className="border-t border-gray-200/50"></div>

            {/* 人数 */}
            <div>
              <div className="flex items-center space-x-1.5 mb-1.5">
                <Users className="w-3.5 h-3.5 text-gray-600" />
                <h3 className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                  人数
                </h3>
              </div>{' '}
              <div className="flex flex-wrap gap-1">
                {servings.map((serving) => (
                  <button
                    key={serving}
                    onClick={() => updateServing(serving)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      filters.serving === serving
                        ? 'bg-purple-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700'
                    }`}
                  >
                    {serving}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
