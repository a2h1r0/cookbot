'use client';

import IngredientsFilter from './IngredientsFilter';
import BasicFilter from './BasicFilter';

export default function Search() {
  return (
    <div className="p-3 border-y border-gray-300 mb-4">
      <div className="space-y-2">
        {/* 基本フィルター（調理時間・人数） */}
        <BasicFilter />

        {/* 区切り線 */}
        <div className="-mx-3 border-t border-gray-300"></div>

        {/* 食材フィルター */}
        <IngredientsFilter />
      </div>
    </div>
  );
}
