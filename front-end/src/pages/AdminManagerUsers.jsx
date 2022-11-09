import React, { useState, useEffect } from 'react';

import SellerNavbar from '../Components/SellerNavbar';

import {
  validateEmail,
  validatePassword,
  validateUsername,
} from '../helpers/validationForm';

export default function Checkout() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [isValidFormBtn, setIsValidFormBtn] = useState(false);
  // const [errorRegisterMessage, setErrorRegisterMessage] = useState(false);
  // const [sales, setSales] = useState([]);

  // const renderSaleBox = () => {
  //   const salesBox = sales.map((sale) => {
  //     const { id, totalPrice, deliveryAddress, deliveryNumber, saleDate, status } = sale;
  //     return (<SaleBox
  //       key={ id }
  //       id={ id }
  //       totalPrice={ totalPrice }
  //       deliveryAddress={ deliveryAddress }
  //       deliveryNumber={ deliveryNumber }
  //       saleDate={ moment(saleDate).format('L') }
  //       status={ status }
  //     />);
  //   });
  //   return salesBox;
  // };

  useEffect(() => {
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
        <h1>Lista de usuários</h1>
      </div>
    </div>
  );
}

// - 69: admin_manage__element-user-table-item-number-<index>
// - 70: admin_manage__element-user-table-name-<index>
// - 71: admin_manage__element-user-table-email-<index>
// - 72: admin_manage__element-user-table-role-<index>
// - 73: admin_manage__element-user-table-remove-<index>
// - 74: admin_manage__element-invalid-register [Elemento oculto (Mensagens de erro)]
