import React from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '../useLocalStorage';

// import LocalStorage from '../helpers/LocalStorage';

function BtnStart({ id, type, history }) {
  const [inProgressRecipes, setInProgressRecipes] = useLocalStorage(
    'inProgressRecipes',
    { meals: {}, drinks: {} },
  );
  const inProgress = id in inProgressRecipes[type];

  return (
    <div>
      <button
        style={ { position: 'fixed',
          bottom: '0px' } }
        className="start-button"
        data-testid="start-recipe-btn"
        onClick={ () => {
          const newProgressRecipe = { ...inProgressRecipes };
          newProgressRecipe[type][id] = [];
          setInProgressRecipes(newProgressRecipe);
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

export default React.memo(BtnStart);
