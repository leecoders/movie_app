import React from 'react';

function Food({ fav }) {
  console.log(fav);
  return (
    <h1>I like {fav}</h1>
  );
}

const foodList = [
  {
    id : 0,
    name : "김밥"
  },
  {
    id : 1,
    name : "김치"
  },
  {
    id : 2,
    name : "볶음밥"
  },
  {
    id : 3,
    name : "라면"
  },
];

function App() {
  return (
    <div className="App">
      {foodList.map(dish => (
        <Food key={dish.key} fav={dish.name}/>
      ))}
    </div>
  );
}

export default App;
