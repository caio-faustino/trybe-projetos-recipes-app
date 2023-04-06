import { act, render, screen } from '@testing-library/react';
import { Categories } from '../components/Categories';
import { fetchCategories } from '../util/fetchCategories';

async function testarChave(CATEGORIA_MOCK, chave) {
  const resultado = await CATEGORIA_MOCK;
  const { length } = resultado[chave];
  expect(screen.getAllByTestId(/-category-filter/).length).toBe(length);
  for (let i = 0; i < length; i += 1) {
    const { strCategory } = resultado[chave][i];
    const botao = screen.getByTestId(`${strCategory}-category-filter`);
    expect(botao).toBeInTheDocument();
  }
}

describe('Testa o elemento Categories', () => {
  it('Categorias de refeições', async () => {
    const CATEGORIA_MOCK = Promise.resolve({
      meals: [
        { strCategory: 'Cat1' },
        { strCategory: 'Cat2' },
        { strCategory: 'Cat3' },
      ],
    });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn(() => CATEGORIA_MOCK),
    });

    render(<Categories isMeal />);
    await act(async () => {
      await CATEGORIA_MOCK;
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');

    const chave = 'meals';
    await testarChave(CATEGORIA_MOCK, chave);
  });

  it('Categorias de bebidas', async () => {
    const CATEGORIA_MOCK = Promise.resolve({
      drinks: [
        { strCategory: 'Cat1' },
        { strCategory: 'Cat2' },
        { strCategory: 'Cat3' },
      ],
    });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn(() => CATEGORIA_MOCK),
    });

    render(<Categories isMeal={ false } />);
    await act(async () => {
      await CATEGORIA_MOCK;
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');

    const chave = 'drinks';
    await testarChave(CATEGORIA_MOCK, chave);
  });

  it('Edge case 1', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn(),
    });

    expect(await fetchCategories(true)).toEqual([]);
    expect(await fetchCategories(false)).toEqual([]);
  });

  it('Edge case 2', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn(() => ({})),
    });

    expect(await fetchCategories(true)).toEqual([]);
    expect(await fetchCategories(false)).toEqual([]);
  });

  it('Edge case 3', async () => {
    const FALHA_MSG = 'Falhei rude';
    const FALHA_REGEX = /Falhei rude/i;
    const falhaFn = () => Promise.reject(FALHA_MSG);
    global.fetch = jest.fn(falhaFn);
    act(() => {
      render(<Categories isMeal />);
    });
    await act(async () => {
      await falhaFn;
    });

    expect(screen.getByText(FALHA_REGEX)).toBeVisible();
  });
});
