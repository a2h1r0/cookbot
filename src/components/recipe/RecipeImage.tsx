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
  LucideIcon,
} from 'lucide-react';
import { Recipe } from '@/types';

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
  const getCategoryInfo = (
    title: string,
    description: string
  ): CategoryInfo => {
    const text = `${title} ${description}`.toLowerCase();

    if (
      text.includes('魚') ||
      text.includes('サーモン') ||
      text.includes('鯛') ||
      text.includes('鮭')
    ) {
      return {
        icon: Fish,
        color: 'text-blue-500',
        gradientColor: 'from-blue-400 to-blue-600',
      };
    }

    if (
      text.includes('肉') ||
      text.includes('牛') ||
      text.includes('豚') ||
      text.includes('鶏')
    ) {
      return {
        icon: Beef,
        color: 'text-red-500',
        gradientColor: 'from-red-400 to-red-600',
      };
    }

    if (
      text.includes('サラダ') ||
      text.includes('野菜') ||
      text.includes('レタス')
    ) {
      return {
        icon: Salad,
        color: 'text-green-500',
        gradientColor: 'from-green-400 to-green-600',
      };
    }

    if (
      text.includes('スープ') ||
      text.includes('汁') ||
      text.includes('味噌汁')
    ) {
      return {
        icon: Soup,
        color: 'text-orange-500',
        gradientColor: 'from-orange-400 to-orange-600',
      };
    }

    if (
      text.includes('デザート') ||
      text.includes('ケーキ') ||
      text.includes('クッキー') ||
      text.includes('甘い')
    ) {
      return {
        icon: Cookie,
        color: 'text-pink-500',
        gradientColor: 'from-pink-400 to-pink-600',
      };
    }

    if (text.includes('ピザ')) {
      return {
        icon: Pizza,
        color: 'text-yellow-500',
        gradientColor: 'from-yellow-400 to-yellow-600',
      };
    }

    if (
      text.includes('コーヒー') ||
      text.includes('ドリンク') ||
      text.includes('飲み物')
    ) {
      return {
        icon: Coffee,
        color: 'text-amber-600',
        gradientColor: 'from-amber-400 to-amber-600',
      };
    }

    // デフォルト
    return {
      icon: UtensilsCrossed,
      color: 'text-gray-500',
      gradientColor: 'from-gray-400 to-gray-600',
    };
  };

  const categoryInfo = getCategoryInfo(recipe.title, recipe.description || '');
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
        </div>
      </div>
    </div>
  );
}

// グラデーションカラーを取得するためのヘルパー関数をエクスポート
export const getCategoryGradient = (
  title: string,
  description: string
): string => {
  const text = `${title} ${description}`.toLowerCase();

  if (text.includes('魚')) return 'from-blue-400 to-blue-600';
  if (text.includes('肉')) return 'from-red-400 to-red-600';
  if (text.includes('サラダ') || text.includes('野菜'))
    return 'from-green-400 to-green-600';
  if (text.includes('スープ')) return 'from-orange-400 to-orange-600';
  if (text.includes('デザート')) return 'from-pink-400 to-pink-600';
  if (text.includes('ピザ')) return 'from-yellow-400 to-yellow-600';
  if (text.includes('コーヒー')) return 'from-amber-400 to-amber-600';

  return 'from-gray-400 to-gray-600';
};
