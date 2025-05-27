export interface Ingredient {
  name: string;
  amount: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookTime: string;
  servings: number;
  ingredients: Ingredient[];
  steps: string[];
}

// API レスポンスの型定義
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  total?: number;
  query?: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface SearchFilter {
  cookTime: string; // 単一選択に変更
  serving: string; // 単一選択に変更（stringに統一）
  hasIngredientsFilter: boolean;
  ingredients: string[]; // 入力された食材のリスト
}

export interface FilterOptions {
  difficulties: Category[];
  cookTimes: Category[];
}
