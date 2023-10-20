import { useState, lazy, Suspense } from 'react';
import './App.css';

const FoodList = lazy(() => import('./FoodList'));

function App() {
  const [foodList, setFoodList] = useState([
    { name: 'Pizza', ingredients: ['Dough', 'Tomato Sauce', 'Cheese', 'Pepperoni'] },
  ]);
  const [newFood, setNewFood] = useState('');
  const [newIngredients, setNewIngredients] = useState('');
  const [additionalIngredients, setAdditionalIngredients] = useState([]);

  const handleFoodSubmit = (e) => {
    e.preventDefault();
    if (newFood.trim() === '' || newIngredients.trim() === '') {
      return;
    }

    const foodItem = { name: newFood, ingredients: [...newIngredients.split(', '), ...additionalIngredients] };
    setFoodList([...foodList, foodItem]);
    setNewFood('');
    setNewIngredients('');
    setAdditionalIngredients([]); // Reset additional ingredients
  };

  const handleAddMore = () => {
    if (newIngredients.trim() !== '') {
      setAdditionalIngredients([...additionalIngredients, newIngredients]);
      setNewIngredients('');
    }
  };

  return (
    <div className='bg-slate-400 h-screen'>
      <nav className='text-white text-2xl border-black border-b-2 pb-5 md:w-[80%] m-auto'>
        <ul className='flex p-[10px] justify-between font-semibold font-mono '>
          <li>Book Store</li>
          <li>For Business</li>
          <li>Login</li>
        </ul>
      </nav>
      <div className='p-[50px] border-black border-b-2'>
        <h1 className='text-[3rem] font-mono text-center text-white'>Cooking With Love</h1>
      </div>
      <div className='sm:flex'>
        <Suspense fallback={<div>Loading...</div>}>
          <FoodList foodList={foodList} />
        </Suspense>
        <form onSubmit={handleFoodSubmit} className=' flex flex-col gap-4 sm:w-[100%] md:m-auto p-[30px]'>
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
            <input type='text' placeholder='how to cook' className='border-2 p-2 w-[80%]' />
            <button className='bg-black text-white w-[20%]'>Add Stages</button>
          </div>
          <button type="submit" className='bg-blue-600 text-white w-fit p-[10px] m-auto rounded-lg'>
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
