import React, { useContext } from 'react';
import * as Toggle from '@radix-ui/react-toggle';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { ContextoBonito } from '../ContextoBonito';

export const novoFavorito = (receita) => {
  const obj = {
    id: (receita.idMeal) ? receita.idMeal : receita.idDrink,
    type: (receita.idMeal) ? 'meal' : 'drink',
    nationality: (receita.strArea) ? receita.strArea : '',
    category: receita.strCategory,
    alcoholicOrNot: (receita.strAlcoholic) ? receita.strAlcoholic : '',
    name: (receita.strMeal) ? receita.strMeal : receita.strDrink,
    image: (receita.strMealThumb) ? receita.strMealThumb : receita.strDrinkThumb,
  };
  // console.log(obj);
  return obj;
};

function BtnLikeWrapped({ receita }) {
  const { favorites, addFavorite, removeFavoriteById } = useContext(ContextoBonito);
  const id = receita.idMeal ? receita.idMeal : receita.idDrink;
  const isFavorite = favorites.some((fav) => fav.id === id);

  /* useEffect(() => {
    console.log(favorites, favorites);
  }, [favorites]); */

  return (
    <Toggle.Root
      // style={ { width: '6px', height: '6px' } }
      pressed={ isFavorite }
      onPressedChange={ () => {
        if (isFavorite) {
          // console.log('Clicou e vou remover dos favoritos');
          removeFavoriteById(id);
        } else {
          // console.log('Clicou e vou adicionar aos favoritos');
          const favorite = novoFavorito(receita);
          addFavorite(favorite);
        }
      } }
    >
      <img
        data-testid="favorite-btn"
        style={ { width: '20px', height: '20px' } }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="favorite"
      />
    </Toggle.Root>
  );
}

BtnLikeWrapped.propTypes = { }.isRequired;
export const BtnLike = React.memo(BtnLikeWrapped);
