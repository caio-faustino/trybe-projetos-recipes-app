import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './renderWith';
import fetchMock from '../../cypress/mocks/fetch';
import App from '../App';
import { CHAVE_FAVORITOS } from '../components/ProvedorFavoritos';
import oneMeal from '../../cypress/mocks/oneMeal';
import { novoFavorito } from '../components/BtnLike';

describe('Favorites', () => {
  beforeEach(() => {
    global.fetch = fetchMock;

    const storage = new Map();
    global.LSlength = () => storage.size;
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem')
      .mockImplementation((key) => storage.get(key) || null);
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
      .mockImplementation((key, value) => { storage.set(key, value); });
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'clear')
      .mockImplementation(() => storage.clear());
    localStorage.removeItem = jest.fn().mockImplementation((key) => storage.delete(key));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('função novoFavorito', () => {
    const receita = oneMeal.meals[0];

    const novo = novoFavorito(receita);

    expect(novo).toEqual({
      id: (receita.idMeal) ? receita.idMeal : receita.idDrink,
      type: (receita.idMeal) ? 'meal' : 'drink',
      nationality: (receita.strArea) ? receita.strArea : '',
      category: receita.strCategory,
      alcoholicOrNot: (receita.strAlcoholic) ? receita.strAlcoholic : '',
      name: (receita.strMeal) ? receita.strMeal : receita.strDrink,
      image: (receita.strMealThumb) ? receita.strMealThumb : receita.strDrinkThumb,
    });
  });

  it('should be able to add and delete a favorite', async () => {
    // localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify([]));
    renderWithRouter(<App />, { initialEntries: ['/meals/52771'] });
    await act(async () => {});

    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(favoriteBtn).toBeVisible();
    const ARIA_PRESSED = 'aria-pressed';
    expect(favoriteBtn).toHaveAttribute(ARIA_PRESSED, 'false');
    expect(localStorage.getItem(CHAVE_FAVORITOS)).toBeNull();
    expect(LSlength()).toBe(0);

    userEvent.click(favoriteBtn);
    await act(async () => {});
    expect(favoriteBtn).toHaveAttribute(ARIA_PRESSED, 'true');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(JSON.parse(localStorage.getItem(CHAVE_FAVORITOS))[0])
      .toEqual(novoFavorito(oneMeal.meals[0]));
    // console.log(localStorage.getItem(CHAVE_FAVORITOS));
    expect(LSlength()).toBe(1);

    userEvent.click(favoriteBtn);
    // await act(async () => {});
    expect(favoriteBtn).toHaveAttribute(ARIA_PRESSED, 'false');
    expect(localStorage.getItem(CHAVE_FAVORITOS)).toBe('[]');
  });
});
