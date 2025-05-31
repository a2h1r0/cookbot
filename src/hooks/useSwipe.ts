import { useState } from 'react';
import { Recipe } from '@/types';

export function useSwipe(recipes: Recipe[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // スワイプ処理
  const swipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      // 現在のレシピをダイアログで表示
      const currentRecipe = recipes[currentIndex];
      if (currentRecipe) {
        setSelectedRecipe(currentRecipe);
        setIsDialogOpen(true);
      }
    } else {
      // 次のカードに移動
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
    }
  };

  // ダイアログを閉じる
  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedRecipe(null);
    // ダイアログを閉じた後、次のカードに移動
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
  };

  // スワイプ状態をリセット
  const reset = () => {
    setCurrentIndex(0);
    setSelectedRecipe(null);
    setIsDialogOpen(false);
  };

  return {
    currentIndex,
    swipe,
    reset,
    selectedRecipe,
    isDialogOpen,
    closeDialog,
  };
}
