'use server';

import { searchRecipes } from '@/server/api/search';

/**
 * サーバーサイドでレシピを検索するアクション
 */
export async function searchRecipesAction(query: string) {
  return await searchRecipes(query);
}
