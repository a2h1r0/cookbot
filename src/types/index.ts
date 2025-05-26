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
  difficulty: string;
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

export interface FilterOptions {
  categories: Category[];
  difficulties: Category[];
  cookTimes: Category[];
}
