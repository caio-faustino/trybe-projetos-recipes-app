import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from './renderWith';
import mealIcon from '../images/mealIcon.svg';
import { RecipeCardDone } from '../components/RecipeCardDone';
import localStorage from '../helpers/LocalStorage';
import DoneRecipes, { CHAVE_DONE } from '../pages/DoneRecipes';

export function mockarLocalStorage(storage) {
  global.LSlength = () => storage.size;
  jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem')
    .mockImplementation((key) => storage.get(key) || null);
  jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
    .mockImplementation((key, value) => { storage.set(key, value); });
  jest.spyOn(Object.getPrototypeOf(window.localStorage), 'clear')
    .mockImplementation(() => storage.clear());
  localStorage.removeItem = jest.fn().mockImplementation((key) => storage.delete(key));
}

describe('Testing DoneRecipes component', () => {
  beforeEach(() => {
    mockarLocalStorage(new Map());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const cardMOCKID = '0-recipe-card';

  const nameMOCKID = '0-horizontal-name';
  const nameMOCK = 'test_name';

  const categoriaMOCKID = '0-horizontal-top-text';
  const categoriaMOCK = 'test_categoria';

  const imageMOCKID = '0-horizontal-image';
  const imgMOCK = mealIcon;

  const tagMOCK = 'test_tag';
  const tagMOCKID = `0-${tagMOCK}-horizontal-tag`;

  const mockRecipe = {
    name: nameMOCK,
    image: imgMOCK,
    categoria: categoriaMOCK,
    index: 0,
    tags: [tagMOCK],
  };

  it('Testa se o componente possui todos seus elementos visiveis', () => {
    window.localStorage.setItem(CHAVE_DONE, JSON.stringify([mockRecipe]));

    renderWithRouter(<DoneRecipes { ...mockRecipe } />);

    const title = screen.getByTestId('page-title');
    expect(title).toBeVisible();
    expect(title).toHaveTextContent('Done Recipes');

    const allBtn = screen.getByTestId('filter-by-all-btn');
    expect(allBtn).toBeVisible();
    userEvent.click(allBtn);

    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    expect(mealBtn).toBeVisible();
    userEvent.click(mealBtn);

    const drinkBtn = screen.getByTestId('filter-by-drink-btn');
    expect(drinkBtn).toBeVisible();
    userEvent.click(drinkBtn);
  });

  it('Testing RecipeCardDone component', () => {
    renderWithRouter(<RecipeCardDone { ...mockRecipe } />);

    const card = screen.getByTestId(cardMOCKID);
    expect(card).toBeVisible();

    const name = screen.getByTestId(nameMOCKID);
    expect(name).toBeVisible();
    expect(name).toHaveTextContent(nameMOCK);

    const categoria = screen.getByTestId(categoriaMOCKID);
    expect(categoria).toBeVisible();
    expect(categoria).toHaveTextContent(categoriaMOCK);

    const imagem = screen.getByTestId(imageMOCKID);
    expect(imagem).toBeVisible();
    expect(imagem).toHaveAttribute('src', imgMOCK);

    const tag = screen.getByTestId(tagMOCKID);
    expect(tag).toBeVisible();
    expect(tag).toHaveTextContent(tagMOCK);

    const share = screen.getByTestId('0-horizontal-share-btn');
    expect(share).toBeVisible();
    // userEvent.click(share);
  });
});
