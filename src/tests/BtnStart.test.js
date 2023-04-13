import userEvent from '@testing-library/user-event';
import { act, screen } from '@testing-library/react';
import { renderWithRouter } from './renderWith';
import App from '../App';

describe('Component BtnStart', () => {
  it('Renderiza', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks/178319'] });
    // await act(async () => {});

    {
      const btn = await screen.findByTestId('start-recipe-btn');
      expect(btn).toBeVisible();
      expect(btn).toHaveTextContent('Start Recipe');
      userEvent.click(btn);
      await act(async () => {});
    }

    renderWithRouter(<App />, { initialEntries: ['/drinks/178319'] });
    {
      const btn = await screen.findByTestId('start-recipe-btn');
      expect(btn).toBeVisible();
      expect(btn).toHaveTextContent('Continue Recipe');
      userEvent.click(btn);
      await act(async () => {});
    }
  });
});
