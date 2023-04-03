import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './renderWith';

describe('Teste do componente Login', () => {
  test('Existência dos componentes', () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId('email-input');
    expect(email).toBeVisible();

    const password = screen.getByTestId('password-input');
    expect(password).toBeVisible();

    const botaoEnter = screen.getByTestId('login-submit-btn');
    expect(botaoEnter).toBeVisible();
    expect(botaoEnter).toBeDisabled();
  });

  test('Botão desabilitado', () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const botaoEnter = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'usuario@gmail.com');
    expect(botaoEnter).toBeDisabled();

    userEvent.type(password, '123456');
    expect(botaoEnter).toBeDisabled();

    userEvent.type(password, '1234567');
    expect(botaoEnter).toBeEnabled();
  });
});
