import { useState } from 'react';

export function useSwipe() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // スワイプ処理
  const swipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      console.log('👍 Like');
    } else {
      console.log('👎 Pass');
    }

    // 次のカードに移動
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
  };

  // スワイプ状態をリセット
  const reset = () => {
    setCurrentIndex(0);
  };

  return {
    currentIndex,
    swipe,
    reset,
  };
}
