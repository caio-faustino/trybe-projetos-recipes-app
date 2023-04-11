import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
// import LocalStorage from '../helpers/LocalStorage';

function BtnStart({ history, id, type }) {
  console.log(history);
  console.log(id);
  //   const storageDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [inProgress, setInProgress] = useState(false);
  const progressRecipe = JSON
    .parse(localStorage
      .getItem('inProgressRecipes')) || { meals: {}, drinks: {} };
  // const history = useHistory;
  const handleStartClick = () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipe));
    history.push(`/${type}/${id}/in-progress`);
  };
  useEffect(() => {
    if (id in progressRecipe[type]) {
      setInProgress(true);
    }
  }, []);
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
