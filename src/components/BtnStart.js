import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useLocalStorage } from '../useLocalStorage';

// import LocalStorage from '../helpers/LocalStorage';

function BtnStart({ id, type }) {
  const history = useHistory();
  const [progressRecipe, setProgressRecipe] = useLocalStorage(
    'inProgressRecipes',
    { meals: {}, drinks: {} },
  );
  const inProgress = id in progressRecipe[type];

  return (
    <div>
      <button
        style={ { position: 'fixed',
          bottom: '0px' } }
        className="start-button"
        data-testid="start-recipe-btn"
        onClick={ () => {
          const newProgressRecipe = { ...progressRecipe };
          newProgressRecipe[type][id] = [];
          setProgressRecipe(newProgressRecipe);
          history.push(`/${type}/${id}/in-progress`);
        } }
      >
        {inProgress ? 'Continue Recipe' : 'Start Recipe' }
      </button>
    </div>
  );
}

BtnStart.propTypes = { type: PropTypes.string,
  id: PropTypes.number }.isRequired;

export default BtnStart;
