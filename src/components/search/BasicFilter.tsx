'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Clock, Users } from 'lucide-react';

interface SearchFilter {
  cookTimes: string[];
  servings: number[];
  hasIngredientsFilter: boolean;
}

interface BasicFilterProps {
  onFilterChange: (filters: SearchFilter) => void;
  activeFilters: SearchFilter;
}

export default function BasicFilter({
  onFilterChange,
  activeFilters,
}: BasicFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cookTimes = [
    { id: '10', label: '10分以内' },
    { id: '20', label: '20分以内' },
    { id: '30', label: '30分以内' },
    { id: '60', label: '1時間以内' },
    { id: '60+', label: '1時間以上' },
  ];

  const servings = [
    { id: 1, label: '1人分' },
    { id: 2, label: '2人分' },
    { id: 3, label: '3人分' },
    { id: 4, label: '4人分以上' },
  ];

  // デフォルト値を設定
  useEffect(() => {
    if (
      activeFilters.cookTimes.length === 0 &&
      activeFilters.servings.length === 0
    ) {
      onFilterChange({
        ...activeFilters,
        cookTimes: ['30'], // デフォルト: 30分以内
        servings: [2], // デフォルト: 2人分
      });
    }
  }, []);

  const handleCookTimeSelect = (timeId: string) => {
    onFilterChange({
      ...activeFilters,
      cookTimes: [timeId], // 単一選択
    });
  };

  const handleServingSelect = (servingId: number) => {
    onFilterChange({
      ...activeFilters,
      servings: [servingId], // 単一選択
    });
  };

  // 選択中の項目を取得
  const selectedCookTime = cookTimes.find((time) =>
    activeFilters.cookTimes.includes(time.id)
  );
  const selectedServing = servings.find((serving) =>
    activeFilters.servings.includes(serving.id)
  );

  const hasActiveFilters = selectedCookTime || selectedServing;
  return (
    <div>
      {/* フラットヘッダー */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-2 hover:bg-white/30 transition-all duration-200 rounded-lg px-2"
      >
        {' '}
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-orange-500" />
          <span className="font-medium text-gray-800 text-sm">
            調理時間・人数
          </span>
          {hasActiveFilters && (
            <div className="flex items-center space-x-1">
              {selectedCookTime && (
                <div className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  {selectedCookTime.label}
                </div>
              )}
              {selectedServing && (
                <div className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  {selectedServing.label}
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
      {/* フラットなフィルター内容 */}
      {isExpanded && (
        <div className="mt-2 pt-2 border-t border-gray-200/30">
          <div className="py-2 space-y-3">
            {/* 調理時間 */}{' '}
            <div>
              <div className="flex items-center space-x-1.5 mb-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-600" />
                <h3 className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                  調理時間
                </h3>
              </div>
              <div className="flex flex-wrap gap-1">
                {cookTimes.map((time) => (
                  <button
                    key={time.id}
                    onClick={() => handleCookTimeSelect(time.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      activeFilters.cookTimes.includes(time.id)
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                    }`}
                  >
                    {time.label}
                  </button>
                ))}
              </div>
            </div>
            {/* セパレーター */}
            <div className="border-t border-gray-200/50"></div>
            {/* 人数 */}{' '}
            <div>
              <div className="flex items-center space-x-1.5 mb-1.5">
                <Users className="w-3.5 h-3.5 text-gray-600" />
                <h3 className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                  人数
                </h3>
              </div>
              <div className="flex flex-wrap gap-1">
                {servings.map((serving) => (
                  <button
                    key={serving.id}
                    onClick={() => handleServingSelect(serving.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      activeFilters.servings.includes(serving.id)
                        ? 'bg-purple-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700'
                    }`}
                  >
                    {serving.label}
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
