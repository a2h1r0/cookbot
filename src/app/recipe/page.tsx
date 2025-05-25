import Header from '@/components/layout/Header';
import RecipeImage from '@/components/recipe/RecipeImage';
import RecipeTitle from '@/components/recipe/RecipeTitle';
import IngredientsList from '@/components/recipe/IngredientsList';
import StepList from '@/components/recipe/StepList';
import BottomNavigation from '@/components/recipe/BottomNavigation';

export default function Recipe() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main Content */}
      <main className="px-4 py-4 pb-20">
        <RecipeImage />
        <RecipeTitle />
        <IngredientsList />
        <StepList />
      </main>

      <BottomNavigation />
    </div>
  );
}
