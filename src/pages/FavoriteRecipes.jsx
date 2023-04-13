import React from 'react';
import Header from '../components/Header';

export const CHAVE_FAVORITES = 'favoriteRecipes';

function FavoriteRecipes() {
  const [receitasFavoritdas] = useLocalStorage(CHAVE_FAVORITES, []);
  const [filteredRecipes, setFilteredRecipes] = useState(receitasFavoritdas);

  const handleFilter = (type) => {
    const filtradas = receitasFavoritdas.filter((r) => r.type?.startsWith(type));

    setFilteredRecipes(filtradas);
  };

  return (
    <>
      <Header title="Favorites" iconeProfile />
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
        <FavoriteRecipes
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
