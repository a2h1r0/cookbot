'use client';

import { useState, useEffect } from 'react';

interface LoadingProgressProps {
  isLoading: boolean;
  estimatedTime?: number; // 推定時間（秒）
}

export default function LoadingProgress({
  isLoading,
  estimatedTime = 20,
}: LoadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      setElapsedTime(0);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setElapsedTime(Math.floor(elapsed));

      // プログレスを計算（11秒で90%、その後は緩やかに95%まで）
      let progressPercentage;
      if (elapsed <= 11) {
        progressPercentage = (elapsed / 11) * 90;
      } else {
        progressPercentage = 90 + ((elapsed - 11) / 9) * 5;
        progressPercentage = Math.min(progressPercentage, 95);
      }
      setProgress(progressPercentage);
    }, 100);

    return () => clearInterval(interval);
  }, [isLoading, estimatedTime]);

  if (!isLoading) {
    return null;
  }

  const getLoadingMessage = () => {
    if (elapsedTime < 10) {
      return 'AIがレシピを考えています...🤔';
    }
    if (elapsedTime < 20) {
      return 'まもなく完成です...✨';
    }
    return 'もう少しお待ちください...⏰';
  };

  const getTimeMessage = () => {
    if (elapsedTime < 5) {
      return '（10〜20秒程度かかります）';
    }
    if (elapsedTime < 15) {
      return `（${elapsedTime}秒経過）`;
    }
    if (elapsedTime < 20) {
      return `（${elapsedTime}秒経過・あと少しです）`;
    }
    return `（${elapsedTime}秒経過・長時間お待たせしています）`;
  };

  return (
    <div className="text-center mb-2 md:mb-3">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 md:p-4 max-w-sm mx-auto">
        <div className="inline-flex items-center space-x-2 text-sm md:text-base text-gray-700 mb-3">
          <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-[#8fdeb1] border-t-transparent rounded-full animate-spin"></div>
          <span className="font-medium">{getLoadingMessage()}</span>
        </div>

        <div className="mb-3">
          <div className="w-full bg-gray-200 rounded-full h-2 md:h-2.5">
            <div
              className="bg-gradient-to-r from-[#8fdeb1] to-[#7bc8a4] h-2 md:h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="text-xs md:text-sm text-gray-500">
          {getTimeMessage()}
        </div>

        {elapsedTime > 0 && elapsedTime % 10 === 0 && (
          <div className="mt-2 text-xs text-gray-400 animate-pulse">
            {elapsedTime === 10 && '🍳 美味しいレシピを探しています...'}
            {elapsedTime === 20 && '👨‍🍳 栄養バランスを計算中...'}
            {elapsedTime >= 30 && '📝 最高のレシピを厳選中...'}
          </div>
        )}
      </div>
    </div>
  );
}
