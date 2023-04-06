import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Categories } from '../components/Categories';

function Drinks() {
  return (
    <>
      <div>
        <Header title="Drinks" iconeProfile iconeSearch />
      </div>
      <Categories isMeal={ false } />
      <Footer />
    </>
  );
}

export default React.memo(Drinks);
