import { Recipe } from '@/types';
import { RefreshCw } from 'lucide-react';

interface IngredientsListProps {
  recipe: Recipe;
}

export default function IngredientsList({ recipe }: IngredientsListProps) {
  const handleIngredientUpdate = (
    ingredientIndex: number,
    ingredientName: string
  ) => {
    // TODO: 調味料代用提案機能を実装
    console.log(
      `更新ボタンがクリックされました: ${ingredientName} (index: ${ingredientIndex})`
    );
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-3">材料</h3>
      <div className="space-y-2">
        {recipe.ingredients.map((ingredient, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b border-gray-100"
          >
            <div className="flex-1">
              <span className="text-gray-700">{ingredient.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">{ingredient.amount}</span>
              <button
                onClick={() => handleIngredientUpdate(index, ingredient.name)}
                className="p-1 text-orange-500 hover:bg-orange-50 rounded-full transition-colors"
                title={`${ingredient.name}の代用を提案`}
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
