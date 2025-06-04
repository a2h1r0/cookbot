import { Recipe, SearchFilters, Category } from '@/types';

/**
 * セッション内で生成されたレシピタイトルを管理するクラス
 * 重複回避のために使用
 */
class GeneratedRecipeManager {
  private static instance: GeneratedRecipeManager;
  private generatedTitles: string[] = [];
  private readonly maxTitles = 50; // 最大保持件数

  private constructor() {}

  static getInstance(): GeneratedRecipeManager {
    if (!GeneratedRecipeManager.instance) {
      GeneratedRecipeManager.instance = new GeneratedRecipeManager();
    }
    return GeneratedRecipeManager.instance;
  }

  /**
   * 新しく生成されたレシピタイトルを追加
   */
  addTitles(titles: string[]): void {
    this.generatedTitles.push(...titles);

    // 最大件数を超えた場合、古いものから削除
    if (this.generatedTitles.length > this.maxTitles) {
      this.generatedTitles = this.generatedTitles.slice(-this.maxTitles);
    }
  }

  /**
   * 現在保持している生成済みタイトル一覧を取得
   */
  getGeneratedTitles(): string[] {
    return [...this.generatedTitles];
  }
}

/**
 * レシピ検索用のプロンプトを生成する
 */
export function createRecipeSearchPrompt(filters: SearchFilters): string {
  const titleManager = GeneratedRecipeManager.getInstance();
  const generatedTitles = titleManager.getGeneratedTitles();

  const conditions = [
    `調理時間: ${filters.cookTime}`,
    `人数: ${filters.serving}`,
  ];

  if (
    filters.categories.length > 0 &&
    filters.categories.length !== Object.values(Category).length
  ) {
    conditions.push(`対象カテゴリ: ${filters.categories.join(', ')}`);
  }

  if (filters.ingredients.length > 0) {
    conditions.push(`使用したい食材: ${filters.ingredients.join(', ')}`);
  }

  if (generatedTitles.length > 0) {
    conditions.push(
      `※ 以下のレシピタイトルは既に提案済みのため、異なるレシピを提案してください: ${generatedTitles.join(', ')}`
    );
  }

  const recipeTemplate: Partial<Recipe> = {
    title: 'レシピ名',
    description: 'レシピの説明',
    cookTime: '30分',
    servings: 2,
    category: Category.JAPANESE,
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
    `カテゴリは以下から適切なものを選んでください：${Object.values(
      Category
    ).join(', ')}`,
    '',
    '以下のJSON形式で5つのレシピを提案してください：',
    JSON.stringify(jsonFormat, null, 2),
    '',
    '実際に存在する材料と手順で、実用的なレシピを提案してください。',
    'categoryフィールドには上記のカテゴリから最も適切なものを設定してください。',
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
  const recipes = recipesData.recipes || [];

  // 生成されたレシピにユニークなIDを追加
  const processedRecipes = recipes.map((recipe: Recipe, index: number) => ({
    ...recipe,
    id: recipe.id || `generated-${Date.now()}-${index}`,
  }));

  // 新しく生成されたレシピタイトルを管理クラスに追加
  const titleManager = GeneratedRecipeManager.getInstance();
  const newTitles = processedRecipes
    .map((recipe: Recipe) => recipe.title)
    .filter(Boolean);
  titleManager.addTitles(newTitles);

  return processedRecipes;
}

/**
 * 材料代用提案用のプロンプトを生成する
 */
export function createSubstitutionPrompt(ingredients: string[]): string {
  const ingredientList = ingredients.map((name) => `- ${name}`).join('\n');

  return `以下の材料について、より手に入りやすい食材や一般的な代用品を提案してください。
栄養価や味の特徴を考慮した代替案を提示し、使用方法や注意点も含めてください。

対象材料:
${ingredientList}

以下のJSON形式で回答してください:
{
  "substitutions": [
    {
      "original": "元の材料名",
      "substitute": "代用材料名", 
      "reason": "代用する理由（栄養価、味、入手しやすさなど）",
      "ratio": "代用比率（例: 1:1、元の材料1に対して代用材料1.5など）",
      "notes": "使用時の注意点やコツ"
    }
  ]
}

注意事項:
- 代用材料は一般的なスーパーで入手しやすいものを提案する
- 味や食感の変化について正直に説明する
- アレルギーや健康上の注意点があれば明記する
- 調理法の調整が必要な場合は具体的に説明する`;
}

/**
 * 材料代用提案のレスポンスから代用情報を抽出する
 */
export function parseSubstitutionsFromResponse(responseText: string) {
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('有効なJSONが見つかりませんでした');
  }

  const substitutionData = JSON.parse(jsonMatch[0]);
  return substitutionData.substitutions || [];
}
