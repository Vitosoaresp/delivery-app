import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from '../helpers/validationForm';

export default function Register() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidFormBtn, setIsValidFormBtn] = useState(false);
  const [errorRegisterMessage, setErrorRegisterMessage] = useState(false);

  useEffect(() => {
    const isValidUsername = validateUsername(name);
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);
    const isValidAll = isValidUsername && isValidEmail && isValidPassword;
    setIsValidFormBtn(isValidAll);
    setErrorRegisterMessage(false);
  }, [name, email, password]);

  function handleSubmitRegister(e) {
    e.preventDefault();
    axios
      .post('http://localhost:3001/register', { name, email, password })
      .then((response) => {
        console.log(response.data);
        history.push('/customer/products');
      })
      .catch((error) => {
        console.log(error);
        setErrorRegisterMessage(true);
      });
  }

  return (
    <div>
      <div>
        <h1>Cadastro</h1>
      </div>
      <div>
        <form onSubmit={ (e) => handleSubmitRegister(e) }>
          <label htmlFor="name">
            Nome
            <input
              type="text"
              id="name"
              name="name"
              value={ name }
              onChange={ ({ target }) => setName(target.value) }
              data-testid="common_register__input-name"
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              name="email"
              value={ email }
              onChange={ ({ target }) => setEmail(target.value) }
              data-testid="common_register__input-email"
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              type="password"
              id="password"
              name="password"
              value={ password }
              onChange={ ({ target }) => setPassword(target.value) }
              data-testid="common_register__input-password"
            />
          </label>
          <button
            disabled={ !isValidFormBtn }
            type="submit"
            data-testid="common_register__button-register"
          >
            Cadastrar
          </button>
        </form>
        <div>
          {errorRegisterMessage && (
            <p data-testid="common_register__element-invalid_register">
              Usuário ou email já existe!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
