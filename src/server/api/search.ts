import { mockRecipes } from '@/data/mockRecipes';

// レシピ検索
export async function searchRecipes(query: string) {
  try {
    if (!query) {
      return {
        success: false,
        error: '検索クエリが必要です',
      };
    }

    // タイトル、説明、材料名で検索
    const searchResults = mockRecipes.filter((recipe) => {
      const titleMatch = recipe.title
        .toLowerCase()
        .includes(query.toLowerCase());
      const descriptionMatch = recipe.description
        .toLowerCase()
        .includes(query.toLowerCase());
      const ingredientMatch = recipe.ingredients.some((ingredient) =>
        ingredient.name.toLowerCase().includes(query.toLowerCase())
      );

      return titleMatch || descriptionMatch || ingredientMatch;
    });

    return {
      success: true,
      data: searchResults,
      total: searchResults.length,
      query,
    };
  } catch (error) {
    console.error('レシピ検索エラー:', error);
    return {
      success: false,
      error: '検索に失敗しました',
    };
  }
}
