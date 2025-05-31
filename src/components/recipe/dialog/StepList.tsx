import { Recipe } from '@/types';

interface StepListProps {
  recipe: Recipe;
}

export default function StepList({ recipe }: StepListProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-3">作り方</h3>
      {recipe.steps.map((step, index) => (
        <div key={index} className="mb-6">
          <div className="flex items-start mb-3">
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
              {index + 1}
            </div>
            <p className="text-gray-700 flex-1">{step}</p>
          </div>
          <div className="flex space-x-2 ml-9">
            <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-xs text-gray-500">写真</span>
            </div>
            <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-xs text-gray-500">写真</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
