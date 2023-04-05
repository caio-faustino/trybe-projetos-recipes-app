import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Drinks from './pages/Drinks';
import MealInProgress from './pages/MealInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
import Drink from './pages/Drink';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import Recipe from './pages/Recipe';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/drinks/:id/in-progress" component={ DrinkInProgress } />
      <Route exact path="/drinks/:id" component={ Drink } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/meals/:id/in-progress" component={ MealInProgress } />
      <Route exact path="/meals/:id" component={ Recipe } />
      <Route exact path="/meals" component={ Recipes } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
