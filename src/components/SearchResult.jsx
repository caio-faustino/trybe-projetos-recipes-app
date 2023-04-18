import React from 'react';
import { useHistory } from 'react-router-dom';
import RecipeCard from './RecipeCard';

function SearchResultWrapped({ recipes }) {
  const history = useHistory();
  const { pathname } = history.location;

  return (
    <div
      className={
        'grid grid-cols-1 place-items-center '
        + 'gap-4 sm:grid-cols-2 md:grid-cols-3'
      }
    >
      {pathname.includes('meals')
        ? (
          recipes?.map((element, index) => (
            <RecipeCard
              key={ index }
              index={ index }
              name={ element.strMeal }
              image={ element.strMealThumb }
              linkTo={ `/meals/${element.idMeal}` }
            />
          ))
        )
        : (
          recipes?.map((element, index) => (
            <RecipeCard
              key={ index }
              index={ index }
              name={ element.strDrink }
              image={ element.strDrinkThumb }
              linkTo={ `/drinks/${element.idDrink}` }
            />
          ))
        )}
    </div>
  );
}

SearchResultWrapped.propTypes = {}.isRequired;

export const SearchResult = React.memo(SearchResultWrapped);
