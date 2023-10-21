function FoodList({ foodList }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center">Food Recipes</h2>
      <ul className="w-[90%] border-2 m-auto p-[10px]">
        {foodList.map((food, index) => (
          <li key={index} className="bg-slate-300 mb-3 p-[4px]">
            <strong>{food.name}:</strong> {food.ingredients.join(', ')}
            {food.cookingStages.length > 0 && (
              <div>
                <strong>Cooking Stages:</strong>
                <ul>
                  {food.cookingStages.map((stage, stageIndex) => (
                    <li key={stageIndex}>{stage}</li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FoodList;
