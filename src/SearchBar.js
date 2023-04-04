import React from 'react';
import { useHistory } from 'react-router-dom';

export function SearchBar(props) {
  const { comida } = props;
  const [search, setSearch] = React.useState('');

  return (
    <form
      className="search-bar"
      onSubmit={ (event) => {
        event.preventDefault();
        let endpoint;

        const ingredientRadio = document
          .querySelector('[data-testid="ingredient-search-radio"]');
        const nameRadio = document.querySelector('[data-testid="name-search-radio"]');
        const firstLetterRadio = document
          .querySelector('[data-testid="first-letter-search-radio"]');

        if (ingredientRadio.checked) {
          console.log('ingrediente');
          if (comida) endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
          else { endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`; }
        } else if (nameRadio.checked) {
          console.log('nome');
          endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
        } else if (firstLetterRadio.checked) {
          console.log('primeira letra');
          if (search.length > 1) {
            global.alert('Your search must have only 1 (one) character');
            return;
          }
          endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
        }
        let json;
        // Fetch the data
        const funcao = async () => {
          const response = await fetch(endpoint);
          json = await response.json();
        };
        funcao();
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
  );
}
