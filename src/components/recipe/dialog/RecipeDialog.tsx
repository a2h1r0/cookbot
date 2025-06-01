'use client';

import { Recipe } from '@/types';
import { X } from 'lucide-react';
import RecipeImage from '../RecipeImage';
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
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {' '}
      {/* ヘッダー */}{' '}
      <div className="bg-[#316d27] p-4 flex items-center justify-between shadow-sm">
        <h2 className="text-lg font-semibold text-white">レシピ詳細</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-[#5fbd84] rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>{' '}
      {/* コンテンツ */}
      <div className="flex-1 overflow-y-auto">
        <RecipeImage recipe={recipe} variant="full" />
        <div className="p-4">
          <RecipeTitle recipe={recipe} />
          <IngredientsList recipe={recipe} />
          <StepList recipe={recipe} />
        </div>
      </div>
    </div>
  );
}
