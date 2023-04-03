import React from 'react';
import Header from '../Header';

function FavoriteRecipes() {
  return (
    <Header title="Favorite Recipes" iconeProfile />
  );
}

export default React.memo(FavoriteRecipes);
