import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import { ContextoBonito } from '../ContextoBonito';
import RecipeCard from '../components/RecipeCard';
import ProfileButtonGroup from '../components/ProfileButtonGroup';

function FavoriteRecipes() {
  const { favorites } = useContext(ContextoBonito);
  const [filteredRecipes, setFilteredRecipes] = useState(favorites);

  const handleFilter = (type) => {
    const filtradas = favorites.filter((r) => r.type?.startsWith(type));

    setFilteredRecipes(filtradas);
  };

  return (
    <>
      <ProfileButtonGroup />
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

      <div
        className={ 'grid grid-cols-1 place-items-center gap-4'
          + 'sm:grid-cols-2 md:grid-cols-3' }
      >
        {filteredRecipes?.map((favorite, index) => (
          <RecipeCard
            key={ index }
            recipe={ favorite }
            index={ index }
            image={ favorite.image }
            name={ favorite.name }
            date={ favorite.doneDate }
            tags={ favorite.tags }
            categoria={ `${favorite.nationality} - ${favorite.category} -
            ${favorite.alcoholicOrNot}` }
            linkTo={ `/${favorite.type}s/${favorite.id}` }
          />
        ))}
      </div>
    </>
  );
}

export default React.memo(FavoriteRecipes);
