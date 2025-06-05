'use client';

import IngredientsFilter from './IngredientsFilter';
import BasicFilter from './BasicFilter';
import { CategoryFilter } from './CategoryFilter';
import FreewordFilter from './FreewordFilter';
import { UseFiltersReturn } from '@/types';

type SearchProps = UseFiltersReturn & {
  onSearch: () => void;
  isLoading?: boolean;
  isOffline?: boolean;
};

export default function Search({
  filters,
  updateCookTime,
  updateServing,
  addIngredient,
  removeIngredient,
  toggleCategory,
  updateFreeword,
  onSearch,
  isLoading = false,
  isOffline = false,
}: SearchProps) {
  return (
    <div>
      <div className="p-3 border-y border-gray-300 mb-4">
        <div className="space-y-3">
          <BasicFilter
            filters={filters}
            updateCookTime={updateCookTime}
            updateServing={updateServing}
          />
          <div className="-mx-3 border-t border-gray-300"></div>
          <CategoryFilter
            selectedCategories={filters.categories}
            onToggleCategory={toggleCategory}
          />
          <div className="-mx-3 border-t border-gray-300"></div>
          <IngredientsFilter
            filters={filters}
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
          />
          <div className="-mx-3 border-t border-gray-300"></div>
          <FreewordFilter filters={filters} updateFreeword={updateFreeword} />
        </div>
      </div>

      <div className="pb-4">
        <button
          onClick={onSearch}
          disabled={isLoading || isOffline}
          className="w-full bg-[#5fbd84] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>検索中...</span>
            </>
          ) : isOffline ? (
            <>
              <span>📶</span>
              <span>オフライン - 検索できません</span>
            </>
          ) : (
            <>
              <span>🔍</span>
              <span>レシピを検索</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
