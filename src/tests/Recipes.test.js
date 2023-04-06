import Recipes from '../pages/Recipes';
import { renderWithRouter } from './renderWith';

describe('Recipes', () => {
  it('should render the recipes', async () => {
    renderWithRouter(<Recipes />);
  });
});
