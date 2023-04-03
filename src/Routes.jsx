import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Receitas from './pages/Receitas';

export default function Routes() {
  return (
    <Switch>
      <Route path="/meals" component={ Receitas } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
