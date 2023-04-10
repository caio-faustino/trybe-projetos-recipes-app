import { screen } from '@testing-library/react';
import { renderWithRouter } from './renderWith';

import mealIcon from '../images/mealIcon.svg';
import RecipeCard from '../components/RecipeCard';

describe('Testing RecipeCard component', () => {
  const cardMOCKID = '0-recipe-card';
  const nameMOCKID = '0-card-name';
  const imageMOCKID = '0-card-img';
  const nameMOCK = 'test_name';
  const imgMOCK = mealIcon;

  it('Testa se o componente possui todos seus elementos visiveis', () => {
    renderWithRouter(<RecipeCard name={ nameMOCK } image={ imgMOCK } index={ 0 } />);

    expect(screen.getByTestId(cardMOCKID)).toBeVisible();
    expect(screen.getByTestId(nameMOCKID)).toBeVisible();
    expect(screen.getByTestId(imageMOCKID)).toBeVisible();
  });

  it('Testa se o componente possui seus valores corretos', () => {
    renderWithRouter(<RecipeCard name={ nameMOCK } image={ imgMOCK } index={ 0 } />);

    expect(screen.getByTestId(cardMOCKID)).toBeInTheDocument();
    expect(screen.getByTestId(nameMOCKID).innerHTML).toBe(nameMOCK);
    expect(screen.getByAltText(nameMOCK)).toBeInTheDocument();
  });
});
