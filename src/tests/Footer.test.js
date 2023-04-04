import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from './renderWith';

import App from '../App';
import Footer from '../components/Footer';
// import { renderWithRouter } from './helpers/renderWith';

const drinksBottomBtn = 'drinks-bottom-btn';

describe('Testes do componente Footer', () => {
  test('Testa se o componente é renderizado corretamente na rota /meals', () => {
    renderWithRouter(<Footer />);

    const footerDrinksBtn = screen.getByTestId(drinksBottomBtn);
    const footerMealsBtn = screen.getByTestId('meals-bottom-btn');
    const footerMealsIcon = screen.getByRole('img', { name: 'icone de comida' });
    const footerDrinksIcon = screen.getByRole('img', { name: 'icone de bebida' });

    expect(footerDrinksBtn).toBeInTheDocument();
    expect(footerMealsBtn).toBeInTheDocument();
    expect(footerMealsIcon).toBeInTheDocument();
    expect(footerDrinksIcon).toBeInTheDocument();
    expect(footerMealsIcon).toHaveProperty('src', 'http://localhost/mealIcon.svg');
    expect(footerDrinksIcon).toHaveProperty('src', 'http://localhost/drinkIcon.svg');
  });
});
/* test('Testa se os icones do componente vão de forma correta para pagina página de /meals', () => {
  const initialEntries = ['/profile'];
  const { history } = renderWithRouter(<App />, { initialEntries });

  const profileHeader = screen.getByRole('heading', { name: 'Profile' });
  expect(profileHeader).toBeVisible();

  const footerMealsBtn = screen.getByTestId('meals-bottom-btn');
  expect(footerMealsBtn).toBeInTheDocument();

  userEvent.click(footerMealsBtn);

  const { pathname } = history.location;
  expect(pathname).toBe('/meals');

  const mealsHeader = screen.getByRole('heading', { name: 'Meals' });
  expect(mealsHeader).toBeVisible();
  expect(screen.queryByRole('heading', { name: 'Profile' })).not.toBeInTheDocument();
}); */
