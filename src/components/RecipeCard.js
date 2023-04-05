import React from 'react';
// import PropTypes from 'prop-types';

function RecipeCard(props) {
  const { name, image, index } = props;
  // console.log(index);
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h1 data-testid={ `${index}-card-name` }>{ name }</h1>
      <img
        data-testid={ `${index}-card-img` }
        src={ image }
        alt={ name }
      />
    </div>
  );
}

RecipeCard.propTypes = {}.isRequired;

export default RecipeCard;
