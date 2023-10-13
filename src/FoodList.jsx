

function FoodList({ foodList }) {
  return (
    <div>
      <h2>Food List</h2>
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

export default FoodList;
