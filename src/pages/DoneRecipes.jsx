import React from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  return (
    <Header title="Done Recipes" iconeProfile />
  );
}

export default React.memo(DoneRecipes);
