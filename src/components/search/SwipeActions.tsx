'use client';

import { Heart, X } from 'lucide-react';

interface SwipeActionsProps {
  onPass: () => void;
  onLike: () => void;
}

export default function SwipeActions({ onPass, onLike }: SwipeActionsProps) {
  return (
    <div className="flex items-center justify-center space-x-8 mt-8">
      {/* パスボタン */}
      <button
        onClick={onPass}
        className="w-14 h-14 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors shadow-lg"
      >
        <X className="w-6 h-6 text-red-500" />
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
