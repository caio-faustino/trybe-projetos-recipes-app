import React from 'react';

export function pegarEndpoint(isMeal, searchTerm) {
  const ingredientRadio = document
    .querySelector('[data-testid="ingredient-search-radio"]');
  const nameRadio = document.querySelector('[data-testid="name-search-radio"]');
  const firstLetterRadio = document
    .querySelector('[data-testid="first-letter-search-radio"]');

  if (ingredientRadio?.checked) {
    console.log('ingrediente');
    if (isMeal) return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`;
    return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTerm}`;
  }
  if (nameRadio?.checked) {
    console.log('nome');
    if (isMeal) return `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;
  }
  if (firstLetterRadio?.checked) {
    console.log('primeira letra');
    if (searchTerm.length > 1) {
      const texto = 'Your search must have only 1 (one) character';
      global.alert(texto);
      // throw new Error(texto);
      return;
    }
    if (isMeal) return `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchTerm}`;
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchTerm}`;
  }
  throw new Error('Nenhuma opção selecionada');
}

export async function pegarListaDeProdutos(endpoint, isMeal) {
  if (!endpoint) return [];
  console.log(endpoint);
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('Retorno não ok');
  } else {
    const json = await response.json();
    if (isMeal) return json.meals || [];
    return json.drinks || [];
  }
}

export function SearchBar(props) {
  const { isMeal } = props;
  const [search, setSearch] = React.useState('');

  return (
    <form
      className="search-bar"
      onSubmit={ async (event) => {
        event.preventDefault();
        const endpoint = pegarEndpoint(isMeal, search);
        const mealsOrDrinksList = await pegarListaDeProdutos(endpoint, isMeal);
        console.log(mealsOrDrinksList);
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
SearchBar.propTypes = {}.isRequired;
