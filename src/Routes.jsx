import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import MealInProgress from './pages/MealInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import ProvedorFavoritos from './components/ProvedorFavoritos';

export default function Routes() {
  return (
    <ProvedorFavoritos>
      <Switch>
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/drinks/:id/in-progress" component={ DrinkInProgress } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/meals/:id/in-progress" component={ MealInProgress } />
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </ProvedorFavoritos>
  );
}
