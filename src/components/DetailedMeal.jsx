import React from 'react';
import BtnShare from './BtnShare';
import BtnLike from './BtnLike';
import BtnStart from './BtnStart';
import Categoria from './Categoria';

function DetailedMeal({ receita, ingredientes, video, pathname, history }) {
  const { strCategory, strAlcoholic } = receita;
  const strMeal = receita.strMeal || receita.strDrink;
  const imagem = receita.strMealThumb || receita.strDrinkThumb;

  return (
    <div className="mb-4 grid gap-4 px-4 sm:mb-5 sm:grid-cols-3 sm:gap-6 md:gap-12">
      <div>
        <h1
          data-testid="recipe-title"
          className={
            'mb-4 flex items-center text-2xl font-bold leading-none '
                + 'text-gray-900 dark:text-white sm:mb-5 sm:text-4xl'
          }
        >
          {strMeal}
        </h1>
        <dl className="mb-4 flex items-center space-x-4 sm:mb-5">
          <div>
            <dt className="sr-only">Category</dt>
            <Categoria strCategory={ strCategory } strAlcoholic={ strAlcoholic } />
          </div>
        </dl>
        <dl>
          <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            Ingredients:
          </dt>
          <dd className="font-light text-gray-500 dark:text-gray-400">
            <ul>
              {ingredientes.map((element, index) => (
                <li key={ index } data-testid={ element[1] }>
                  {`${receita[element[0]]}:${receita[element[2]]}`}
                </li>
              ))}
            </ul>
          </dd>
        </dl>
      </div>
      <div
        className={ 'rounded-lg border border-gray-200 bg-gray-50 p-4'
              + ' dark:border-gray-600 dark:bg-gray-700' }
      >
        <img
          data-testid="recipe-photo"
          src={ imagem }
          alt="foto da receita"
        />
        <div className="flex flex-wrap items-center gap-4 justify-evenly mt-3">
          <BtnLike receita={ receita } />
          <BtnShare pathname={ pathname } history={ history } />
        </div>
      </div>
      <div className="sm:col-span-2">
        <dl>
          <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            Instructions:
          </dt>
          <dd className="font-light text-gray-500 dark:text-gray-400">
            <p data-testid="instructions">{receita.strInstructions}</p>
            {video && (
              <iframe
                className="mx-auto"
                data-testid="video"
                title="Video"
                width="420"
                height="315"
                src={ video }
              />
            )}
          </dd>
        </dl>
      </div>
      <BtnStart
        type={ (pathname.includes('meals') ? 'meals' : 'drinks') }
        id={ (receita.idMeal) ? receita.idMeal : receita.idDrink }
        history={ history }
      />
    </div>
  );
}

DetailedMeal.propTypes = {}.isRequired;

export default React.memo(DetailedMeal);
