'use client';

import { useState, useRef } from 'react';
import { ChefHat, Clock, Users } from 'lucide-react';
import { Recipe } from '@/types';

interface SwipeCardProps {
  recipe: Recipe;
  onSwipe: (direction: 'left' | 'right', recipe: Recipe) => void;
  isTop: boolean;
}

export default function SwipeCard({ recipe, onSwipe, isTop }: SwipeCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const threshold = 100;
    if (Math.abs(dragOffset.x) > threshold) {
      const direction = dragOffset.x > 0 ? 'right' : 'left';
      onSwipe(direction, recipe);
    }

    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setStartPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - startPos.x;
    const deltaY = touch.clientY - startPos.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const threshold = 100;
    if (Math.abs(dragOffset.x) > threshold) {
      const direction = dragOffset.x > 0 ? 'right' : 'left';
      onSwipe(direction, recipe);
    }

    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  const rotation = dragOffset.x * 0.1;
  const opacity = Math.max(0.5, 1 - Math.abs(dragOffset.x) / 200);

  return (
    <div
      ref={cardRef}
      className={`absolute inset-0 select-none cursor-grab ${
        isDragging ? 'cursor-grabbing' : ''
      } ${isTop ? 'z-20' : 'z-10'}`}
      style={{
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
        opacity: isDragging ? opacity : 1,
        transition: isDragging
          ? 'none'
          : 'transform 0.3s ease-out, opacity 0.3s ease-out',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full max-w-sm mx-auto">
        {/* レシピ画像 */}
        <div className="h-64 bg-gray-200 relative overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
            draggable={false}          />
        </div>

        {/* レシピ情報 */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {recipe.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {recipe.description}
          </p>

          {/* メタ情報 */}
          <div className="flex items-center space-x-4 text-gray-500 text-sm">
            <div className="flex items-center space-x-1">
              <Clock size={16} />
              <span>{recipe.cookTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users size={16} />
              <span>{recipe.servings}人分</span>
            </div>
            <div className="flex items-center space-x-1">
              <ChefHat size={16} />
              <span>レシピ</span>
            </div>
          </div>
        </div>
      </div>

      {/* スワイプヒント */}
      {isDragging && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`text-4xl font-bold px-6 py-3 rounded-lg border-4 transform rotate-12 ${
              dragOffset.x > 50
                ? 'text-green-500 border-green-500 bg-green-50'
                : dragOffset.x < -50
                ? 'text-red-500 border-red-500 bg-red-50'
                : 'text-gray-400 border-gray-400 bg-gray-50'
            }`}
          >
            {dragOffset.x > 50 ? 'LIKE' : dragOffset.x < -50 ? 'PASS' : ''}
          </div>
        </div>
      )}
    </div>
  );
}
