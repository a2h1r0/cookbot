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
  ingredients: string[]; // 入力された食材のリスト
}

export interface UseFiltersReturn {
  filters: SearchFilter;
  updateCookTime: (cookTime: string) => void;
  updateServing: (serving: string) => void;
  addIngredient: (ingredient: string) => void;
  removeIngredient: (ingredient: string) => void;
}

export interface UseSwipeReturn {
  currentIndex: number;
  swipe: (direction: 'left' | 'right') => void;
  reset: () => void;
}

export interface FilterOptions {
  difficulties: Category[];
  cookTimes: Category[];
}

// Gemini API関連の型定義
export interface GeminiRequest {
  prompt: string;
  model?: string;
  temperature?: number;
}

export interface GeminiResponse {
  text: string;
  model: string;
  temperature: number;
  prompt: string;
}

export interface UseGeminiReturn {
  loading: boolean;
  error: string | null;
  generate: (request: GeminiRequest) => Promise<GeminiResponse | null>;
  lastResponse: GeminiResponse | null;
}
