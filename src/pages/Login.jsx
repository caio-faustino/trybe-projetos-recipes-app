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
            + 'px-6 py-8 mx-auto md:h-screen lg:py-0' }
      >
        <p
          className={ 'flex items-center mb-6 text-2xl font-semibold '
                + 'text-gray-900 dark:text-white' }
        >
          Recipes
        </p>
        <div
          className={ 'w-full bg-white rounded-lg shadow dark:border '
              + 'md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700' }
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              className={ 'text-xl font-bold leading-tight tracking-tight '
                  + 'text-gray-900 md:text-2xl dark:text-white' }
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
