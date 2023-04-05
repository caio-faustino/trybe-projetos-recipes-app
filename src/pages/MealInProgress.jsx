import React from 'react';
import Header from '../Header';
import Footer from '../components/Footer';

function MealInProgress() {
  return (
    <>
      <div>
        <Header title="Drinks" search />
      </div>

      <Footer />
    </>
  );
}

export default React.memo(MealInProgress);
