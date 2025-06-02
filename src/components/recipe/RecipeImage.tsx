import React from 'react';
import {
  UtensilsCrossed,
  Fish,
  Beef,
  Salad,
  Soup,
  Cookie,
  Coffee,
  Pizza,
  Cherry,
  Utensils,
  Flame,
  Heart,
  Star,
  Crown,
  MapPin,
  LucideIcon,
} from 'lucide-react';
import { Recipe, Category } from '@/types';

interface RecipeImageProps {
  recipe: Recipe;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'full';
}

interface CategoryInfo {
  icon: LucideIcon;
  color: string;
  gradientColor: string;
}

export default function RecipeImage({
  recipe,
  size = 'md',
  variant = 'icon',
}: RecipeImageProps) {
  const getCategoryInfo = (category: Category): CategoryInfo => {
    switch (category) {
      case Category.FISH:
        return {
          icon: Fish,
          color: 'text-blue-500',
          gradientColor: 'from-blue-400 to-blue-600',
        };
      case Category.MEAT:
        return {
          icon: Beef,
          color: 'text-red-500',
          gradientColor: 'from-red-400 to-red-600',
        };
      case Category.VEGETABLE:
        return {
          icon: Salad,
          color: 'text-green-500',
          gradientColor: 'from-green-400 to-green-600',
        };
      case Category.SOUP:
        return {
          icon: Soup,
          color: 'text-orange-500',
          gradientColor: 'from-orange-400 to-orange-600',
        };
      case Category.DESSERT:
        return {
          icon: Cookie,
          color: 'text-pink-500',
          gradientColor: 'from-pink-400 to-pink-600',
        };
      case Category.PIZZA:
        return {
          icon: Pizza,
          color: 'text-yellow-500',
          gradientColor: 'from-yellow-400 to-yellow-600',
        };
      case Category.BEVERAGE:
        return {
          icon: Coffee,
          color: 'text-amber-600',
          gradientColor: 'from-amber-400 to-amber-600',
        };
      case Category.JAPANESE:
        return {
          icon: Cherry,
          color: 'text-red-600',
          gradientColor: 'from-red-500 to-pink-500',
        };
      case Category.ITALIAN:
        return {
          icon: Pizza,
          color: 'text-green-600',
          gradientColor: 'from-green-500 to-red-500',
        };
      case Category.CHINESE:
        return {
          icon: Flame,
          color: 'text-orange-600',
          gradientColor: 'from-yellow-500 to-red-600',
        };
      case Category.KOREAN:
        return {
          icon: Heart,
          color: 'text-red-500',
          gradientColor: 'from-red-400 to-orange-500',
        };
      case Category.THAI:
        return {
          icon: Star,
          color: 'text-yellow-600',
          gradientColor: 'from-yellow-400 to-orange-500',
        };
      case Category.INDIAN:
        return {
          icon: Crown,
          color: 'text-purple-600',
          gradientColor: 'from-purple-400 to-orange-500',
        };
      case Category.FRENCH:
        return {
          icon: Utensils,
          color: 'text-indigo-600',
          gradientColor: 'from-indigo-400 to-purple-500',
        };
      case Category.AMERICAN:
        return {
          icon: MapPin,
          color: 'text-blue-600',
          gradientColor: 'from-blue-500 to-red-500',
        };
      default:
        return {
          icon: UtensilsCrossed,
          color: 'text-gray-500',
          gradientColor: 'from-gray-400 to-gray-600',
        };
    }
  };

  const categoryInfo = getCategoryInfo(recipe.category);
  const Icon = categoryInfo.icon;

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  };

  // アイコンのみの場合
  if (variant === 'icon') {
    return <Icon className={`${sizeClasses[size]} ${categoryInfo.color}`} />;
  }

  // フルディスプレイの場合
  return (
    <div className="m-4">
      <div
        className={`w-full h-64 bg-gradient-to-br ${categoryInfo.gradientColor} rounded-lg flex flex-col items-center justify-center text-white relative overflow-hidden`}
      >
        {/* 背景パターン */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
          <div className="absolute top-8 right-8 w-4 h-4 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-8 left-8 w-6 h-6 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-10 h-10 border-2 border-white rounded-full"></div>
        </div>
        {/* メインアイコン */}
        <div className="z-10 flex flex-col items-center">
          <Icon className={`w-20 h-20 text-white`} />
          <h3 className="mt-4 text-xl font-bold text-center px-4 leading-tight">
            {recipe.title}
          </h3>
          {recipe.cookTime && (
            <p className="mt-2 text-sm opacity-90">
              調理時間: {recipe.cookTime}
            </p>
          )}
        </div>{' '}
      </div>
    </div>
  );
}

export const getCategoryGradient = (category: Category): string => {
  switch (category) {
    case Category.FISH:
      return 'from-blue-400 to-blue-600';
    case Category.MEAT:
      return 'from-red-400 to-red-600';
    case Category.VEGETABLE:
      return 'from-green-400 to-green-600';
    case Category.SOUP:
      return 'from-orange-400 to-orange-600';
    case Category.DESSERT:
      return 'from-pink-400 to-pink-600';
    case Category.PIZZA:
      return 'from-yellow-400 to-yellow-600';
    case Category.BEVERAGE:
      return 'from-amber-400 to-amber-600';
    case Category.JAPANESE:
      return 'from-red-500 to-pink-500';
    case Category.ITALIAN:
      return 'from-green-500 to-red-500';
    case Category.CHINESE:
      return 'from-yellow-500 to-red-600';
    case Category.KOREAN:
      return 'from-red-400 to-orange-500';
    case Category.THAI:
      return 'from-yellow-400 to-orange-500';
    case Category.INDIAN:
      return 'from-purple-400 to-orange-500';
    case Category.FRENCH:
      return 'from-indigo-400 to-purple-500';
    case Category.AMERICAN:
      return 'from-blue-500 to-red-500';
    default:
      return 'from-gray-400 to-gray-600';
  }
};
