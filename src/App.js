import React from 'react';
import PropTypes from 'prop-types';

function Food({ fav, picture }) {
  console.log(fav);
  return (
    <div>
      <img src={picture} alt={fav}/>
      <h1>I like {fav}</h1>
    </div>
  );
}

const foodList = [
  {
    id : 0,
    name : "김밥",
    img : "https://i.ytimg.com/vi/2G5SAC3UI3M/maxresdefault.jpg"
  },
  {
    id : 1,
    name : "김치",
    img : "https://i.ytimg.com/vi/2G5SAC3UI3M/maxresdefault.jpg"
  },
  {
    id : 2,
    name : "볶음밥",
    img : "https://i.ytimg.com/vi/2G5SAC3UI3M/maxresdefault.jpg"
  },
  {
    id : 3,
    name : "라면",
    img : "https://i.ytimg.com/vi/2G5SAC3UI3M/maxresdefault.jpg"
  },
];

Food.propTypes = {
  fav : PropTypes.string,
  picture : PropTypes.string
};

function App() {
  return (
    <div className="App">
      {foodList.map(dish => (
        <Food key={dish.id} fav={dish.name} picture={dish.img}/>
      ))}
    </div>
  );
}

export default App;