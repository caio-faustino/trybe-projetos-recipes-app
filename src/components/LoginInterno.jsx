import React from 'react';
import { useHistory } from 'react-router-dom';
import { useLocalStorage } from '../useLocalStorage';

function LoginInterno({ disabled, handleChange, email, password }) {
  const history = useHistory();
  const [, setUser] = useLocalStorage('user', { email: '' });

  return (
    <form
      className="space-y-4 md:space-y-6"
      onSubmit={ (e) => {
        e.preventDefault();
        setUser({ email });
        history.push('/meals');
      } }
    >
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          placeholder="name@domain.com"
          name="login"
          id="login"
          className="email-input"
          data-testid="email-input"
          value={ email }
          onChange={ handleChange }
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          data-testid="password-input"
          value={ password }
          onChange={ handleChange }
          placeholder="••••••••"
          className="email-input"
          required=""
        />
      </div>
      <button
        type="submit"
        className="botaoPadrao"
        data-testid="login-submit-btn"
        disabled={ disabled }
      >
        Sign In
      </button>
    </form>
  );
}

LoginInterno.propTypes = { }.isRequired;

export default React.memo(LoginInterno);
