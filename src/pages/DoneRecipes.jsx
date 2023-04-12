import React, { useState } from 'react';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

function DoneRecipes() {
  const pegarDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [filteredRecipes, setFilteredRecipes] = useState(pegarDoneRecipes
    && [...pegarDoneRecipes]);

  const handleFilter = (type = '') => {
    if (pegarDoneRecipes && pegarDoneRecipes.length > 0) {
      const filteredPegarDoneRecipes = pegarDoneRecipes
        .filter((recipe) => recipe.type.startsWith(type));

      setFilteredRecipes([...filteredPegarDoneRecipes]);
    }
  };

  return (
    <>
      <RecipeCard />
      <Header title="Done Recipes" iconeProfile />
      <button
        onClick={ () => handleFilter() }
        data-testid="filter-by-all-btn"
      >
        All
      </button>

      <button
        onClick={ () => handleFilter('meal') }
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>

      <button
        onClick={ () => handleFilter('drink') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>

      { (filteredRecipes)
      && filteredRecipes.map((recipe, index) => (
        <RecipeCard
          key={ index }
          recipe={ recipe }
          index={ index }
          image={ recipe.image }
          name={ recipe.name }
          date={ recipe.doneDate }
          tags={ recipe.tags }
          type={ recipe.type }
          id={ recipe.id }
          categoria={ `${recipe.nationality} - ${recipe.category} -
            ${recipe.alcoholicOrNot}` }
        />
      ))}
    </>

  );
}

export default React.memo(DoneRecipes);
