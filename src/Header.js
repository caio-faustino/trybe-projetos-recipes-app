import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from './images/profileIcon.svg';
import searchIcon from './images/searchIcon.svg';

function Header(props) {
  const { title, iconeProfile = false, iconeSearch = false } = props;
  const [mostrarPesquisa, setMostrarPesquisa] = React.useState(false);

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
      { mostrarPesquisa && (
        <input
          type="search"
          data-testid="search-input"
          placeholder="Buscar Receitas"
        />
      )}

    </div>
  );
}

Header.propTypes = { }.isRequired;

export default React.memo(Header);
