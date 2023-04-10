import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderizarCaminho, renderWithRouter } from './renderWith';
import {
  mockarAlert,
  mockarCategorias,
  mockarFetch,
  restaurarFetch,
} from '../util/mockadores';

import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import { pegarListaDeProdutos } from '../pages/Recipes';
import { pegarEndpoint } from '../SearchBar';

describe('Testing SearchBar component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const searchInputID = 'search-input';
  const searchButtonID = 'exec-search-btn';
  const radioButtonIngredientID = 'ingredient-search-radio';
  const radioButtonNameID = 'name-search-radio';
  const radioButtonFristLetterID = 'first-letter-search-radio';

  it('Testa a função pegarEndpoint para comidas para cada filtro', async () => {
    await renderizarCaminho('/meals');

    const botaoIniciarPesquisa = await screen.findByTestId(/search-top-btn/);
    userEvent.click(botaoIniciarPesquisa);

    const searchInput = await screen.findByTestId(searchInputID);
    expect(searchInput).toBeVisible();

    const botaoPesquisar = await screen.findByTestId(searchButtonID);
    expect(botaoPesquisar).toBeVisible();

    const PESQUISAR = 'teste';
    expect(() => pegarEndpoint(true, PESQUISAR)).toThrow();

    const radioButtonIngredient = screen.getByTestId(radioButtonIngredientID);
    userEvent.click(radioButtonIngredient);
    expect(pegarEndpoint(true, PESQUISAR)).toBe(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${PESQUISAR}`);

    const radioButtonName = screen.getByTestId(radioButtonNameID);
    userEvent.click(radioButtonName);
    expect(pegarEndpoint(true, PESQUISAR)).toBe(`https://www.themealdb.com/api/json/v1/1/search.php?s=${PESQUISAR}`);

    const radioButtonFirstLetter = await screen.findByTestId(radioButtonFristLetterID);
    userEvent.click(radioButtonFirstLetter);
    expect(pegarEndpoint(true, 'A')).toBe('https://www.themealdb.com/api/json/v1/1/search.php?f=A');

    mockarAlert();
    pegarEndpoint(true, PESQUISAR);
    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  it('Testa a função pegarEndpoint para bebidas', async () => {
    await renderizarCaminho('/drinks');

    const botaoIniciarPesquisa = await screen.findByTestId(/search-top-btn/);
    userEvent.click(botaoIniciarPesquisa);

    const searchInput = await screen.findByTestId(searchInputID);
    expect(searchInput).toBeVisible();

    const botaoPesquisar = await screen.findByTestId(searchButtonID);
    expect(botaoPesquisar).toBeVisible();

    const PESQUISAR = 'teste';
    expect(() => pegarEndpoint(false, PESQUISAR)).toThrow();

    const radioButtonIngredient = screen.getByTestId(radioButtonIngredientID);
    userEvent.click(radioButtonIngredient);
    expect(pegarEndpoint(false, PESQUISAR)).toBe(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${PESQUISAR}`);

    const radioButtonName = screen.getByTestId(radioButtonNameID);
    userEvent.click(radioButtonName);
    expect(pegarEndpoint(false, PESQUISAR)).toBe(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${PESQUISAR}`);

    const terceiroRadio = screen.getByTestId('first-letter-search-radio');
    userEvent.click(terceiroRadio);
    expect(pegarEndpoint(false, 'A')).toBe('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=A');

    mockarAlert();
    pegarEndpoint(true, PESQUISAR);
    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  it('Verificar se chama o fetch com meals', async () => {
    const RECEITA_MOCK = {
      meals: [
        { idMeal: '111', strMeal: 'comida1', strMealThumb: mealIcon },
        { idMeal: '112', strMeal: 'comida2', strMealThumb: mealIcon },
      ],
    };
    mockarFetch(RECEITA_MOCK);

    // Test the method pegarListaDeProdutos
    await expect(pegarListaDeProdutos('url', true)).resolves.toEqual(RECEITA_MOCK.meals);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('url');
  });

  it('Verificar se chama alerta ao receber da API obj vazio', async () => {
    await renderizarCaminho('/meals');

    const RECEITA_MOCK = {};
    mockarFetch(RECEITA_MOCK);

    const botaoIniciarPesquisa = await screen.findByTestId(/search-top-btn/);
    userEvent.click(botaoIniciarPesquisa);

    const searchInput = await screen.findByTestId(searchInputID);
    const radioButtonName = await screen.findByTestId(radioButtonNameID);
    const botaoPesquisar = await screen.findByTestId(searchButtonID);

    userEvent.type(searchInput, 'inexistente');
    userEvent.click(radioButtonName);
    mockarAlert();
    userEvent.click(botaoPesquisar);

    // expect(global.fetch).toHaveBeenCalledTimes(1);
    // expect(global.fetch).toHaveBeenCalledWith('url');
    await act(async () => { });
    expect(global.alert).toHaveBeenCalledTimes(1);
    // expect(data).toEqual([]);
  });

  it('Verificar se chama o fetch com drinks', async () => {
    const RECEITA_MOCK = {
      drinks: [
        { idDrink: '555', strMeal: 'drink1', strDrinkThumb: drinkIcon },
        { idDrink: '556', strMeal: 'drink2', strDrinkThumb: drinkIcon },
      ],
    };

    mockarFetch(RECEITA_MOCK);
    await expect(pegarListaDeProdutos('url', false)).resolves.toEqual(RECEITA_MOCK.drinks);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('url');
    restaurarFetch();
  });

  it('Verifica se o usuário é redirecionado a pagina de detalhes da comida caso seja'
        + ' retornada somente uma na pesquisa', async () => {
    mockarCategorias();
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    restaurarFetch();

    const RECEITA_MOCK = {
      meals: [
        { idMeal: '111', strMeal: 'comida1', strMealThumb: mealIcon },
      ],
    };
    mockarFetch(RECEITA_MOCK);

    const botaoIniciarPesquisa = await screen.findByTestId(/search-top-btn/);
    userEvent.click(botaoIniciarPesquisa);

    const searchInput = await screen.findByTestId(searchInputID);
    userEvent.type(searchInput, 'comida1');

    const radioButtonName = await screen.findByTestId(radioButtonNameID);
    userEvent.click(radioButtonName);

    const botaoPesquisar = await screen.findByTestId(searchButtonID);
    userEvent.click(botaoPesquisar);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/111');
    }, { timeout: 3000 });
  });

  it('Verifica se o usuario e redirecionado a pagina de detalhes de um drink caso seja retornada somente um na pesquisa', async () => {
    mockarCategorias();
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    restaurarFetch();

    const RECEITA_MOCK = {
      drinks: [
        { idDrink: '555', strMeal: 'drink1', strDrinkThumb: drinkIcon },
      ],
    };
    mockarFetch(RECEITA_MOCK);

    const botaoIniciarPesquisa = await screen.findByTestId(/search-top-btn/);
    userEvent.click(botaoIniciarPesquisa);

    const searchInput = await screen.findByTestId(searchInputID);
    const botaoPesquisar = await screen.findByTestId(searchButtonID);
    const radioButtonName = screen.getByTestId(radioButtonNameID);

    userEvent.type(searchInput, 'drink1');
    userEvent.click(radioButtonName);
    userEvent.click(botaoPesquisar);
    restaurarFetch();

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/555');
    }, { timeout: 3000 });
  });

  it('Verifica se e renderizado ate 12 comidas quando achado mais que uma', async () => {
    await renderizarCaminho('/meals');

    const RECEITA_MOCK = {
      meals: [
        { idMeal: '111', strMeal: 'comida1', strMealThumb: mealIcon },
        { idMeal: '112', strMeal: 'comida2', strMealThumb: mealIcon },
        { idMeal: '113', strMeal: 'comida3', strMealThumb: mealIcon },
        { idMeal: '114', strMeal: 'comida4', strMealThumb: mealIcon },
        { idMeal: '115', strMeal: 'comida5', strMealThumb: mealIcon },
        { idMeal: '116', strMeal: 'comida6', strMealThumb: mealIcon },
        { idMeal: '117', strMeal: 'comida7', strMealThumb: mealIcon },
        { idMeal: '118', strMeal: 'comida8', strMealThumb: mealIcon },
        { idMeal: '119', strMeal: 'comida9', strMealThumb: mealIcon },
        { idMeal: '120', strMeal: 'comida10', strMealThumb: mealIcon },
        { idMeal: '121', strMeal: 'comida11', strMealThumb: mealIcon },
        { idMeal: '122', strMeal: 'comida12', strMealThumb: mealIcon },
        { idMeal: '123', strMeal: 'comida13', strMealThumb: mealIcon },
        { idMeal: '124', strMeal: 'comida14', strMealThumb: mealIcon },
      ],
    };

    mockarFetch(RECEITA_MOCK);

    const botaoIniciarPesquisa = await screen.findByTestId(/search-top-btn/);
    userEvent.click(botaoIniciarPesquisa);

    const searchInput = await screen.findByTestId(searchInputID);
    const botaoPesquisar = await screen.findByTestId(searchButtonID);
    const radioButtonFristLetter = await screen.findByTestId(radioButtonFristLetterID);
    userEvent.type(searchInput, 'c');
    userEvent.click(radioButtonFristLetter);
    userEvent.click(botaoPesquisar);

    const recipeCards = await screen.findAllByTestId(/recipe-card/);
    const recipeCardsImages = await screen.findAllByTestId(/card-name/);
    const recipeCardsNames = await screen.findAllByTestId(/card-img/);

    await waitFor(() => expect(recipeCards.length).toBe(12));
    await waitFor(() => expect(recipeCardsImages.length).toBe(12));
    await waitFor(() => expect(recipeCardsNames.length).toBe(12));
  });

  it.skip('Verifica se são renderizados os drinks quando achado mais que uma', async () => {
    await renderizarCaminho('/drinks');

    const RECEITA_MOCK = {
      meals: [
        { idDrink: '555', strDrink: 'drink1', strDrinkThumb: drinkIcon },
        { idDrink: '556', strDrink: 'drink2', strDrinkThumb: drinkIcon },
        { idDrink: '557', strDrink: 'drink3', strDrinkThumb: drinkIcon },
      ],
    };

    const botaoIniciarPesquisa = await screen.findByTestId(/search-top-btn/);
    userEvent.click(botaoIniciarPesquisa);

    const searchInput = await screen.findByTestId(searchInputID);
    const radioButtonFristLetter = await screen.findByTestId(radioButtonFristLetterID);
    const botaoPesquisar = await screen.findByTestId(searchButtonID);

    userEvent.type(searchInput, 'd');
    userEvent.click(radioButtonFristLetter);

    mockarFetch(RECEITA_MOCK);
    userEvent.click(botaoPesquisar);
    act(() => {}); // dar tempo

    const recipeCards = await waitFor(
      () => screen.getAllByTestId('recipe-card'),
      { timeout: 4000 },
    );
    const recipeCardsImages = await screen.findAllByTestId(/card-name/);
    const recipeCardsNames = await screen.findAllByTestId(/card-img/);

    await waitFor(() => expect(recipeCards.length).toBe(3));
    await waitFor(() => expect(recipeCardsImages.length).toBe(3));
    await waitFor(() => expect(recipeCardsNames.length).toBe(3));
    restaurarFetch();
  });

  it('Verifica se e renderizado ate 12 bebidas quando achado mais que uma', async () => {
    mockarCategorias();
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    restaurarFetch();

    const RECEITA_MOCK = {
      drinks: [
        { idDrink: '111', strDrink: 'bebida1', strDrinkThumb: drinkIcon },
        { idDrink: '112', strDrink: 'bebida2', strDrinkThumb: drinkIcon },
        { idDrink: '113', strDrink: 'bebida3', strDrinkThumb: drinkIcon },
        { idDrink: '114', strDrink: 'bebida4', strDrinkThumb: drinkIcon },
        { idDrink: '115', strDrink: 'bebida5', strDrinkThumb: drinkIcon },
        { idDrink: '116', strDrink: 'bebida6', strDrinkThumb: drinkIcon },
        { idDrink: '117', strDrink: 'bebida7', strDrinkThumb: drinkIcon },
        { idDrink: '118', strDrink: 'bebida8', strDrinkThumb: drinkIcon },
        { idDrink: '119', strDrink: 'bebida9', strDrinkThumb: drinkIcon },
        { idDrink: '120', strDrink: 'bebida10', strDrinkThumb: drinkIcon },
        { idDrink: '121', strDrink: 'bebida11', strDrinkThumb: drinkIcon },
        { idDrink: '122', strDrink: 'bebida12', strDrinkThumb: drinkIcon },
        { idDrink: '123', strDrink: 'bebida13', strDrinkThumb: drinkIcon },
        { idDrink: '124', strDrink: 'bebida14', strDrinkThumb: drinkIcon },
      ],
    };

    mockarFetch(RECEITA_MOCK);

    const botaoIniciarPesquisa = await screen.findByTestId(/search-top-btn/);
    userEvent.click(botaoIniciarPesquisa);

    const searchInput = await screen.findByTestId(searchInputID);
    const botaoPesquisar = await screen.findByTestId(searchButtonID);
    const radioButtonFristLetter = await screen.findByTestId(radioButtonFristLetterID);
    userEvent.type(searchInput, 'c');
    userEvent.click(radioButtonFristLetter);
    userEvent.click(botaoPesquisar);

    const recipeCards = await screen.findAllByTestId(/recipe-card/);
    const recipeCardsImages = await screen.findAllByTestId(/card-name/);
    const recipeCardsNames = await screen.findAllByTestId(/card-img/);

    await waitFor(() => expect(recipeCards.length).toBe(12));
    await waitFor(() => expect(recipeCardsImages.length).toBe(12));
    await waitFor(() => expect(recipeCardsNames.length).toBe(12));
  });
});
