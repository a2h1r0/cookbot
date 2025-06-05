import { Substitution } from '@/types';

/**
 * 材料代用提案用のプロンプトを生成する
 */
export function createSubstitutionPrompt(ingredients: string[]): string {
  const ingredientList = ingredients.map((name) => `- ${name}`).join('\n');

  return `以下の材料について、一般的なスーパーで入手しやすい代用品を提案してください。
適切な代用品がない場合は無理に提案せず、nullを返してください。

対象材料:
${ingredientList}

以下のJSON形式で回答してください:
{
  "substitutions": [
    {
      "substitute": "代用材料名", 
      "amount": "具体的な分量（例: 大さじ2、100g、1個など）"
    }
  ]
}

重要な指示:
- 適切な代用品がない材料については、配列の該当位置にnullを設定する
- 代用材料は一般的なスーパーで入手しやすいもののみ提案する
- 無理な代用や味が大きく変わる代用は提案しない`;
}

/**
 * 材料代用提案のレスポンスから代用情報を抽出する
 */
export function parseSubstitutionsFromResponse(
  responseText: string
): (Substitution | null)[] {
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('有効なJSONが見つかりませんでした');
  }

  const substitutionData = JSON.parse(jsonMatch[0]);
  return substitutionData.substitutions || [];
}
