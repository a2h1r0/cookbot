'use client';

import { useState } from 'react';
import { Clock, Users } from 'lucide-react';
import IngredientsFilter from './IngredientsFilter';

interface SearchFilter {
  categories: string[];
  cookTimes: string[];
  difficulties: string[];
  servings: number[];
  hasIngredientsFilter: boolean;
}

interface SearchProps {
  onFilterChange: (filters: SearchFilter) => void;
  activeFilters: SearchFilter;
}

export default function Search({ onFilterChange, activeFilters }: SearchProps) {
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

  const handleCookTimeToggle = (timeId: string) => {
    const newCookTimes = activeFilters.cookTimes.includes(timeId)
      ? activeFilters.cookTimes.filter((t) => t !== timeId)
      : [...activeFilters.cookTimes, timeId];

    onFilterChange({
      ...activeFilters,
      cookTimes: newCookTimes,
    });
  };

  const handleServingToggle = (servingId: number) => {
    const newServings = activeFilters.servings.includes(servingId)
      ? activeFilters.servings.filter((s) => s !== servingId)
      : [...activeFilters.servings, servingId];

    onFilterChange({
      ...activeFilters,
      servings: newServings,
    });
  };

  return (
    <div className="space-y-4">
      {/* 調理時間と人数分のフィルター（常に表示） */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
        {/* 調理時間 */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Clock className="w-5 h-5 text-gray-600" />
            <h3 className="text-sm font-medium text-gray-900">調理時間</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {cookTimes.map((time) => (
              <button
                key={time.id}
                onClick={() => handleCookTimeToggle(time.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeFilters.cookTimes.includes(time.id)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {time.label}
              </button>
            ))}
          </div>
        </div>

        {/* 人数 */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Users className="w-5 h-5 text-gray-600" />
            <h3 className="text-sm font-medium text-gray-900">人数</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {servings.map((serving) => (
              <button
                key={serving.id}
                onClick={() => handleServingToggle(serving.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeFilters.servings.includes(serving.id)
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {serving.label}
              </button>
            ))}
          </div>
        </div>
      </div>{' '}
      {/* 食材フィルター */}
      <IngredientsFilter
        onFilterChange={onFilterChange}
        activeFilters={activeFilters}
      />
    </div>
  );
}
