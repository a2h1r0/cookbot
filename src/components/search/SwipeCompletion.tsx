'use client';

import { RefreshCw, Heart, Utensils } from 'lucide-react';

interface SwipeCompletionProps {
  likedCount: number;
  passedCount: number;
  onRestart: () => void;
  onViewLiked: () => void;
}

export default function SwipeCompletion({
  likedCount,
  passedCount,
  onRestart,
  onViewLiked,
}: SwipeCompletionProps) {
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

      {/* 統計 */}
      <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg max-w-xs mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Heart className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-600">
              {likedCount}
            </div>
            <div className="text-sm text-gray-500">お気に入り</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="w-6 h-6 bg-gray-400 rounded-full" />
            </div>
            <div className="text-2xl font-bold text-gray-600">
              {passedCount}
            </div>
            <div className="text-sm text-gray-500">スキップ</div>
          </div>
        </div>
      </div>

      {/* アクションボタン */}
      <div className="space-y-3">
        {likedCount > 0 && (
          <button
            onClick={onViewLiked}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            お気に入りレシピを見る
          </button>
        )}

        <button
          onClick={onRestart}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <RefreshCw className="w-5 h-5" />
          <span>もう一度探す</span>
        </button>
      </div>
    </div>
  );
}
