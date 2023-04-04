import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { pegarEndpoint, pegarListaDeProdutos, SearchBar } from '../SearchBar';
import { renderWithRouter } from './renderWith';

describe('Testing SearchBar component', () => {
  beforeAll(() => {
    // Simulates the method window.alert
    global.alert = jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('Testa a função pegarEndpoint para comidas', () => {
    renderWithRouter(<SearchBar isMeal />);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeVisible();

    const botaoPesquisar = screen.getByTestId('exec-search-btn');
    expect(botaoPesquisar).toBeVisible();

    const PESQUISAR = 'teste';
    expect(() => pegarEndpoint(true, PESQUISAR)).toThrow();

    const primeiroRadio = screen.getByTestId('ingredient-search-radio');
    userEvent.click(primeiroRadio);
    expect(pegarEndpoint(true, PESQUISAR)).toBe(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${PESQUISAR}`);

    const segundoRadio = screen.getByTestId('name-search-radio');
    userEvent.click(segundoRadio);
    expect(pegarEndpoint(true, PESQUISAR)).toBe(`https://www.themealdb.com/api/json/v1/1/search.php?s=${PESQUISAR}`);

    const terceiroRadio = screen.getByTestId('first-letter-search-radio');
    userEvent.click(terceiroRadio);
    expect(pegarEndpoint(true, 'A')).toBe('https://www.themealdb.com/api/json/v1/1/search.php?f=A');
    pegarEndpoint(true, PESQUISAR);
    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  it('Testa a função pegarEndpoint para bebidas', () => {
    renderWithRouter(<SearchBar />);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeVisible();

    const botaoPesquisar = screen.getByTestId('exec-search-btn');
    expect(botaoPesquisar).toBeVisible();

    const PESQUISAR = 'teste';
    expect(() => pegarEndpoint(false, PESQUISAR)).toThrow();

    const primeiroRadio = screen.getByTestId('ingredient-search-radio');
    userEvent.click(primeiroRadio);
    expect(pegarEndpoint(false, PESQUISAR)).toBe(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${PESQUISAR}`);

    const segundoRadio = screen.getByTestId('name-search-radio');
    userEvent.click(segundoRadio);
    expect(pegarEndpoint(false, PESQUISAR)).toBe(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${PESQUISAR}`);

    const terceiroRadio = screen.getByTestId('first-letter-search-radio');
    userEvent.click(terceiroRadio);
    expect(pegarEndpoint(false, 'A')).toBe('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=A');
    pegarEndpoint(true, PESQUISAR);
    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  it('Verificar se chama o fetch com meals', async () => {
    const produtos = {
      meals: [
        { id: '1', name: 'teste1' },
        { id: '2', name: 'teste2' },
      ],
    };

    /*    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(produtos),
    })); */
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(produtos),
    });

    // Test the method pegarListaDeProdutos
    await expect(pegarListaDeProdutos('url', true)).resolves.toEqual(produtos.meals);
    // await expect(Promise.resolve('lemon')).resolves.toBe('lemon');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('url');
  });

  it('Verificar se chama o fetch com meals', async () => {
    const produtos = {
      drinks: [
        { id: '1', name: 'teste1' },
        { id: '2', name: 'teste2' },
      ],
    };

    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(produtos),
    }));
    /*    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(produtos),
    }); */

    // Test the method pegarListaDeProdutos
    await expect(pegarListaDeProdutos('url', false)).resolves.toEqual(produtos.drinks);
    // await expect(Promise.resolve('lemon')).resolves.toBe('lemon');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('url');
  });
});
