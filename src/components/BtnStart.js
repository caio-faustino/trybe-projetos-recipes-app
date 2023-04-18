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
    <button
      style={ { position: 'fixed', bottom: '0px' } }
      data-testid="start-recipe-btn"
      className="!fixed !bottom-0 botaoAzul"
      onClick={ () => {
        const newProgressRecipe = { ...inProgressRecipes };
        newProgressRecipe[type][id] = [];
        setInProgressRecipes(newProgressRecipe);
        history.push(`/${type}/${id}/in-progress`);
      } }
    >
      {inProgress ? 'Continue Recipe' : 'Start Recipe' }
    </button>
  );
}

BtnStart.propTypes = {
  type: PropTypes.string,
  id: PropTypes.number,
}.isRequired;

export default React.memo(BtnStart);
