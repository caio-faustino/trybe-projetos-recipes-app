import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { pegarEndpoint, pegarListaDeProdutos, SearchBar } from '../SearchBar';
import { renderWithRouter } from './renderWith';

import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

describe('Testing SearchBar component', () => {
  beforeAll(() => {
    // Simulates the method window.alert
    global.alert = jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  const searchInputID = 'search-input';
  const searchButtonID = 'exec-search-btn';
  const radioButtonIngredientID = 'ingredient-search-radio';
  const radioButtonNameID = 'name-search-radio';
  const radioButtonFristLetterID = 'first-letter-search-radio';

  it('Testa a função pegarEndpoint para comidas para cada filtro', () => {
    renderWithRouter(<SearchBar isMeal />);

    const searchInput = screen.getByTestId(searchInputID);
    expect(searchInput).toBeVisible();

    const botaoPesquisar = screen.getByTestId(searchButtonID);
    expect(botaoPesquisar).toBeVisible();

    const PESQUISAR = 'teste';
    expect(() => pegarEndpoint(true, PESQUISAR)).toThrow();

    const radioButtonIngredient = screen.getByTestId(radioButtonIngredientID);
    userEvent.click(radioButtonIngredient);
    expect(pegarEndpoint(true, PESQUISAR)).toBe(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${PESQUISAR}`);

    const radioButtonName = screen.getByTestId(radioButtonNameID);
    userEvent.click(radioButtonName);
    expect(pegarEndpoint(true, PESQUISAR)).toBe(`https://www.themealdb.com/api/json/v1/1/search.php?s=${PESQUISAR}`);

    const radioButtonFristLetter = screen.getByTestId(radioButtonFristLetterID);
    userEvent.click(radioButtonFristLetter);
    expect(pegarEndpoint(true, 'A')).toBe('https://www.themealdb.com/api/json/v1/1/search.php?f=A');
    pegarEndpoint(true, PESQUISAR);
    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  it('Testa a função pegarEndpoint para bebidas', () => {
    renderWithRouter(<SearchBar />);

    const searchInput = screen.getByTestId(searchInputID);
    expect(searchInput).toBeVisible();

    const botaoPesquisar = screen.getByTestId(searchButtonID);
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

    /*    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(produtos),
    })); */
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(RECEITA_MOCK),
    });

    // Test the method pegarListaDeProdutos
    await expect(pegarListaDeProdutos('url', true)).resolves.toEqual(RECEITA_MOCK.meals);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('url');
  });

  it('Verificar se chama alerta ao receber da API obj vazio', async () => {
    const RECEITA_MOCK = {};

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(RECEITA_MOCK),
    });

    const data = await pegarListaDeProdutos('url', true);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('url');
    expect(global.alert).toHaveBeenCalledTimes(1);
    expect(data).toEqual([]);
  });

  it('Verificar se chama o fetch com drinks', async () => {
    const RECEITA_MOCK = {
      drinks: [
        { idDrink: '555', strMeal: 'drink1', strDrinkThumb: drinkIcon },
        { idDrink: '556', strMeal: 'drink2', strDrinkThumb: drinkIcon },
      ],
    };

    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(RECEITA_MOCK),
    }));

    // Test the method pegarListaDeProdutos
    await expect(pegarListaDeProdutos('url', false)).resolves.toEqual(RECEITA_MOCK.drinks);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('url');
  });

  it('Verifica se o usuario e redirecionado a pagina de detalhes daa comida caso seja retornada somente uma na pesquisa', async () => {
    // const { history } = renderWithRouter(<SearchBar isMeal />);
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const RECEITA_MOCK = {
      meals: [
        { idMeal: '111', strMeal: 'comida1', strMealThumb: mealIcon },
      ],
    };

    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(RECEITA_MOCK),
    }));

    const botaoIniciarPesquisa = screen.getByTestId(/search-top-btn/);
    userEvent.click(botaoIniciarPesquisa);

    const searchInput = screen.getByTestId(searchInputID);
    const botaoPesquisar = screen.getByTestId(searchButtonID);
    const radioButtonName = screen.getByTestId(radioButtonNameID);

    userEvent.type(searchInput, 'comida1');
    userEvent.click(radioButtonName);
    userEvent.click(botaoPesquisar);
    waitFor(() => {
      expect(history.location.pathname).toBe('/meals/111');
    }, { timeout: 3000 });
    // Esta recebendo "/"
  });

  it('Verifica se o usuario e redirecionado a pagina de detalhes de um drink caso seja retornada somente um na pesquisa', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    const RECEITA_MOCK = {
      drinks: [
        { idDrink: '555', strMeal: 'drink1', strDrinkThumb: drinkIcon },
      ],
    };

    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(RECEITA_MOCK),
    }));

    const botaoIniciarPesquisa = screen.getByTestId(/search-top-btn/);
    userEvent.click(botaoIniciarPesquisa);

    const searchInput = screen.getByTestId(searchInputID);
    const botaoPesquisar = screen.getByTestId(searchButtonID);
    const radioButtonName = screen.getByTestId(radioButtonNameID);

    userEvent.type(searchInput, 'drink1');
    userEvent.click(radioButtonName);
    userEvent.click(botaoPesquisar);
    waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/555');
    }, { timeout: 3000 });
  });

  it('Verifica se e renderizado ate 12 comidas quando achado mais que uma', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
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

    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(RECEITA_MOCK),
    }));

    const botaoIniciarPesquisa = screen.getByTestId(/search-top-btn/);
    userEvent.click(botaoIniciarPesquisa);

    const searchInput = screen.getByTestId(searchInputID);
    const botaoPesquisar = screen.getByTestId(searchButtonID);
    const radioButtonFristLetter = screen.getByTestId(radioButtonFristLetterID);
    userEvent.type(searchInput, 'c');
    userEvent.click(radioButtonFristLetter);
    userEvent.click(botaoPesquisar);

    waitFor(() => {
      const recipeCards = screen.getAllByTestId(/recipe-card/);
      const recipeCardsImages = screen.getAllByTestId(/card-name/);
      const recipeCardsNames = screen.getAllByTestId(/card-img/);
      expect(recipeCards.length).toBe(12);
      expect(recipeCardsImages.length).toBe(12);
      expect(recipeCardsNames.length).toBe(12);
    }, { timeout: 3000 });
  });

  it('Verifica se sao renderizados os drinks quando achado mais que uma', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    const RECEITA_MOCK = {
      meals: [
        { idDrink: '555', strDrink: 'drink1', strDrinkThumb: drinkIcon },
        { idDrink: '556', strDrink: 'drink2', strDrinkThumb: drinkIcon },
        { idDrink: '557', strDrink: 'drink3', strDrinkThumb: drinkIcon },
      ],
    };

    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(RECEITA_MOCK),
    }));

    const botaoIniciarPesquisa = screen.getByTestId(/search-top-btn/);
    userEvent.click(botaoIniciarPesquisa);

    const searchInput = screen.getByTestId(searchInputID);
    const botaoPesquisar = screen.getByTestId(searchButtonID);
    const radioButtonFristLetter = screen.getByTestId(radioButtonFristLetterID);
    userEvent.type(searchInput, 'd');
    userEvent.click(radioButtonFristLetter);
    userEvent.click(botaoPesquisar);

    waitFor(() => {
      const recipeCards = screen.getAllByTestId(/recipe-card/);
      const recipeCardsImages = screen.getAllByTestId(/card-name/);
      const recipeCardsNames = screen.getAllByTestId(/card-img/);
      expect(recipeCards.length).toBe(3);
      expect(recipeCardsImages.length).toBe(3);
      expect(recipeCardsNames.length).toBe(3);
    }, { timeout: 3000 });
  });
});
