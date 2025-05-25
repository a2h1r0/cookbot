import Header from '@/components/layout/Header';
import RecipeImage from '@/components/home/RecipeImage';
import RecipeTitle from '@/components/home/RecipeTitle';
import IngredientsList from '@/components/home/IngredientsList';
import StepList from '@/components/home/StepList';
import BottomNavigation from '@/components/home/BottomNavigation';

export default function Home() {
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
