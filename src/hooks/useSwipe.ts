import { useState, useCallback } from 'react';
import { Recipe } from '@/types';

interface UseSwipeProps {
  recipes: Recipe[];
  onLike: (recipe: Recipe) => void;
  onPass: (recipe: Recipe) => void;
  onComplete?: () => void;
  onSearch?: () => void;
}

export function useSwipe({
  recipes,
  onLike,
  onPass,
  onComplete,
  onSearch,
}: UseSwipeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 現在のレシピ
  const currentRecipe =
    currentIndex < recipes.length ? recipes[currentIndex] : null;

  // 完了状態
  const isComplete = currentIndex >= recipes.length;

  // 表示するカード（最大3枚）
  const visibleCards = recipes.slice(currentIndex, currentIndex + 3);

  // スワイプ処理
  const handleSwipe = useCallback(
    (direction: 'left' | 'right', recipe: Recipe) => {
      // コールバックを実行
      if (direction === 'right') {
        onLike(recipe);
      } else {
        onPass(recipe);
      }

      // 次のカードに移動
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      // 完了チェック
      if (nextIndex >= recipes.length && onComplete) {
        onComplete();
      }
    },
    [currentIndex, recipes.length, onLike, onPass, onComplete]
  );

  // 左スワイプ（パス）
  const swipeLeft = useCallback(() => {
    if (currentRecipe) {
      handleSwipe('left', currentRecipe);
    }
  }, [currentRecipe, handleSwipe]);

  // 右スワイプ（ライク）
  const swipeRight = useCallback(() => {
    if (currentRecipe) {
      handleSwipe('right', currentRecipe);
    }
  }, [currentRecipe, handleSwipe]);

  // 検索（再開始）
  const search = useCallback(() => {
    // 再検索を実行
    if (onSearch) {
      onSearch();
    }
    // インデックスをリセット
    setCurrentIndex(0);
  }, [onSearch]);
  return {
    currentIndex,
    currentRecipe,
    isComplete,
    visibleCards,
    handleSwipe,
    swipeLeft,
    swipeRight,
    search,
  };
}
