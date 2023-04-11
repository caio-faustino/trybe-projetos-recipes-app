import React, { useState } from 'react';

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

  return (
    <div>
      <form
        className="search-bar"
        onSubmit={ (event) => {
          event.preventDefault();
          // console.log(event);
          setPesquisa({ search, endpoint: pegarEndpoint(true, search) });
        } }
      >
        <input
          type="search"
          data-testid="search-input"
          placeholder="Buscar Receitas"
          value={ search }
          onChange={ ({ target: { value } }) => setSearch(value) }
        />
        <div className="search-options">
          <label htmlFor="ingredient-search-radio">
            <input
              type="radio"
              name="search-option"
              id="ingredient-search-radio"
              value="ingredient"
              data-testid="ingredient-search-radio"
            />
            Buscar por ingrediente
          </label>
          <label htmlFor="name-search-radio">
            <input
              type="radio"
              name="search-option"
              id="name-search-radio"
              value="name"
              data-testid="name-search-radio"
            />
            Buscar por nome
          </label>
          <label htmlFor="first-letter-search-radio">
            <input
              type="radio"
              name="search-option"
              id="first-letter-search-radio"
              value="first-letter"
              data-testid="first-letter-search-radio"
            />
            Buscar pela primeira letra
          </label>
        </div>
        <button type="submit" data-testid="exec-search-btn">Buscar</button>
      </form>
    </div>

  );
}
SearchBar.propTypes = {}.isRequired;
