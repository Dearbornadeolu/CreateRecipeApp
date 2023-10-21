import { useState, lazy, Suspense } from 'react';
import './App.css';

const FoodList = lazy(() => import('./FoodList'));

function App() {
  const [foodList, setFoodList] = useState([
    { name: 'Pizza', ingredients: ['Dough', 'Tomato Sauce', 'Cheese', 'Pepperoni'], cookingStages: [] },
  ]);
  const [newFood, setNewFood] = useState('');
  const [newIngredients, setNewIngredients] = useState('');
  const [additionalIngredients, setAdditionalIngredients] = useState([]);
  const [currentStage, setCurrentStage] = useState('');
  const [cookingStages, setCookingStages] = useState([]);

  const handleFoodSubmit = (e) => {
    e.preventDefault();
    if (newFood.trim() === '' || newIngredients.trim() === '') {
      return;
    }

    const foodItem = {
      name: newFood,
      ingredients: [...newIngredients.split(', '), ...additionalIngredients],
      cookingStages: cookingStages.slice(), // Copy cooking stages
    };

    setFoodList([...foodList, foodItem]);
    setNewFood('');
    setNewIngredients('');
    setAdditionalIngredients([]);
    setCookingStages([]); // Reset cooking stages
  };

  const handleAddMore = () => {
    if (newIngredients.trim() !== '') {
      setAdditionalIngredients([...additionalIngredients, newIngredients]);
      setNewIngredients('');
    }
  };

  const handleAddStage = () => {
    if (currentStage.trim() !== '') {
      setCookingStages([...cookingStages, currentStage]);
      setCurrentStage('');
    }
  };

  const renderCookingStagesInputs = () => {
    return cookingStages.map((stage, index) => (
      <div key={index}>
        <input
          type="text"
          placeholder={`Cooking Stage ${index + 1}`}
          value={stage}
          onChange={(e) => {
            const updatedStages = [...cookingStages];
            updatedStages[index] = e.target.value;
            setCookingStages(updatedStages);
          }}
          className="border-2 p-2 w-[80%]"
        />
      </div>
    ));
  };

  // const renderAdditionalStageInput = () => {
  //   return (
  //     <div>
  //       <input
  //         type="text"
  //         placeholder={`Cooking Stage ${cookingStages.length + 1}`}
  //         value={currentStage}
  //         onChange={(e) => setCurrentStage(e.target.value)}
  //         className="border-2 p-2 w-[80%]"
  //       />
  //     </div>
  //   );
  // };

  return (
    <div className='bg-slate-400 h-screen'>
      {/* ...your navigation and header code... */}
      <div className='sm:flex'>
        <Suspense fallback={<div>Loading...</div>}>
          <FoodList foodList={foodList} />
        </Suspense>
        <form onSubmit={handleFoodSubmit} className='flex flex-col gap-4 sm:w-[100%] md:m-auto p-[30px]'>
          <input
            type="text"
            placeholder="Enter Food Name"
            value={newFood}
            onChange={(e) => setNewFood(e.target.value)}
            className="border-2 p-2"
          />
          <div className='flex'>
            <input
              type="text"
              placeholder="Enter Ingredients (comma-separated)"
              value={newIngredients}
              onChange={(e) => setNewIngredients(e.target.value)}
              className="border-2 p-2 w-[80%]"
            />
            <button type="button" onClick={handleAddMore} className='w-[20%] bg-black text-white'>
              Add More
            </button>
          </div>
          <div>
            {additionalIngredients.map((ingredient, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder={`Enter Ingredient ${index + 2}`}
                  value={ingredient}
                  onChange={(e) => {
                    const updatedIngredients = [...additionalIngredients];
                    updatedIngredients[index] = e.target.value;
                    setAdditionalIngredients(updatedIngredients);
                  }}
                  className="border-2 p-2 w-[80%]"
                />
              </div>
            ))}
          </div>
          <div className='flex'>
            <input
              type='text'
              placeholder='How to cook'
              value={currentStage}
              onChange={(e) => setCurrentStage(e.target.value)}
              className='border-2 p-2 w-[80%]'
            />
            <button type='button' onClick={handleAddStage} className='bg-black text-white w-[20%]'>
              Add Stage
            </button>
          </div>
          {renderCookingStagesInputs()} {/* Render the added cooking stages inputs */}
          <button type="submit" className='bg-blue-600 text-white w-fit p-[10px] m-auto rounded-lg'>
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
