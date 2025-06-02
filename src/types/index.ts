export enum Category {
  FISH = 'fish',
  MEAT = 'meat',
  VEGETABLE = 'vegetable',
  SOUP = 'soup',
  DESSERT = 'dessert',
  PIZZA = 'pizza',
  BEVERAGE = 'beverage',
  OTHER = 'other',
}

export interface Ingredient {
  name: string;
  amount: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  cookTime: string;
  servings: number;
  ingredients: Ingredient[];
  steps: string[];
  category: Category;
}

export interface SearchFilters {
  cookTime: string;
  serving: string;
  ingredients: string[];
  category?: Category;
}

export interface UseFiltersReturn {
  filters: SearchFilters;
  updateCookTime: (cookTime: string) => void;
  updateServing: (serving: string) => void;
  addIngredient: (ingredient: string) => void;
  removeIngredient: (ingredient: string) => void;
  updateCategory: (category: Category | undefined) => void;
}

export interface UseSwipeReturn {
  currentIndex: number;
  swipe: (direction: 'left' | 'right') => void;
  reset: () => void;
  selectedRecipe: Recipe | null;
  isDialogOpen: boolean;
  closeDialog: () => void;
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
