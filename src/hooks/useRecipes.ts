import { useState, useEffect, useCallback } from 'react';
import { Recipe } from '@/types';
import { useGemini } from './useGemini';

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { generate, loading: geminiLoading, error: geminiError } = useGemini();

  const searchRecipes = async (
    query: string,
    filters?: { cookTime?: string; serving?: string; ingredients?: string[] }
  ) => {
    try {
      setLoading(true);
      setError(null);

      // Gemini AIを使用してレシピ検索のプロンプトを生成
      let prompt = `以下の条件でレシピを検索してください：

検索キーワード: ${query}`;

      if (filters) {
        if (filters.cookTime) {
          prompt += `\n調理時間: ${filters.cookTime}`;
        }
        if (filters.serving) {
          prompt += `\n人数: ${filters.serving}人分`;
        }
        if (filters.ingredients && filters.ingredients.length > 0) {
          prompt += `\n使用したい食材: ${filters.ingredients.join(', ')}`;
        }
      }

      prompt += `

以下のJSON形式で5つのレシピを提案してください：
{
  "recipes": [
    {
      "id": "unique_id",
      "title": "レシピ名",
      "description": "レシピの説明",
      "image": "https://example.com/image.jpg",
      "cookTime": "30分",
      "servings": 2,
      "ingredients": [
        {"name": "材料名", "amount": "分量"}
      ],
      "steps": ["手順1", "手順2", "手順3"]
    }
  ]
}

実際に存在する材料と手順で、実用的なレシピを提案してください。画像URLは適当なものを設定してください。`;

      const response = await generate({ prompt, temperature: 0.8 });

      if (!response) {
        throw new Error('レシピの生成に失敗しました');
      }

      // Geminiからのレスポンスを解析してレシピデータを抽出
      try {
        const jsonMatch = response.text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('有効なJSONが見つかりませんでした');
        }

        const recipesData = JSON.parse(jsonMatch[0]);
        const generatedRecipes = recipesData.recipes || [];

        setRecipes(generatedRecipes);
      } catch (parseError) {
        console.error('JSON解析エラー:', parseError);
        throw new Error('レシピデータの解析に失敗しました');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipes = async () => {
    await searchRecipes('ハンバーグ');
  };
  useEffect(() => {
    fetchRecipes();
  }, []);

  return {
    recipes,
    loading: loading || geminiLoading,
    error: error || geminiError,
    fetchRecipes,
    searchRecipes,
  };
}
