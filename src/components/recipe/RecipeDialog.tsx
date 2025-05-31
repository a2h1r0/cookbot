'use client';

import { Recipe } from '@/types';
import { X } from 'lucide-react';
import RecipeImage from './RecipeImage';
import RecipeTitle from './RecipeTitle';
import IngredientsList from './IngredientsList';
import StepList from './StepList';

interface RecipeDialogProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function RecipeDialog({
  recipe,
  isOpen,
  onClose,
}: RecipeDialogProps) {
  if (!isOpen || !recipe) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* ヘッダー */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">レシピ詳細</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* コンテンツ */}
        <div className="p-4">
          <RecipeImage recipe={recipe} />
          <RecipeTitle recipe={recipe} />
          <IngredientsList recipe={recipe} />
          <StepList recipe={recipe} />
        </div>
      </div>
    </div>
  );
}
