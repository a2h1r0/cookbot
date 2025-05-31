'use client';

import { RefreshCw, Utensils } from 'lucide-react';

interface SwipeCompletionProps {
  onSearch: () => void;
}

export default function SwipeCompletion({ onSearch }: SwipeCompletionProps) {
  return (
    <div className="text-center py-12">
      {/* アイコン */}
      <div className="mb-6">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
          <Utensils className="w-10 h-10 text-orange-500" />
        </div>
      </div>

      {/* メッセージ */}
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        お疲れさまでした！
      </h3>
      <p className="text-gray-600 mb-8">すべてのレシピを確認しました</p>

      {/* アクションボタン */}
      <div className="space-y-3">
        {' '}
        <button
          onClick={onSearch}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <RefreshCw className="w-5 h-5" />
          <span>もう一度探す</span>
        </button>
      </div>
    </div>
  );
}
