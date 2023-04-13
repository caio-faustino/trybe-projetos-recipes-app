import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchCategories } from '../util/fetchers';
import { mockarFetch, mockarFetchComErro } from '../util/mockadores';
import { renderWithRouter } from './renderWith';
import App from '../App';
import { Categories } from '../components/Categories';

describe('Testa o componente RecipeInProgress', () => {
  it('Renderiza', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals/52771/in-progress'] });
    await act(async () => { });

    expect(await screen.findByTestId('recipe-photo')).toBeInTheDocument();
    expect(await screen.findByTestId('recipe-title')).toBeInTheDocument();
    expect(await screen.findByTestId('share-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('favorite-btn')).toBeInTheDocument();

    // Verifica se o botão se finalizar está desabilitado
    const btn = await screen.findByTestId('finish-recipe-btn');
    expect(btn).toBeDisabled();

    // Clica em cada um dos checkboxes
    const checkboxes = await screen.findAllByRole('checkbox');
    checkboxes.forEach((checkbox) => {
      expect(btn).toBeDisabled();
      userEvent.click(checkbox);
    });
    expect(btn).toBeEnabled();
    checkboxes.forEach((checkbox) => {
      userEvent.click(checkbox);
    });
    expect(btn).toBeDisabled();

    checkboxes.forEach((checkbox) => {
      userEvent.click(checkbox);
    });
    userEvent.click(btn);
  });
});
