import React from 'react';
import { useHistory } from 'react-router-dom';
import { useLocalStorage } from '../useLocalStorage';

const passwordMinLength = 7;

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();
  const [, setUser] = useLocalStorage('user', { email: '' });

  const disabled = !email.match(/\S+@\S+\.\S+/)
      || password.length < passwordMinLength;

  const handleChange = ({ target }) => {
    const { id, value } = target;
    if (id === 'login') {
      setEmail(value);
    }
    if (id === 'password') {
      setPassword(value);
    }
  };

  return (
    <form
      onSubmit={ (e) => {
        e.preventDefault();
        // if (disabled) return;
        setUser({ email });
        history.push('/meals');
      } }
    >
      <input
        type="email"
        placeholder="email"
        name="login"
        id="login"
        data-testid="email-input"
        value={ email }
        onChange={ handleChange }
      />
      <input
        type="password"
        name="password"
        id="password"
        data-testid="password-input"
        value={ password }
        onChange={ handleChange }
      />
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ disabled }
      >
        ENTER
      </button>
    </form>
  );
}

export default React.memo(Login);
