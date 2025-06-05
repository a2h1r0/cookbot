'use client';

import { UseSwipeReturn } from '@/types';
import { Heart, X } from 'lucide-react';

type SwipeActionsProps = UseSwipeReturn;

export default function SwipeActions({ swipe }: SwipeActionsProps) {
  return (
    <div className="flex items-center justify-center space-x-8 mt-8">
      <button
        onClick={() => swipe('left')}
        className="w-14 h-14 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors shadow-lg"
      >
        <X className="w-6 h-6 text-red-500" />
      </button>

      <button
        onClick={() => swipe('right')}
        className="w-14 h-14 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center transition-colors shadow-lg"
      >
        <Heart className="w-6 h-6 text-green-500" />
      </button>
    </div>
  );
}
