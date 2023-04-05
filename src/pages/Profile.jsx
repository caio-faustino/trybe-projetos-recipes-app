import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  return (
    <>
      <div>
        <Header title="Profile" iconeProfile search={ false } />
      </div>
      <Footer />

    </>
  );
}

export default React.memo(Profile);
