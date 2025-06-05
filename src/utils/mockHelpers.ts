import { Recipe, Substitution } from '@/types';
import { mockRecipes } from '@/data/mockRecipes';
import { mockSubstitutions } from '@/data/mockSubstitutions';

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

/**
 * 材料代用提案のモックレスポンスを生成する
 */
export function createMockSubstitutionResponse(
  ingredients: string[],
  prompt: string,
  model: string,
  temperature: number
) {
  const substitutions: (Substitution | null)[] = ingredients.map((name) => {
    const exactMatch = mockSubstitutions[name];
    if (exactMatch) {
      return exactMatch;
    }

    const partialMatch = Object.keys(mockSubstitutions).find(
      (key) => name.includes(key) || key.includes(name)
    );
    if (partialMatch) {
      const substitution = mockSubstitutions[partialMatch];
      return substitution;
    }

    return null;
  });

  const mockResponse = {
    substitutions,
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
