import { Recipe } from '@/types';

interface IngredientsListProps {
  recipe: Recipe;
}

export default function IngredientsList({ recipe }: IngredientsListProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-3">材料</h3>
      <div className="space-y-2">
        {recipe.ingredients.map((ingredient, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b border-gray-100"
          >
            <span className="text-gray-700">{ingredient.name}</span>
            <span className="text-gray-600">{ingredient.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
