import { Recipe } from '@/types';
import { mockRecipes } from '@/data/mockRecipes';

/**
 * モックレシピからランダムに指定数選択する
 */
export function selectRandomMockRecipes(): Recipe[] {
  const shuffledRecipes = [...mockRecipes].sort(() => Math.random() - 0.5);
  const selectedRecipes = [];

  // 重複を避けるために、各レシピにユニークなIDを付与
  for (let i = 0; i < 10; i++) {
    const originalRecipe = shuffledRecipes[i % shuffledRecipes.length];
    selectedRecipes.push({
      ...originalRecipe,
      id: `${originalRecipe.id}-instance-${i}`, // ユニークなIDを生成
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
  temperature: number
) {
  console.log('Development mode: Returning mock recipes');

  const selectedRecipes = selectRandomMockRecipes();

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
