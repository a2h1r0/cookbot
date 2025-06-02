'use client';

import IngredientsFilter from './IngredientsFilter';
import BasicFilter from './BasicFilter';
import { CategoryFilter } from './CategoryFilter';
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
  selectAllCategories,
  onSearch,
  isLoading = false,
  isOffline = false,
}: SearchProps) {
  return (
    <div>
      <div className="p-3 border-y border-gray-300 mb-4">
        <div className="space-y-3">
          {/* 基本フィルター（調理時間・人数） */}
          <BasicFilter
            filters={filters}
            updateCookTime={updateCookTime}
            updateServing={updateServing}
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
          />
          {/* 区切り線 */}
          <div className="-mx-3 border-t border-gray-300"></div>{' '}
          {/* カテゴリフィルター */}
          <CategoryFilter
            selectedCategories={filters.categories}
            onToggleCategory={toggleCategory}
            onSelectAllCategories={selectAllCategories}
          />
          {/* 区切り線 */}
          <div className="-mx-3 border-t border-gray-300"></div>{' '}
          {/* 食材フィルター */}
          <IngredientsFilter
            filters={filters}
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
          />
        </div>
      </div>

      {/* 検索ボタン */}
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
