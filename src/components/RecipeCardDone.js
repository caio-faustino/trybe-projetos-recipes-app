import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { string } from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import icon from '../images/shareIcon.svg';

function RecipeCardDoneWrapped(props) {
  const { index, image, name, categoria, date, tags, type, id } = props;

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
      <p data-testid={ `${index}-horizontal-done-date` }>{date}</p>
      <p data-testid="link-copied">{linkCopied}</p>
      <button onClick={ () => handleClick() }>
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          alt="share button"
          src={ icon }
        />
      </button>
      {tags?.map((tag, i) => (
        <p key={ `${tag}-${i}` } data-testid={ `${index}-${tag}-horizontal-tag` }>
          {tag}
        </p>
      ))}
    </div>
  );
}

RecipeCardDoneWrapped.propTypes = {
  index: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  categoria: PropTypes.string,
  date: PropTypes.string,
  tags: PropTypes.arrayOf(string),
  id: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export const RecipeCardDone = React.memo(RecipeCardDoneWrapped);
