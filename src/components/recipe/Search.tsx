'use client';

import IngredientsFilter from './IngredientsFilter';
import BasicFilter from './BasicFilter';
import { UseFiltersReturn } from '@/types';

type SearchProps = UseFiltersReturn;

export default function Search({
  filters,
  updateCookTime,
  updateServing,
  addIngredient,
  removeIngredient,
}: SearchProps) {
  return (
    <div className="p-3 border-y border-gray-300 mb-4">
      <div className="space-y-2">
        {/* 基本フィルター（調理時間・人数） */}
        <BasicFilter
          filters={filters}
          updateCookTime={updateCookTime}
          updateServing={updateServing}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
        />

        {/* 区切り線 */}
        <div className="-mx-3 border-t border-gray-300"></div>

        {/* 食材フィルター */}
        <IngredientsFilter
          filters={filters}
          updateCookTime={updateCookTime}
          updateServing={updateServing}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
        />
      </div>
    </div>
  );
}
