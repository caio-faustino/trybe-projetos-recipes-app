import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './renderWith';

describe('Teste do componente Login', () => {
  const idEmailInput = 'email-input';
  const idPasswordInput = 'password-input';
  const idBotaoEnter = 'login-submit-btn';
  const emailDeTeste = 'oi@gmail.com';

  test('Existência dos componentes', () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId(idEmailInput);
    expect(email).toBeVisible();

    const password = screen.getByTestId(idPasswordInput);
    expect(password).toBeVisible();

    const botaoEnter = screen.getByTestId(idBotaoEnter);
    expect(botaoEnter).toBeVisible();
    expect(botaoEnter).toBeDisabled();
  });

  test('Enviar login', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId(idEmailInput);
    const password = screen.getByTestId(idPasswordInput);
    const botaoEnter = screen.getByTestId(idBotaoEnter);

    userEvent.type(email, emailDeTeste);
    expect(botaoEnter).toBeDisabled();

    userEvent.type(password, '123456');
    expect(botaoEnter).toBeDisabled();

    userEvent.type(password, '1234567');
    expect(botaoEnter).toBeEnabled();

    userEvent.click(botaoEnter);
    expect(history.location.pathname).toBe('/receitas');

    // Testa se salvou no LocalStorage
    const emailLS = localStorage.getItem('user');
    const emailLido = JSON.parse(emailLS);
    expect(emailLido.email).toBe(emailDeTeste);
  });

  test('Clica no botão desabilitado', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId(idEmailInput);
    const password = screen.getByTestId(idPasswordInput);
    const botaoEnter = screen.getByTestId(idBotaoEnter);

    userEvent.type(email, emailDeTeste);
    expect(botaoEnter).toBeDisabled();

    userEvent.type(password, '123456');
    expect(botaoEnter).toBeDisabled();

    userEvent.click(botaoEnter);
    expect(history.location.pathname).toBe('/');
  });
});
