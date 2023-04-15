import React from 'react';
import LoginInterno from '../components/LoginInterno';

const passwordMinLength = 7;

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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
    <section className="bg-gray-50 dark:bg-gray-900">
      <div
        className={ 'flex flex-col items-center justify-center '
        + 'mx-auto px-6 py-8 md:h-screen lg:py-0' }
      >
        <p
          className={ 'mb-6 flex items-center text-2xl font-semibold '
          + 'text-gray-900 dark:text-white' }
        >
          Recipes
        </p>
        <div
          className={ 'w-full rounded-lg bg-white shadow dark:border '
          + 'dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0' }
        >
          <div className="p-6 space-y-4 sm:p-8 md:space-y-6">
            <h1
              className={
                'text-xl font-bold leading-tight tracking-tight '
              + 'text-gray-900 dark:text-white md:text-2xl'
              }
            >
              Sign in to your account
            </h1>
            <LoginInterno
              email={ email }
              password={ password }
              handleChange={ handleChange }
              disabled={ disabled }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(Login);
