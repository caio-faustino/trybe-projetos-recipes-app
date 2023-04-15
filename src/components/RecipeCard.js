import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard(props) {
  const { name, image, index, linkTo } = props;
  // console.log(index);
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className={
        'max-w-sm rounded-lg border border-gray-200 bg-white shadow'
      + ' dark:border-gray-700 dark:bg-gray-800'
      }
    >
      {linkTo && (
        <>
          <Link to={ linkTo }>
            <img
              // className="w-[300px] h-[300px] "
              // className="rounded-t-lg"
              className="h-auto max-w-full rounded-lg object-cover"
              data-testid={ `${index}-card-img` }
              src={ image }
              alt={ name }
            />
          </Link>
          <div className="p-5">
            <Link to={ linkTo } className="text-decoration-none">
              <h5
                data-testid={ `${index}-card-name` }
                className={
                  'format lg:format-lg format-red mb-2'
                    + ' text-2xl font-bold tracking-tight text-gray-900 dark:text-white'
                }
              >
                {name}
              </h5>
            </Link>
            <p className="mb-3 hidden font-normal text-gray-700 dark:text-gray-400" />
          </div>
        </>
      )}

      {!linkTo && (
        <>
          <img
            // className="w-[300px] h-[300px] object-cover"
            // className="rounded-t-lg"
            className="h-auto max-w-full rounded-lg"
            data-testid={ `${index}-card-img` }
            src={ image }
            alt={ name }
          />
          <div className="p-5">
            <h5
              data-testid={ `${index}-card-name` }
              className={ 'mb-2 text-2xl font-bold tracking-tight'
                  + ' text-gray-900 dark:text-white' }
            >
              {name}
            </h5>
            <p className="mb-3 hidden font-normal text-gray-700 dark:text-gray-400" />
          </div>
        </>
      )}
    </div>
  );
}

RecipeCard.propTypes = {}.isRequired;

export default RecipeCard;
