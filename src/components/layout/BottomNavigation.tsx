'use client';

import { Search, ChefHat, User } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const navigationItems = [
  { name: 'さがす', path: '/search', icon: Search },
  { name: 'レシピ', path: '/recipe', icon: ChefHat },
  { name: 'マイページ', path: '/', icon: User },
];

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navigationItems.map((item, index) => {
          const IconComponent = item.icon;
          const isActive =
            pathname.startsWith(item.path) ||
            (item.path === '/' && pathname === '/');
          return (
            <button
              key={index}
              className="flex flex-col items-center space-y-1"
              onClick={() => handleNavigation(item.path)}
            >
              <IconComponent
                size={20}
                className={isActive ? 'text-blue-500' : 'text-gray-400'}
              />
              <span
                className={`text-xs ${
                  isActive ? 'text-blue-500' : 'text-gray-400'
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
