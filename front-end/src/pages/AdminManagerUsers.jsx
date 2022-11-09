import React, { useState, useEffect } from 'react';

import SellerNavbar from '../Components/SellerNavbar';
import UserBox from '../Components/UsersBox';

import {
  validateEmail,
  validatePassword,
  validateUsername,
} from '../helpers/validationForm';
import getAllUsers from '../services/getAllUsers';

export default function Checkout() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [isValidFormBtn, setIsValidFormBtn] = useState(false);
  const [users, setUsers] = useState([]);
  // const [errorRegisterMessage, setErrorRegisterMessage] = useState(false);
  // const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getAllUsers();
      setUsers(data);
    };

    fetchUser();
    const isValidUsername = validateUsername(name);
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);
    const isValidAll = isValidUsername && isValidEmail && isValidPassword;
    setIsValidFormBtn(isValidAll);
    // setErrorRegisterMessage(false);
  }, [name, email, password]);

  function handleSubmitRegister(e) {
    e.preventDefault();
    console.log(name, email, password, role);
  }

  return (
    <div>
      <SellerNavbar title="GERENCIAR USUÁRIOS" />
      <div>
        <h1>Cadastrar novo usuário</h1>
        <div className="message-error">Oculto</div>
        <form onSubmit={ (e) => handleSubmitRegister(e) }>
          <label htmlFor="name">
            Nome
            <input
              type="text"
              id="name"
              name="name"
              value={ name }
              onChange={ ({ target }) => setName(target.value) }
              data-testid="admin_manage__input-name"
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
              data-testid="admin_manage__input-email"
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
              data-testid="admin_manage__input-password"
            />
          </label>
          <select
            data-testid="admin_manage__select-role"
            onChange={ ({ target }) => setRole(target.value) }
            value={ role }
          >
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
            <option value="administrator">Administrator</option>
          </select>
          <button
            disabled={ !isValidFormBtn }
            type="submit"
            data-testid="admin_manage__button-register"
          >
            Cadastrar
          </button>
        </form>
      </div>
      <h1>Lista de usuários</h1>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <UserBox
              key={ index }
              index={ index }
              id={ user.id }
              name={ user.name }
              email={ user.email }
              role={ user.role }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
