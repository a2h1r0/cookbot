import { useState } from 'react';
import { SearchFilters, UseFiltersReturn } from '@/types';

export function useFilters(): UseFiltersReturn {
  const [filters, setFilters] = useState<SearchFilters>({
    cookTime: '30分以内',
    serving: '2人分',
    ingredients: [],
  });

  // 調理時間を更新
  const updateCookTime = (cookTime: string) => {
    setFilters((prev) => ({ ...prev, cookTime }));
  };

  // 人数を更新
  const updateServing = (serving: string) => {
    setFilters((prev) => ({ ...prev, serving }));
  };

  // 食材を追加
  const addIngredient = (ingredient: string) => {
    if (ingredient.trim() && !filters.ingredients.includes(ingredient.trim())) {
      setFilters((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, ingredient.trim()],
      }));
    }
  };

  // 食材を削除
  const removeIngredient = (ingredient: string) => {
    const newIngredients = filters.ingredients.filter(
      (item) => item !== ingredient
    );
    setFilters((prev) => ({
      ...prev,
      ingredients: newIngredients,
    }));
  };

  return {
    filters,
    updateCookTime,
    updateServing,
    addIngredient,
    removeIngredient,
  };
}
