import { NextResponse } from 'next/server';
import { searchRecipes } from '@/server/api/search';

// GET /api/search - レシピ検索
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      { success: false, error: '検索クエリが必要です' },
      { status: 400 }
    );
  }

  const result = await searchRecipes(query);

  if (!result.success) {
    return NextResponse.json(
      { success: false, error: result.error },
      { status: 500 }
    );
  }

  return NextResponse.json(result);
}
