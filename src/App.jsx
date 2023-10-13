import React, { useState } from 'react';
import './App.css';

function App() {
  const [foodList, setFoodList] = useState([
    { name: 'Pizza', ingredients: ['Dough', 'Tomato Sauce', 'Cheese', 'Pepperoni'] },
  ]);
  const [newFood, setNewFood] = useState('');
  const [newIngredients, setNewIngredients] = useState('');

  const handleFoodSubmit = (e) => {
    e.preventDefault();
    if (newFood.trim() === '' || newIngredients.trim() === '') {
      return;
    }

    const foodItem = { name: newFood, ingredients: newIngredients.split(', ') };
    setFoodList([...foodList, foodItem]);
    setNewFood('');
    setNewIngredients('');
  };

  return (
    <div>
      <form onSubmit={handleFoodSubmit}>
        <input
          type="text"
          placeholder="Enter Food Name"
          value={newFood}
          onChange={(e) => setNewFood(e.target.value)}
          className="border-2 p-2"
        />
        <input
          type="text"
          placeholder="Enter Ingredients (comma-separated)"
          value={newIngredients}
          onChange={(e) => setNewIngredients(e.target.value)}
          className="border-2 p-2"
        />
        <button type="submit">Add Food</button>
      </form>

      <ul>
        {foodList.map((food, index) => (
          <li key={index}>
            <strong>{food.name}:</strong> {food.ingredients.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
