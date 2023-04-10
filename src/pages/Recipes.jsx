import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Categories } from '../components/Categories';

function Receitas() {
  const history = useHistory();
  const { pathname } = history.location;
  let titulo = '';
  if (pathname.includes('meals')) {
    titulo = 'Meals';
  } else {
    titulo = 'Drinks';
  }
  return (
    <>
      <div>
        <Header title={ titulo } iconeProfile iconeSearch />
      </div>
      <Categories isMeal />
      <Footer />
    </>
  );
}

export default React.memo(Receitas);
