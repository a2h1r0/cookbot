import { useState } from 'react';
import { SearchFilters, UseFiltersReturn, Category } from '@/types';

export function useFilters(): UseFiltersReturn {
  const [filters, setFilters] = useState<SearchFilters>({
    cookTime: '30分以内',
    serving: '2人分',
    ingredients: [],
    categories: [],
  });

  // 調理時間を更新
  const updateCookTime = (cookTime: string) => {
    setFilters((prev) => ({ ...prev, cookTime }));
  };

  // 人数を更新
  const updateServing = (serving: string) => {
    setFilters((prev) => ({ ...prev, serving }));
  };

  // カテゴリの選択/選択解除を切り替え
  // 空配列 = 全カテゴリ選択、配列に値 = 特定カテゴリのみ選択
  const toggleCategory = (category: Category) => {
    setFilters((prev) => {
      const isSelected = prev.categories.includes(category);
      if (isSelected) {
        // 選択されているカテゴリを除外
        return {
          ...prev,
          categories: prev.categories.filter((c) => c !== category),
        };
      } else {
        // カテゴリを追加選択
        const newCategories = [...prev.categories, category];
        return { ...prev, categories: newCategories };
      }
    });
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
    toggleCategory,
    addIngredient,
    removeIngredient,
  };
}
