import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeCard from './components/RecipeCard';

const ERRO_BUSCA_POR_LETRA = 'Your search must have only 1 (one) character';
const ERRO_SEM_RESULTADOS = 'Sorry, we haven\'t found any recipes for these filters';

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
      return;
    }
    if (isMeal) return `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchTerm}`;
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchTerm}`;
  }

  throw new Error('Nenhuma opção selecionada');
}

export async function pegarListaDeProdutos(endpoint, isMeal) {
  if (!endpoint) return [];
  // console.log(endpoint);
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('Retorno não ok');
  } else {
    const json = await response.json();
    if (!json.drinks && !json.meals) {
      global.alert(ERRO_SEM_RESULTADOS);
      return [];
    }
    if (isMeal && json.meals) return json.meals;
    if (!isMeal && json.drinks) return json.drinks;

    return [];
  }
}

export function SearchBar(props) {
  const { isMeal } = props;
  const [search, setSearch] = useState('');
  const [searched, setSearched] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const history = useHistory();

  const limiteDeReceitas = 12;

  return (
    <div>
      <form
        className="search-bar"
        onSubmit={ async (event) => {
          event.preventDefault();
          // console.log(event);
          const endpoint = pegarEndpoint(isMeal, search);
          const mealsOrDrinksList = await pegarListaDeProdutos(endpoint, isMeal);
          // console.log(mealsOrDrinksList);

          if (mealsOrDrinksList.length > 0) {
            // console.log(mealsOrDrinksList[0].idDrink);
            if (isMeal && mealsOrDrinksList.length === 1) {
              history.push({
                pathname: `/meals/${mealsOrDrinksList[0].idMeal}`,
                state: 'meal',
              });
            }
            if (!isMeal && mealsOrDrinksList.length === 1) {
              history.push({
                pathname: `/drinks/${mealsOrDrinksList[0].idDrinks}`,
                state: 'drink',
              });
            }
            if (mealsOrDrinksList.length > 1) {
              setRecipes(mealsOrDrinksList);
              setSearched(true);
            }
          }
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

      { searched && isMeal
        && (
          recipes.slice(0, limiteDeReceitas).map((element, index) => (
            <RecipeCard
              index={ index }
              key={ index }
              name={ element.strMeal }
              image={ element.strMealThumb }
            />
          ))
        )}
      { (searched && !isMeal)
        && (
          recipes.slice(0, limiteDeReceitas).map((element, index) => (
            <RecipeCard
              index={ index }
              key={ index }
              name={ element.strDrink }
              image={ element.strDrinkThumb }
            />
          ))
        )}
    </div>

  );
}
SearchBar.propTypes = {}.isRequired;
