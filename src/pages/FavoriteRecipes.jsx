import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import { ContextoBonito } from '../ContextoBonito';
import RecipeCard from '../components/RecipeCard';

function FavoriteRecipes() {
  const { favorites } = useContext(ContextoBonito);
  const [filteredRecipes, setFilteredRecipes] = useState(favorites);

  const handleFilter = (type) => {
    const filtradas = favorites.filter((r) => r.type?.startsWith(type));

    setFilteredRecipes(filtradas);
  };

  return (
    <>
      <Header title="Favorite Recipes" iconeProfile />
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

      { filteredRecipes?.map((favorite, index) => (
        <RecipeCard
          key={ index }
          recipe={ favorite }
          index={ index }
          image={ favorite.image }
          name={ favorite.name }
          date={ favorite.doneDate }
          tags={ favorite.tags }
          type={ favorite.type }
          id={ favorite.id }
          categoria={ `${favorite.nationality} - ${favorite.category} -
            ${favorite.alcoholicOrNot}` }
        />
      ))}
    </>

  );
}

export default React.memo(FavoriteRecipes);
