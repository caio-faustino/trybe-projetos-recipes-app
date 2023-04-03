import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from './images/profileIcon.svg';
import searchIcon from './images/searchIcon.svg';

function Header(props) {
  const { title, iconeProfile = false, iconeSearch = false } = props;

  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      { iconeProfile
        && (
          <Link to="/profile">
            <img src={ profileIcon } data-testid="profile-top-btn" alt="profile" />
          </Link>
        )}
      { iconeSearch
        && (
          <img
            src={ searchIcon }
            data-testid="search-top-btn"
            alt="search"
          />
        )}
    </div>
  );
}

Header.propTypes = { }.isRequired;

export default React.memo(Header);
