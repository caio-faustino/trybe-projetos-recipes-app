import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouter } from './renderWith';
import App from '../App';
import { mockarLocalStorage } from './DoneRecipes.test';

describe('Testa o componente Profile', () => {
  beforeEach(() => {
    mockarLocalStorage(new Map());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Clica no botão Done Recipes', () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const botao = screen.getByTestId('profile-done-btn');
    expect(botao).toBeVisible();
    userEvent.click(botao);
  });

  it('Clica no botão Favorite Recipes', () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const botao = screen.getByTestId('profile-favorite-btn');
    expect(botao).toBeVisible();
    userEvent.click(botao);
  });

  it('Clica no botão Logout', () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const botao = screen.getByTestId('profile-logout-btn');
    expect(botao).toBeVisible();
    userEvent.click(botao);
  });

  it('Testa se o email está correto', () => {
    const email = 'lacoste@doben.org';
    localStorage.setItem('user', JSON.stringify({ email }));
    renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const emailElement = screen.getByTestId('profile-email');
    expect(emailElement).toBeVisible();
    expect(emailElement).toHaveTextContent(email);
  });
});
