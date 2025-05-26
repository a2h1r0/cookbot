import { Recipe } from '@/types';

interface RecipeTitleProps {
  recipe: Recipe;
}

export default function RecipeTitle({ recipe }: RecipeTitleProps) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
        {recipe.title}
      </h2>
      <div className="flex items-center text-sm text-gray-600 space-x-4">
        <span>調理時間: {recipe.cookTime}分</span>
        <span>人数: {recipe.servings}人分</span>
        <span>難易度: {recipe.difficulty}</span>
      </div>
    </div>
  );
}
