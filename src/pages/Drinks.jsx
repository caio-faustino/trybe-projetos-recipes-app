import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks() {
  return (
    <>
      <div>
        <Header title="Drinks" iconeProfile iconeSearch />
      </div>
      <Footer />
    </>
  );
}

export default React.memo(Drinks);
