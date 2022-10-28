import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidForm, setIsValidForm] = useState(false);
  const [errorLoginMessage, setErrorLoginMessage] = useState(false);

  function handleValidadeForm() {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const minLengthPass = 6;
    const validadeEmail = regexEmail.test(email);
    const validadePass = password.length >= minLengthPass;
    const isValid = validadeEmail && validadePass;
    setIsValidForm(isValid);
    setErrorLoginMessage(false);
  }

  function handleSubmitLogin(e) {
    e.preventDefault();
    setErrorLoginMessage(true);
  }

  useEffect(() => {
    handleValidadeForm();
  }, [email, password]);

  return (
    <div>
      <div>
        <img src={ logo } alt="" />
        <p>Ze delivery</p>
      </div>
      <div>
        <form onSubmit={ (e) => handleSubmitLogin(e) }>
          <label htmlFor="email">
            Login
            <input
              type="email"
              id="email"
              name="email"
              data-testid="common_login__input-email"
              value={ email }
              onChange={ ({ target }) => setEmail(target.value) }
            />
          </label>

          <label htmlFor="password">
            Senha
            <input
              type="password"
              id="password"
              name="password"
              data-testid="common_login__input-password"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
            />
          </label>

          <button
            type="submit"
            data-testid="common_login__button-login"
            disabled={ !isValidForm }
          >
            Login
          </button>
          <button
            type="button"
            data-testid="common_login__button-register"
          >
            Ainda não tenho conta
          </button>
        </form>
      </div>
      <div>
        {errorLoginMessage && (
          <p
            data-testid="common_login__element-invalid-email"
          >
            Email ou senha mal formatados
          </p>
        )}
      </div>
    </div>
  );
}
