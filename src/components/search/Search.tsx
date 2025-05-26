'use client';

import IngredientsFilter from './IngredientsFilter';
import BasicFilter from './BasicFilter';

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
  return (
    <div className="space-y-4">
      {/* 基本フィルター（調理時間・人数） */}
      <BasicFilter
        onFilterChange={onFilterChange}
        activeFilters={activeFilters}
      />

      {/* 食材フィルター */}
      <IngredientsFilter
        onFilterChange={onFilterChange}
        activeFilters={activeFilters}
      />
    </div>
  );
}
