import { Recipe, SearchFilters } from '@/types';

/**
 * レシピ検索用のプロンプトを生成する
 */
export function createRecipeSearchPrompt(filters: SearchFilters): string {
  const conditions = [
    `調理時間: ${filters.cookTime}`,
    `人数: ${filters.serving}人分`,
  ];

  if (filters.ingredients.length > 0) {
    conditions.push(`使用したい食材: ${filters.ingredients.join(', ')}`);
  }

  const recipeTemplate: Partial<Recipe> = {
    title: 'レシピ名',
    description: 'レシピの説明',
    image: 'https://example.com/image.jpg',
    cookTime: '30分',
    servings: 2,
    ingredients: [{ name: '材料名', amount: '分量' }],
    steps: ['手順1', '手順2', '手順3'],
  };

  const jsonFormat = {
    recipes: [recipeTemplate],
  };

  return [
    '以下の条件でレシピを検索してください：',
    '',
    ...conditions,
    '',
    '以下のJSON形式で5つのレシピを提案してください：',
    JSON.stringify(jsonFormat, null, 2),
    '',
    '実際に存在する材料と手順で、実用的なレシピを提案してください。',
    '画像URLは適当なものを設定してください。',
  ].join('\n');
}

/**
 * Geminiレスポンスからレシピデータを抽出する
 */
export function parseRecipesFromResponse(responseText: string): Recipe[] {
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('有効なJSONが見つかりませんでした');
  }

  const recipesData = JSON.parse(jsonMatch[0]);
  return recipesData.recipes || [];
}
