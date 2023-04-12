import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
// import LocalStorage from '../helpers/LocalStorage';

function BtnStart({ id, type }) {
  // console.log(id);
  //   const storageDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [inProgress, setInProgress] = useState(false);
  const progressRecipe = JSON
    .parse(localStorage
      .getItem('inProgressRecipes')) || { meals: {}, drinks: {} };
  const history = useHistory();
  const handleStartClick = () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipe));
    history.push(`/${type}/${id}/in-progress`);
  };
  useEffect(() => {
    if (id in progressRecipe[type]) {
      setInProgress(true);
    }
  }, [id, progressRecipe, type]);
  return (
    <div>
      <button
        style={ { position: 'fixed',
          bottom: '0px' } }
        className="start-button"
        data-testid="start-recipe-btn"
        onClick={ handleStartClick }
      >
        {inProgress ? 'Continue Recipe' : 'Start Recipe' }
      </button>
    </div>
  );
}

BtnStart.propTypes = { type: PropTypes.string,
  id: PropTypes.number }.isRequired;

export default BtnStart;
