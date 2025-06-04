import { Ingredient, Recipe } from '@/types';
import { RefreshCw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSubstitutions } from '@/hooks/useSubstitutions';

interface IngredientsListProps {
  recipe: Recipe;
}

export default function IngredientsList({ recipe }: IngredientsListProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const { substitutions, loading, error, searchSubstitutions } =
    useSubstitutions();
  // 初期化時と recipe が変わったときに ingredients を設定
  useEffect(() => {
    setIngredients(
      recipe.ingredients.map((ingredient) => ({
        name: ingredient.name,
        amount: ingredient.amount,
      }))
    );
  }, [recipe.ingredients]);
  // 代用品提案が更新されたときに ingredients を更新
  useEffect(() => {
    if (substitutions.length > 0) {
      setIngredients((prevIngredients) =>
        prevIngredients.map((ingredient) => {
          const substitution = substitutions.find(
            (sub) =>
              sub.original
                .toLowerCase()
                .includes(ingredient.name.toLowerCase()) ||
              ingredient.name.toLowerCase().includes(sub.original.toLowerCase())
          );
          return {
            ...ingredient,
            substitution,
            isLoading: false,
          };
        })
      );
    }
  }, [substitutions]);

  const handleIngredientSelect = (index: number) => {
    setSelectedIngredients((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleUpdate = async () => {
    if (selectedIngredients.length === 0) {
      return;
    }
    const selectedIngredientNames = selectedIngredients.map(
      (index) => ingredients[index].name
    );

    // 選択された材料をローディング状態に設定
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient, index) => ({
        ...ingredient,
        isLoading: selectedIngredients.includes(index),
      }))
    );

    console.log(`代用提案リクエスト開始:`, selectedIngredientNames);
    try {
      await searchSubstitutions(selectedIngredientNames);
      // 更新後は選択をリセット
      setSelectedIngredients([]);
    } catch (error) {
      console.error('代用提案の取得に失敗しました:', error);
      // エラー時はローディング状態をリセット
      setIngredients((prevIngredients) =>
        prevIngredients.map((ingredient) => ({
          ...ingredient,
          isLoading: false,
        }))
      );
    }
  };

  return (
    <div className="mb-6">
      {' '}
      <div className="mb-3">
        <h3 className="text-lg font-bold text-gray-800">材料</h3>
        <p className="text-xs text-gray-500 mt-1">
          調味料などを代用したい場合には材料をチェックして下部の更新ボタンを押してください。
        </p>
      </div>{' '}
      <div className="space-y-2 mb-4">
        {ingredients.map((ingredient, index) => (
          <div
            key={index}
            className={`border border-gray-200 rounded-lg transition-all ${
              ingredient.substitution
                ? 'bg-green-50 border-green-200 shadow-sm'
                : selectedIngredients.includes(index)
                  ? 'bg-orange-50 border-orange-200 shadow-sm'
                  : 'bg-white hover:border-gray-300'
            }`}
          >
            {/* オリジナル材料の表示 */}{' '}
            <div
              className={`flex justify-between items-center py-3 px-2 cursor-pointer hover:bg-gray-50 ${
                ingredient.substitution ? 'border-b border-green-200' : ''
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
                {ingredient.substitution && (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                )}{' '}
                {ingredient.isLoading ? (
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
                    <span className="text-gray-600">代用品を検索中...</span>
                  </div>
                ) : (
                  <span
                    className={`transition-colors ${
                      selectedIngredients.includes(index)
                        ? 'text-orange-800 font-medium'
                        : ingredient.substitution
                          ? 'text-gray-600'
                          : 'text-gray-700'
                    }`}
                  >
                    {ingredient.name}
                    {ingredient.substitution && (
                      <span className="text-xs text-gray-500 ml-2">
                        (元の材料)
                      </span>
                    )}
                  </span>
                )}
              </div>
              {!ingredient.isLoading && (
                <span
                  className={`font-medium ${
                    ingredient.substitution ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {ingredient.amount}
                </span>
              )}
            </div>{' '}
            {/* 代用品の表示 */}
            {ingredient.substitution && (
              <div className="px-2 pb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <ArrowRight className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800">
                    {ingredient.substitution.substitute}
                  </span>
                  <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                    代用品
                  </span>
                </div>
                <div className="ml-6 text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>比率:</strong> {ingredient.substitution.ratio}
                  </p>
                  <p>
                    <strong>理由:</strong> {ingredient.substitution.reason}
                  </p>
                  {ingredient.substitution.notes && (
                    <p className="text-amber-600">
                      <strong>注意点:</strong> {ingredient.substitution.notes}
                    </p>
                  )}
                  <p className="text-xs text-blue-600 mt-2">
                    💡
                    チェックボックスを選択して再度更新すると、別の代用品を提案できます
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedIngredients.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors font-medium shadow-md hover:shadow-lg"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            <span>
              {loading
                ? '代用提案を取得中...'
                : `選択した${selectedIngredients.length}件の代用を提案`}
            </span>
          </button>
        </div>
      )}{' '}
      {/* エラー表示 */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
