import React from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';

function SearchResultWrapped({ isMeal, recipes }) {
  if (!recipes) return;
  return (
    <div>
      {isMeal
        ? (
          recipes.map((element, index) => (
            <Link
              key={ index }
              to={ `/meals/${element.idMeal}` }
            >
              <RecipeCard
                index={ index }
                name={ element.strMeal }
                image={ element.strMealThumb }
              />
            </Link>
          ))
        )
        : (
          recipes.map((element, index) => (
            <Link
              key={ index }
              to={ `/drinks/${element.idDrink}` }
            >
              <RecipeCard
                index={ index }
                name={ element.strDrink }
                image={ element.strDrinkThumb }
              />
            </Link>
          ))
        )}
    </div>
  );
}

SearchResultWrapped.propTypes = {}.isRequired;

export const SearchResult = React.memo(SearchResultWrapped);