import React from 'react';
import Header from '../Header';

function Profile() {
  return (
    <Header title="Profile" iconeProfile />
  );
}

export default React.memo(Profile);
