import React, { useState } from 'react';
import Header from '../components/Header';
import { RecipeCardDone } from '../components/RecipeCardDone';
import { useLocalStorage } from '../useLocalStorage';

export const CHAVE_DONE = 'doneRecipes';

function DoneRecipes() {
  const [todasAsReceitasFeitas] = useLocalStorage(CHAVE_DONE, []);
  const [filteredRecipes, setFilteredRecipes] = useState(todasAsReceitasFeitas);

  const handleFilter = (type) => {
    const filtradas = todasAsReceitasFeitas.filter((r) => r.type?.startsWith(type));

    setFilteredRecipes(filtradas);
  };

  return (
    <>
      <Header title="Done Recipes" iconeProfile />
      <button
        onClick={ () => handleFilter('') }
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

      { filteredRecipes?.map((recipe, index) => (
        <RecipeCardDone
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
