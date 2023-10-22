function FoodList({ foodList }) {
  return (
    <div className="lg:w-[100%]">
      {/* <h2 className="text-3xl font-bold text-center font-sans mb-6">Food Recipes</h2> */}
      <ul className="w-[100%]  m-auto p-[10px] flex  gap-6  md:flex flex-wrap justify-center">
        {foodList.map((food, index) => (
          <li key={index} className=" shadow-2xl  mb-3 p-[14px] rounded-2xl border-purple-900 flex flex-col gap-5 max-w-[200px] bg-white">
            <p className="text-[20px] font-bold text-center border-2 border-purple-900">{food.name}:</p> 
            <p className="border-2 border-purple-800">
              <h1 className="text-[1.5rem] font-bold text-center">Ingredients:</h1>
              {food.ingredients.join(', ')}
            </p>
            {food.cookingStages.length > 0 && (
              <div className="border-2 border-purple-800">
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
