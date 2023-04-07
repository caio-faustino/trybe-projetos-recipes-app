import { act, screen } from '@testing-library/react';
import { Categories } from '../components/Categories';
import { fetchCategories, headersJson } from '../util/fetchers';
import { mockarFetch, mockarFetchComErro } from '../util/mockadores';
import { renderWithRouter } from './renderWith';

async function testarChave(CATEGORIA_MOCK, chave) {
  const resultado = CATEGORIA_MOCK;
  const { length } = resultado[chave];
  expect(screen.getAllByTestId(/-category-filter/).length).toBe(length);
  for (let i = 0; i < length; i += 1) {
    const { strCategory } = resultado[chave][i];
    const botao = screen.getByTestId(`${strCategory}-category-filter`);
    expect(botao).toBeInTheDocument();
  }
}

describe('Testa o elemento Categories', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Categorias de comidas', async () => {
    const CATEGORIA_MOCK = { meals: [
      { strCategory: 'Cat1' },
      { strCategory: 'Cat2' },
      { strCategory: 'CatEEEEE4' },
    ] };

    mockarFetch(CATEGORIA_MOCK);

    renderWithRouter(<Categories isMeal />);
    await act(async () => { });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list', headersJson);

    const chave = 'meals';
    await testarChave(CATEGORIA_MOCK, chave);
  });

  it('Categorias de bebidas', async () => {
    const CATEGORIA_MOCK = { drinks: [
      { strCategory: 'Cat1' },
      { strCategory: 'Cat2' },
      { strCategory: 'Cat5' },
    ] };

    mockarFetch(CATEGORIA_MOCK);

    renderWithRouter(<Categories />);
    await act(async () => { });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', headersJson);

    const chave = 'drinks';
    await testarChave(CATEGORIA_MOCK, chave);
  });

  it('Edge case 1', async () => {
    mockarFetch(() => {});

    expect(await fetchCategories(true)).toEqual([]);
    expect(await fetchCategories(false)).toEqual([]);
  });

  it('Edge case 2', async () => {
    mockarFetch({});

    expect(await fetchCategories(true)).toEqual([]);
    expect(await fetchCategories(false)).toEqual([]);
  });

  it('Falha na busca de categorias 1', async () => {
    const FALHA_MSG = 'Falhei rude';

    mockarFetchComErro(FALHA_MSG);

    await expect(() => fetchCategories(true)).rejects.toThrow(new Error(FALHA_MSG));
  });

  it('Falha na busca de categorias 2', async () => {
    const FALHA_MSG = 'Falhei rude';
    const FALHA_REGEX = /Falhei rude/i;

    mockarFetchComErro(FALHA_MSG);
    renderWithRouter(<Categories isMeal />);

    const textoFalha = await screen.findByText(FALHA_REGEX);
    expect(textoFalha).toBeVisible();
  });

  it('Edge case 4', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      json: jest.fn(() => ({})),
    });

    expect(await fetchCategories(true)).toEqual([]);
    expect(await fetchCategories(false)).toEqual([]);
  });

  it('Edge case 5', async () => {
    const CATEGORIA_MOCK = Promise.resolve({
      meals: [
        { strCategory: 'Cat1' },
        { strCategory: 'Cat2' },
        { strCategory: 'Cat8' },
        { strCategory: 'Cat4' },
        { strCategory: 'Cat5' },
        { strCategory: 'Cat6' },
        { strCategory: 'Cat7' },
      ],
    });
    const EXPECTED_RETURN = [
      { strCategory: 'Cat1' },
      { strCategory: 'Cat2' },
    ];

    mockarFetch(CATEGORIA_MOCK);

    const len = EXPECTED_RETURN.length;
    const retornado = await fetchCategories(true, len);

    expect(retornado).toHaveLength(len);
    expect(retornado).toEqual(EXPECTED_RETURN);
  });
});
