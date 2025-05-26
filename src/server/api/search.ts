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

    // TODO: ここで実際のデータベースやAPIを呼び出して検索を行う
    const searchResults = mockRecipes;

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
