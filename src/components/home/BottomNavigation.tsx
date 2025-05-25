const navigationItems = [
  { name: 'さがす', isActive: false },
  { name: 'レシピ', isActive: true },
  { name: 'マイページ', isActive: false },
];

export default function BottomNavigation() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navigationItems.map((item, index) => (
          <button key={index} className="flex flex-col items-center space-y-1">
            <span
              className={`text-xs ${
                item.isActive ? 'text-blue-500' : 'text-gray-400'
              }`}
            >
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
