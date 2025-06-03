import { Recipe } from '@/types';
import { RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface IngredientsListProps {
  recipe: Recipe;
}

export default function IngredientsList({ recipe }: IngredientsListProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);

  const handleIngredientSelect = (index: number) => {
    setSelectedIngredients((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleUpdate = () => {
    if (selectedIngredients.length === 0) {
      return;
    }

    // TODO: 選択した材料の代用提案機能を実装
    const selectedIngredientNames = selectedIngredients.map(
      (index) => recipe.ingredients[index].name
    );
    console.log(`更新ボタンがクリックされました:`, selectedIngredientNames);

    // 更新後は選択をリセット
    setSelectedIngredients([]);
  };

  return (
    <div className="mb-6">
      <div className="mb-3">
        <h3 className="text-lg font-bold text-gray-800">材料</h3>
        <p className="text-xs text-gray-500 mt-1">
          調味料などを代用したい場合には材料をチェックして下部の更新ボタンを押してください
        </p>
      </div>
      <div className="space-y-2 mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <div
            key={index}
            className={`flex justify-between items-center py-3 px-2 border border-gray-200 rounded-lg transition-all cursor-pointer hover:bg-gray-50 ${
              selectedIngredients.includes(index)
                ? 'bg-orange-50 border-orange-200 shadow-sm'
                : 'bg-white hover:border-gray-300'
            }`}
            onClick={() => handleIngredientSelect(index)}
          >
            <div className="flex items-center space-x-3 flex-1">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedIngredients.includes(index)}
                  onChange={() => handleIngredientSelect(index)}
                  className="w-4 h-4 text-orange-500 bg-white border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2 cursor-pointer"
                />
                {selectedIngredients.includes(index) && (
                  <RefreshCw className="w-3 h-3 text-orange-600 absolute -top-1 -right-1 bg-white rounded-full" />
                )}
              </div>
              <span
                className={`transition-colors ${
                  selectedIngredients.includes(index)
                    ? 'text-orange-800 font-medium'
                    : 'text-gray-700'
                }`}
              >
                {ingredient.name}
              </span>
            </div>
            <span className="text-gray-600 font-medium">
              {ingredient.amount}
            </span>
          </div>
        ))}
      </div>
      {selectedIngredients.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={handleUpdate}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            <span>選択した{selectedIngredients.length}件の代用を提案</span>
          </button>
        </div>
      )}
    </div>
  );
}
