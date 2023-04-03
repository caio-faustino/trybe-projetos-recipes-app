import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Receitas from './pages/Receitas';
import Drinks from './pages/Drinks';
import Receita from './pages/Receita';
import MealInProgress from './pages/MealInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
import Drink from './pages/Drink';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/drinks/:id/in-progress" component={ DrinkInProgress } />
      <Route exact path="/drinks/:id" component={ Drink } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/meals/:id/in-progress" component={ MealInProgress } />
      <Route exact path="/meals/:id" component={ Receita } />
      <Route exact path="/meals" component={ Receitas } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
