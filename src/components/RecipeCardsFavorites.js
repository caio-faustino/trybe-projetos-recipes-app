import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { string } from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import icon from '../images/shareIcon.svg';

function RecipeCardFavoritesWrapped(props) {
  const { index, image, name, categoria, type, id } = props;

  const [linkCopied, setLinkCopied] = useState('');
  const handleClick = async () => {
    await clipboardCopy(`http://localhost:3000/${type}s/${id}`);
    setLinkCopied('Link copied!');
  };

  // console.log(index);

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <Link to={ `/${type}s/${id}` }>
        <h1 data-testid={ `${index}-horizontal-name` }>{name}</h1>
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>{categoria}</p>
      <Link to={ `/${type}s/${id}` }>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          width="300px"
        />
      </Link>
      <p data-testid="link-copied">{linkCopied}</p>
      <button onClick={ () => handleClick() }>
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          alt="share button"
          src={ icon }
        />
      </button>

      <button onClick={ () => handleClick() }>
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          alt="favorite button"
          src={ icon }
        />
      </button>
    </div>
  );
}

RecipeCardFavoritesWrapped.propTypes = {
  index: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  categoria: PropTypes.string,
  date: PropTypes.string,
  tags: PropTypes.arrayOf(string),
  id: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export const RecipeCardDone = React.memo(RecipeCardFavoritesWrapped);
