import * as ToggleGroup from '@radix-ui/react-toggle-group';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useLocalStorage } from '../useLocalStorage';

function ProfileButtonGroup() {
  const [button, setButton] = useLocalStorage('profileButton', 'profile');
  const history = useHistory();

  return (
    <ToggleGroup.Root
      className="inline-flex rounded-md shadow-sm"
      type="single"
      defaultValue="profile"
      aria-label="Links"
      value={ button }
      onValueChange={ (cat) => setButton(cat) }
    >
      <ToggleGroup.Item
        className="primeiroBotao"
        value="profile"
        aria-label="Done Recipes"
        onClick={ () => history.push('/profile') }
      >
        Done Recipes
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className="botoesDoMeio"
        data-testid="profile-done-btn"
        value="done"
        aria-label="Done Recipes"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className="botoesDoMeio"
        data-testid="profile-favorite-btn"
        value="favorite"
        aria-label="Done Recipes"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className="ultimoBotao"
        data-testid="profile-logout-btn"
        value="logout"
        aria-label="Logout"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        Logout
      </ToggleGroup.Item>

    </ToggleGroup.Root>
  );
}

export default React.memo(ProfileButtonGroup);
