import { Recipe } from '@/types';
import { mockRecipes } from '@/data/mockRecipes';

/**
 * モックレシピからランダムに指定数選択する
 */
export function selectRandomMockRecipes(count: number = 5): Recipe[] {
  const shuffledRecipes = [...mockRecipes].sort(() => Math.random() - 0.5);
  const selectedRecipes = [];

  for (let i = 0; i < count; i++) {
    const recipe = shuffledRecipes[i % shuffledRecipes.length];
    selectedRecipes.push({
      ...recipe,
    });
  }

  return selectedRecipes;
}

/**
 * モックレシピレスポンスを生成する
 */
export function createMockRecipeResponse(
  prompt: string,
  model: string,
  temperature: number,
  recipeCount: number = 5
) {
  console.log('Development mode: Returning mock recipes');

  const selectedRecipes = selectRandomMockRecipes(recipeCount);

  const mockResponse = {
    recipes: selectedRecipes,
  };

  return {
    success: true,
    data: {
      text: JSON.stringify(mockResponse, null, 2),
      model: `${model} (mock)`,
      temperature,
      prompt: prompt.substring(0, 100) + (prompt.length > 100 ? '...' : ''),
    },
  };
}
