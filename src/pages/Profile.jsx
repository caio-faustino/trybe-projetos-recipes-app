import React from 'react';
import Header from '../Header';
import Footer from '../components/Footer';

function Profile() {
  return (
    <>
      <div>
        <Header title="Profile" search={ false } />
      </div>
      <Footer />

    </>
  );
}

export default React.memo(Profile);
