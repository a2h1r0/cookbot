'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { mockRecipes } from '@/data/mockRecipes';
import { Recipe } from '@/types';
import Header from '@/components/layout/Header';
import RecipeImage from '@/components/recipe/RecipeImage';
import RecipeTitle from '@/components/recipe/RecipeTitle';
import IngredientsList from '@/components/recipe/IngredientsList';
import StepList from '@/components/recipe/StepList';
import BottomNavigation from '@/components/recipe/BottomNavigation';

export default function RecipePage() {
  const searchParams = useSearchParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const recipeId = searchParams.get('id');
    if (recipeId) {
      const foundRecipe = mockRecipes.find(r => r.id === recipeId);
      setRecipe(foundRecipe || null);
    }
  }, [searchParams]);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="px-4 py-4 pb-20 text-center">
          <p className="text-gray-500 mt-20">レシピが見つかりません</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main Content */}
      <main className="px-4 py-4 pb-20">
        <RecipeImage recipe={recipe} />
        <RecipeTitle recipe={recipe} />
        <IngredientsList recipe={recipe} />
        <StepList recipe={recipe} />
      </main>

      <BottomNavigation />
    </div>
  );
}
