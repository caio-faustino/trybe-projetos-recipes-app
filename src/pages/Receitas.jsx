import React from 'react';
import Header from '../Header';

function Receitas() {
  return (
    <Header title="Meals" iconeProfile iconeSearch />
  );
}

export default React.memo(Receitas);
