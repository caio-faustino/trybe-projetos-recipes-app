import React from 'react';

function Header(props) {
  const { title, iconeProfile = false, iconeSearch = false } = props;

  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      { iconeProfile
        && <img
          src="../src/images/profileIcon.svg"
          data-testid="profile-top-btn"
          alt="avatar"
        />}
      { iconeSearch
        && (
          <img
            src="../src/images/searchIcon.svg"
            data-testid="search-top-btn"
            alt="search"
          />
        )}
    </div>
  );
}

Header.propTypes = { }.isRequired;

export default React.memo(Header);
