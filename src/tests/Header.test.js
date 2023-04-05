import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './renderWith';
import Header from '../Header';

const idPageTitle = 'page-title';
const tituloDaPagina = 'Comidas';
const idIconeProfile = 'profile-top-btn';
const idIconePesquisa = 'search-top-btn';
describe('Header', () => {
  it('renders the correct title without icons', () => {
    renderWithRouter(<Header title="Comidas" />);

    const pageTitle = screen.getByTestId(idPageTitle);
    expect(pageTitle).toBeVisible();
    expect(pageTitle).toHaveTextContent(tituloDaPagina);

    const avatarEl = screen.queryByTestId(idIconeProfile);
    expect(avatarEl).toBeNull();

    const searchEl = screen.queryByTestId(idIconePesquisa);
    expect(searchEl).toBeNull();
  });

  it('renders the correct title with iconeProfile', () => {
    renderWithRouter(<Header title="Comidas" iconeProfile />);

    const pageTitle = screen.getByTestId(idPageTitle);
    expect(pageTitle).toBeVisible();
    expect(pageTitle).toHaveTextContent(tituloDaPagina);

    const avatarEl = screen.queryByTestId(idIconeProfile);
    expect(avatarEl).toBeInTheDocument();

    const searchEl = screen.queryByTestId(idIconePesquisa);
    expect(searchEl).toBeNull();
  });

  it('renders the correct title with searchProfile', () => {
    renderWithRouter(<Header title="Comidas" iconeSearch />);

    const pageTitle = screen.getByTestId(idPageTitle);
    expect(pageTitle).toBeVisible();
    expect(pageTitle).toHaveTextContent(tituloDaPagina);

    const avatarEl = screen.queryByTestId(idIconeProfile);
    expect(avatarEl).toBeNull();

    const searchEl = screen.queryByTestId(idIconePesquisa);
    expect(searchEl).toBeInTheDocument();
  });

  it('Shows the search input when the search icon is clicked', () => {
    renderWithRouter(<Header title="Comidas" iconeSearch />);

    const botaoPesquisar = screen.queryByTestId(idIconePesquisa);
    expect(botaoPesquisar).toBeInTheDocument();

    const SEARH_INPUT = 'search-input';
    {
      const searchInput = screen.queryByTestId(SEARH_INPUT);
      expect(searchInput).toBeNull();
    }
    {
      userEvent.click(botaoPesquisar);
      const searchInput = screen.queryByTestId(SEARH_INPUT);
      expect(searchInput).toBeInTheDocument();
    }
    {
      userEvent.click(botaoPesquisar);
      const searchInput = screen.queryByTestId(SEARH_INPUT);
      expect(searchInput).toBeNull();
    }
  });
});
