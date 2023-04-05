import React from 'react';
import Header from '../Header';
import Footer from '../components/Footer';

function Receitas() {
  return (
    <>
      <div>
        <Header title="Meals" iconeProfile iconeSearch />
      </div>
      <Footer />
    </>
  );
}

export default React.memo(Receitas);
