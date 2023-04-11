import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { SearchBar } from '../SearchBar';
import './Header.css';

function Header(props) {
  const { title, iconeProfile = false, iconeSearch = false, setPesquisa } = props;
  const [mostrarPesquisa, setMostrarPesquisa] = React.useState(false);
  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      { iconeProfile
        && (
          <Link className="icone-link" to="/profile">
            <img src={ profileIcon } data-testid="profile-top-btn" alt="profile" />
          </Link>
        )}
      { iconeSearch
        && (
          <button
            className="icone-link"
            type="button"
            onClick={ () => setMostrarPesquisa(!mostrarPesquisa) }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search"
            />
          </button>
        )}
      { mostrarPesquisa
          && (<SearchBar setPesquisa={ setPesquisa } />)}
    </div>
  );
}

Header.propTypes = { }.isRequired;

export default React.memo(Header);
