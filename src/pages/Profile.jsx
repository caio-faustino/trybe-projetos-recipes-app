import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocalStorage } from '../useLocalStorage';
import ProfileButtonGroup from '../components/ProfileButtonGroup';

function Profile() {
  const [user] = useLocalStorage('user');

  return (
    <>
      <div>
        <ProfileButtonGroup />
        <Header title="Profile" iconeProfile search={ false } />

        <h1 data-testid="profile-email">
          { user && user.email }
        </h1>

      </div>
      <Footer />

    </>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;

export default React.memo(Profile);
