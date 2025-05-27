import { useState, useEffect } from 'react';
import { SearchFilter } from '@/types';

export function useFilters() {
  const [filters, setFilters] = useState<SearchFilter>({
    cookTime: '',
    serving: 0,
    hasIngredientsFilter: false,
    ingredients: [],
  });

  // デフォルト値を設定
  useEffect(() => {
    if (!filters.cookTime && !filters.serving) {
      setFilters((prev) => ({
        ...prev,
        cookTime: '30', // デフォルト: 30分以内
        serving: 2, // デフォルト: 2人分
      }));
    }
  }, []);

  // 調理時間を更新
  const updateCookTime = (cookTime: string) => {
    setFilters((prev) => ({ ...prev, cookTime }));
  };

  // 人数を更新
  const updateServing = (serving: number) => {
    setFilters((prev) => ({ ...prev, serving }));
  };

  // 食材を追加
  const addIngredient = (ingredient: string) => {
    if (ingredient.trim() && !filters.ingredients.includes(ingredient.trim())) {
      setFilters((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, ingredient.trim()],
        hasIngredientsFilter: true,
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
      hasIngredientsFilter: newIngredients.length > 0,
    }));
  };

  // 全てのフィルターをリセット
  const resetFilters = () => {
    setFilters({
      cookTime: '30',
      serving: 2,
      hasIngredientsFilter: false,
      ingredients: [],
    });
  };

  // フィルターをまとめて更新（既存のコンポーネントとの互換性のため）
  const updateFilters = (newFilters: SearchFilter) => {
    setFilters(newFilters);
  };

  return {
    filters,
    updateCookTime,
    updateServing,
    addIngredient,
    removeIngredient,
    resetFilters,
    updateFilters, // 既存コンポーネントとの互換性
  };
}
