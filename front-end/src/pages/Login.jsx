import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../assets/logo.png';
import { validateEmail, validatePassword } from '../helpers/validationForm';
import login from '../services/APIlogin';

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidForm, setIsValidForm] = useState(false);
  const [errorLoginMessage, setErrorLoginMessage] = useState(false);

  function handleValidadeForm() {
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);
    const isValid = isValidEmail && isValidPassword;
    setIsValidForm(isValid);
    setErrorLoginMessage(false);
  }

  async function handleSubmitLogin(e) {
    try {
      e.preventDefault();
      const { data } = await login(email, password);
      const userData = {
        email: data.email,
        name: data.name,
        role: data.role,
        token: data.token,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      if (userData.role === 'seller') history.push('/seller/orders');
      if (userData.role === 'customer') history.push('/customer/products');
    } catch (error) {
      setErrorLoginMessage(true);
    }
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
            onClick={ () => history.push('/register') }
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
            Email e/ou senha inválidos
          </p>
        )}
      </div>
    </div>
  );
}
