import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function BtnLike({ receita }) {
  const [receitasFavoritas, setReceitasFavoritas] = useState([]);
  // console.log('Rodou ate o UseEffect');
  useEffect(() => {
    setReceitasFavoritas(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  const handleFavoriteClick = () => {
    let recipeTemp = [];
    const obj = {
      id: (receita.idMeal) ? receita.idMeal : receita.idDrink,
      type: (receita.idMeal) ? 'meal' : 'drink',
      nationality: (receita.strArea) ? receita.strArea : '',
      category: receita.strCategory,
      alcoholicOrNot: (receita.strAlcoholic) ? receita.strAlcoholic : '',
      name: (receita.strMeal) ? receita.strMeal : receita.strDrink,
      image: (receita.strMealThumb) ? receita.strMealThumb : receita.strDrinkThumb,
    };
    console.log(obj);
    if (receitasFavoritas) {
      recipeTemp = [...receitasFavoritas, obj];
      console.log(recipeTemp);
    } else {
      recipeTemp.push(obj);
      console.log(recipeTemp);
    }
    setReceitasFavoritas(recipeTemp);
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipeTemp));
  };
  return (
    <div>
      <button
        data-testid="favorite-btn"
        className="icone-link"
        onClick={ handleFavoriteClick }
      >
        <img src={ whiteHeartIcon } alt="favorite" />
      </button>
    </div>
  );
}

export default BtnLike;
BtnLike.propTypes = { }.isRequired;
