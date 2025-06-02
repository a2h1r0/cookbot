import { useState } from 'react';
import { SearchFilters, UseFiltersReturn, Category } from '@/types';

export function useFilters(): UseFiltersReturn {
  const [filters, setFilters] = useState<SearchFilters>({
    cookTime: '30分以内',
    serving: '2人分',
    ingredients: [],
    categories: Object.values(Category),
  });

  // 調理時間を更新
  const updateCookTime = (cookTime: string) => {
    setFilters((prev) => ({ ...prev, cookTime }));
  };

  // 人数を更新
  const updateServing = (serving: string) => {
    setFilters((prev) => ({ ...prev, serving }));
  };

  // 最後の1つのカテゴリは選択解除できない（空状態を防ぐ）
  const toggleCategory = (category: Category) => {
    setFilters((prev) => {
      const isSelected = prev.categories.includes(category);

      if (isSelected) {
        // 最後の1つの場合は選択解除しない
        if (prev.categories.length <= 1) {
          return prev;
        }
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

  // すべてのカテゴリを選択
  const selectAllCategories = () => {
    const allCategories = Object.values(Category);
    setFilters((prev) => ({ ...prev, categories: allCategories }));
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
    selectAllCategories,
    addIngredient,
    removeIngredient,
  };
}
