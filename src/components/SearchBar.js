import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const ERRO_BUSCA_POR_LETRA = 'Your search must have only 1 (one) character';

export function pegarEndpoint(isMeal, searchTerm) {
  const ingredientRadio = document
    .querySelector('[data-testid="ingredient-search-radio"]');
  if (ingredientRadio?.checked) {
    // console.log('ingrediente');
    if (isMeal) return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`;
    return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTerm}`;
  }

  const nameRadio = document.querySelector('[data-testid="name-search-radio"]');
  if (nameRadio?.checked) {
    // console.log('nome');
    if (isMeal) return `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;
  }

  const firstLetterRadio = document
    .querySelector('[data-testid="first-letter-search-radio"]');
  if (firstLetterRadio?.checked) {
    // console.log('primeira letra');
    if (searchTerm.length > 1) {
      // const texto = 'Your search must have only 1 (one) character';
      global.alert(ERRO_BUSCA_POR_LETRA);
      // throw new Error(texto);
      return '';
    }
    if (isMeal) return `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchTerm}`;
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchTerm}`;
  }

  throw new Error('Nenhuma opção selecionada');
}

export function SearchBar({ setPesquisa }) {
  const [search, setSearch] = useState('');

  const history = useHistory();
  const { pathname } = history.location;
  const isMeal = pathname.includes('/meals');

  return (
    <form
      className="flex items-center"
      onSubmit={ (event) => {
        event.preventDefault();
        // console.log(event);
        setPesquisa({ search, endpoint: pegarEndpoint(isMeal, search) });
      } }
    >
      <label htmlFor="simple-search" className="sr-only">Search</label>
      <div className="relative w-full">
        <div
          className={ 'absolute inset-y-0 left-0 flex items-center '
                + 'pl-3 pointer-events-none' }
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d={ 'M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 '
                  + '3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' }
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="search"
          id="simple-search"
          data-testid="search-input"
          placeholder="Search"
          className="search-input"
          value={ search }
          onChange={ ({ target: { value } }) => setSearch(value) }
          required
        />
      </div>

      <div>
        <div className="flex items-center">
          <input
            type="radio"
            name="search-option"
            id="ingredient-search-radio"
            value="ingredient"
            data-testid="ingredient-search-radio"
            className="inputRadio"
          />
          <label
            htmlFor="ingredient-search-radio"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Buscar por ingrediente
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            name="search-option"
            id="name-search-radio"
            value="name"
            data-testid="name-search-radio"
            className="inputRadio"
          />
          <label
            htmlFor="name-search-radio"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Buscar por nome
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            name="search-option"
            id="first-letter-search-radio"
            value="first-letter"
            data-testid="first-letter-search-radio"
            className="inputRadio"
          />
          <label
            htmlFor="first-letter-search-radio"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Buscar pela primeira letra
          </label>
        </div>

        <button
          className="botaoPadrao"
          type="submit"
          data-testid="exec-search-btn"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
SearchBar.propTypes = {}.isRequired;
