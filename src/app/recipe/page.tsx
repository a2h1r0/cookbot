'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { mockRecipes } from '@/data/mockRecipes';
import { Recipe } from '@/types';
import AppLayout from '@/components/layout/AppLayout';
import RecipeImage from '@/components/recipe/RecipeImage';
import RecipeTitle from '@/components/recipe/RecipeTitle';
import IngredientsList from '@/components/recipe/IngredientsList';
import StepList from '@/components/recipe/StepList';

export default function RecipePage() {
  const searchParams = useSearchParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const recipeId = searchParams.get('id');
    if (recipeId) {
      const foundRecipe = mockRecipes.find((r) => r.id === recipeId);
      setRecipe(foundRecipe || null);
    }
  }, [searchParams]);
  if (!recipe) {
    return (
      <AppLayout>
        <div className="text-center">
          <p className="text-gray-500 mt-20">レシピが見つかりません</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <RecipeImage recipe={recipe} />
      <RecipeTitle recipe={recipe} />
      <IngredientsList recipe={recipe} />
      <StepList recipe={recipe} />
    </AppLayout>
  );
}
