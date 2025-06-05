'use client';

import { RefreshCw, Utensils } from 'lucide-react';

interface SwipeCompletionProps {
  onSearch: () => void;
}

export default function SwipeCompletion({ onSearch }: SwipeCompletionProps) {
  return (
    <div className="text-center mt-4">
      <div className="mb-6">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
          <Utensils className="w-10 h-10 text-orange-500" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        レシピは見つかりましたか？
      </h3>
      <p className="text-gray-600 mb-4">
        高速化のため5件ずつ表示されますが、
        <br />
        まだまだたくさんのレシピがあります。
      </p>
      <div className="flex items-center justify-center">
        <button
          onClick={onSearch}
          className="bg-[#5fbd84] text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center space-x-2"
        >
          <RefreshCw className="w-5 h-5" />
          <span>もっと探す</span>
        </button>
      </div>
    </div>
  );
}
