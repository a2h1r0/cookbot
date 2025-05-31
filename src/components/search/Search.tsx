'use client';

import { useEffect } from 'react';
import IngredientsFilter from './IngredientsFilter';
import BasicFilter from './BasicFilter';
import { useFilters } from '@/hooks/useFilters';
import { SearchFilters } from '@/types';

interface SearchProps {
  onChangeFilters: (filters: SearchFilters) => void;
}

export default function Search({ onChangeFilters }: SearchProps) {
  const filtersHook = useFilters();

  useEffect(() => {
    onChangeFilters(filtersHook.filters);
  }, [filtersHook.filters]);

  return (
    <div className="p-3 border-y border-gray-300 mb-4">
      <div className="space-y-2">
        {/* 基本フィルター（調理時間・人数） */}
        <BasicFilter {...filtersHook} />

        {/* 区切り線 */}
        <div className="-mx-3 border-t border-gray-300"></div>

        {/* 食材フィルター */}
        <IngredientsFilter {...filtersHook} />
      </div>
    </div>
  );
}
