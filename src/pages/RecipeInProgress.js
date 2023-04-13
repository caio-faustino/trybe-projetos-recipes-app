import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useSWR from 'swr';
import * as Toggle from '@radix-ui/react-toggle';
import { pegarReceita } from '../util/fetchers';
import BtnShare from '../components/BtnShare';
import BtnLike from '../components/BtnLike';

function RecipeInProgress() {
  const history = useHistory();
  const isMeal = history.location.pathname.includes('/meals');
  const { id } = useParams();
  const type = isMeal ? 'meals' : 'drinks';

  const { data, error, isLoading } = useSWR(
    `categories/${type}/${id}`,
    () => pegarReceita(isMeal, id),
  );

  console.log(data);

  return (
    <div className="flex flex-col gap-[5px] items-center justify-between container h-full">
      {isLoading && (<div>Carregando receita...</div>)}
      {!isLoading && error && (
        <div>
          Não foi possível carregar a receita:
          {error.message}
        </div>)}
      {!isLoading && (
        <div className="flex flex-col items-start">
          <img
            data-testid="recipe-photo"
            className="w-[300px] h-[300px] object-cover"
            src={ data.strMealThumb || data.strDrinkThumb }
            alt="Foto da receita"
          />
          <h1 data-testid="recipe-title">
            {data.strMeal || data.strDrink}
          </h1>
          <div className="flex gap-4">
            <BtnShare data-testid="share-btn" />
            <BtnLike data-testid="favorite-btn" receita={ data } />
          </div>
          <p data-testid="recipe-category">
            Categoria:
            {' '}
            {data.strCategory}
          </p>
          <h2>Instruções</h2>
          <p data-testid="instructions">{data.strInstructions}</p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            className="botaoPadrao"
          >
            Finalizar
          </button>

        </div>
      ) }
    </div>
  );
}

export default React.memo(RecipeInProgress);
