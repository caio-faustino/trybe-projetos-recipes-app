import React from 'react';

function Login() {
  return (
    <form>
      <input
        type="email"
        placeholder="email"
        name="login"
        id="login"
        data-testid="email-input"
      />
      <input
        type="password"
        name="password"
        id="password"
        data-testid="password-input"
      />
      <button
        type="submit"
        data-testid="login-submit-btn"
      >
        ENTER
      </button>
    </form>
  );
}

export default React.memo(Login);
