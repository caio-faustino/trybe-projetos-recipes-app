import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import ProvedorFavoritos from './components/ProvedorFavoritos';
import RecipeInProgress from './pages/RecipeInProgress';

export default function Routes() {
  return (
    <ProvedorFavoritos>
      <Switch>
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </ProvedorFavoritos>
  );
}
