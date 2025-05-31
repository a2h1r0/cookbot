import { Recipe } from '@/types';

interface RecipeImageProps {
  recipe: Recipe;
}

export default function RecipeImage({ recipe }: RecipeImageProps) {
  return (
    <div className="mb-4">
      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="text-center text-gray-500">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
            <p className="text-sm">レシピ画像</p>
          </div>
        )}
      </div>
    </div>
  );
}
