const ingredients = [
  { name: '材料A', amount: '200g' },
  { name: '材料B', amount: '1個' },
  { name: '調味料C', amount: '大さじ1' },
  { name: '調味料D', amount: '適量' },
];

export default function IngredientsList() {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-3">材料</h3>
      <div className="space-y-2">
        {ingredients.map((ingredient, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b border-gray-100"
          >
            <span className="text-gray-700">{ingredient.name}</span>
            <span className="text-gray-600">{ingredient.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
