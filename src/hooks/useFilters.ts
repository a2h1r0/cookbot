import { useState, useEffect } from 'react';
import { SearchFilter } from '@/types';

export function useFilters() {
  const [filters, setFilters] = useState<SearchFilter>({
    cookTime: '',
    serving: '',
    ingredients: [],
  });

  // デフォルト値を設定
  useEffect(() => {
    if (!filters.cookTime && !filters.serving) {
      setFilters((prev) => ({
        ...prev,
        cookTime: '30分以内', // デフォルト: 30分以内
        serving: '2人分', // デフォルト: 2人分
      }));
    }
  }, []);

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
  // 全てのフィルターをリセット
  const resetFilters = () => {
    setFilters({
      cookTime: '30分以内',
      serving: '2人分',
      ingredients: [],
    });
  };

  return {
    filters,
    updateCookTime,
    updateServing,
    addIngredient,
    removeIngredient,
    resetFilters,
  };
}
