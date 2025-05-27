'use client';

import IngredientsFilter from './IngredientsFilter';
import BasicFilter from './BasicFilter';

interface SearchFilter {
  categories: string[];
  cookTimes: string[];
  servings: number[];
  hasIngredientsFilter: boolean;
}

interface SearchProps {
  onFilterChange: (filters: SearchFilter) => void;
  activeFilters: SearchFilter;
}

export default function Search({ onFilterChange, activeFilters }: SearchProps) {
  return (
    <div className="p-3 border-y border-gray-300 mb-4">
      <div className="space-y-2">
        {/* 基本フィルター（調理時間・人数） */}
        <BasicFilter
          onFilterChange={onFilterChange}
          activeFilters={activeFilters}
        />

        {/* 区切り線 */}
        <div className="-mx-3 border-t border-gray-300"></div>

        {/* 食材フィルター */}
        <IngredientsFilter
          onFilterChange={onFilterChange}
          activeFilters={activeFilters}
        />
      </div>
    </div>
  );
}
