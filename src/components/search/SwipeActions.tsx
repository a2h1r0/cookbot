'use client';

import { Heart, X, RotateCcw } from 'lucide-react';

interface SwipeActionsProps {
  onPass: () => void;
  onLike: () => void;
  onUndo: () => void;
  canUndo: boolean;
}

export default function SwipeActions({
  onPass,
  onLike,
  onUndo,
  canUndo,
}: SwipeActionsProps) {
  return (
    <div className="flex items-center justify-center space-x-6 mt-8">
      {/* パスボタン */}
      <button
        onClick={onPass}
        className="w-14 h-14 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors shadow-lg"
      >
        <X className="w-6 h-6 text-red-500" />
      </button>

      {/* アンドゥボタン */}
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-lg ${
          canUndo
            ? 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            : 'bg-gray-50 text-gray-300 cursor-not-allowed'
        }`}
      >
        <RotateCcw className="w-5 h-5" />
      </button>

      {/* ライクボタン */}
      <button
        onClick={onLike}
        className="w-14 h-14 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center transition-colors shadow-lg"
      >
        <Heart className="w-6 h-6 text-green-500" />
      </button>
    </div>
  );
}
