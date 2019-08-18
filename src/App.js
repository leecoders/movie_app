import React from 'react';

function Food({ fav }) {
  console.log(fav);
  return (
    <h1>I like {fav}</h1>
  );
}

const foodList = [
  "김밥", "김치", "볶음밥", "라면"
]

function App() {
  return (
    <div className="App">
      {foodList.map(dish => (
        <Food fav={dish}/>
      ))}
    </div>
  );
}

export default App;
