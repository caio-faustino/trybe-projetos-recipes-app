import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from './images/profileIcon.svg';
import searchIcon from './images/searchIcon.svg';
import { SearchBar } from './SearchBar';

function Header(props) {
  const { title, iconeProfile = false, iconeSearch = false } = props;
  const [mostrarPesquisa, setMostrarPesquisa] = React.useState(false);

  const history = useHistory();
  const isMeal = React.useMemo(
    () => history.location.pathname.includes('/meals'),
    [history.location],
  );

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
          <button
            type="button"
            style={ { border: 'none', background: 'none' } }
            onClick={ () => setMostrarPesquisa(!mostrarPesquisa) }
          >
            <img
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="search"
            />
          </button>
        )}
      { mostrarPesquisa && (<SearchBar isMeal={ isMeal } />)}
    </div>
  );
}

Header.propTypes = { }.isRequired;

export default React.memo(Header);
