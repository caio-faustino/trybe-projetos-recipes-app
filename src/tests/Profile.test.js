import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './renderWith';
import Profile from '../pages/Profile';

const emailInput = 'email-input';
const passwordInput = 'password-input';
const loginInput = 'login-submit-btn';
const profileTopButton = 'profile-top-btn';
const validateEmail = 'emaile@mail.com';

describe('Testa a página Profile', () => {
  it('Testa a renderização dos componentes', () => {
    renderWithRouter(<Profile />);

    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const login = screen.getByTestId(loginInput);
    const profileTopBtn = screen.getByTestId(profileTopButton);

    userEvent.type(email, validateEmail);
    userEvent.type(password, '123456');
    userEvent.click(login);
    userEvent.click(profileTopBtn);

    const profileHeader = screen.getByRole('heading', { name: 'Profile' });
    const profileEmail = screen.getByTestId('profile-email');
    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');
    const logoutBtn = screen.getByTestId('profile-logout-btn');

    expect(profileHeader).toBeInTheDocument();
    expect(profileEmail).toBeInTheDocument();
    expect(doneRecipesBtn).toBeInTheDocument();
    expect(favoriteRecipesBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  it('Testa o redirecionamento do botão Done Recipes', () => {
    const initialEntries = ['/profile'];
    const { history } = renderWithRouter(<App />, { initialEntries });

    const profileHeader = screen.getByRole('heading', { name: 'Profile' });
    expect(profileHeader).toBeVisible();

    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    expect(doneRecipesBtn).toBeInTheDocument();

    userEvent.click(doneRecipesBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');

    const doneRecipesHeader = screen.getByRole('heading', { name: 'Done Recipes' });
    expect(doneRecipesHeader).toBeVisible();
    expect(screen.queryByRole('heading', { name: 'Profile' })).not.toBeInTheDocument();
  });

  it('Testa o redirecionamento do botão Favorite Recipes', () => {
    const initialEntries = ['/profile'];
    const { history } = renderWithRouter(<App />, { initialEntries });

    const profileHeader = screen.getByRole('heading', { name: 'Profile' });
    expect(profileHeader).toBeVisible();

    const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');
    expect(favoriteRecipesBtn).toBeInTheDocument();

    userEvent.click(favoriteRecipesBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');

    const favoriteRecipesHeader = screen.getByRole('heading', { name: 'Favorite Recipes' });
    expect(favoriteRecipesHeader).toBeVisible();
    expect(screen.queryByRole('heading', { name: 'Profile' })).not.toBeInTheDocument();
  });

  it('Testa o redirecionamento do botão Logout para Login', () => {
    const initialEntries = ['/profile'];
    const { history } = renderWithRouter(<App />, { initialEntries });

    const profileHeader = screen.getByRole('heading', { name: 'Profile' });
    expect(profileHeader).toBeVisible();

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();

    userEvent.click(logoutBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const loginHeader = screen.getByRole('heading', { name: 'Login' });
    expect(loginHeader).toBeVisible();
    expect(screen.queryByRole('heading', { name: 'Profile' })).not.toBeInTheDocument();
  });

  it('Testa a renderização correta quando não há usuário logado', () => {
    localStorage.clear();
    const { container } = renderWithRouter(<Profile />);
  
    expect(screen.queryByTestId('profile-email')).not.toBeInTheDocument();
    expect(container.querySelector('h1')).toHaveTextContent('Página não encontrada');
  });

  it('Testa a renderização correta quando o usuário logado não possui e-mail', () => {
    localStorage.setItem('user', JSON.stringify({}));
  
    const { container } = renderWithRouter(<Profile />);
  
    expect(screen.queryByTestId('profile-email')).not.toBeInTheDocument();
    expect(container.querySelector('h1')).toHaveTextContent('Página não encontrada');
  });
});
