import React from 'react';
import Header from '../Header';

function DoneRecipes() {
  return (
    <Header title="Done Recipes" iconeProfile />
  );
}

export default React.memo(DoneRecipes);
