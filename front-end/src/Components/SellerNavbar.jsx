import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function Navbar() {
  const history = useHistory();

  function handleToLogout() {
    localStorage.clear();
    history.push('/');
  }

  const userData = JSON.parse(localStorage.getItem('user'));
  return (
    <nav>
      <div>
        <Link
          to="/seller/orders"
          data-testid="customer_products__element-navbar-link-orders"
        >
          PEDIDOS
        </Link>
      </div>
      <div data-testid="customer_products__element-navbar-user-full-name">
        <div>
          { userData.name }
        </div>
      </div>
      <button
        type="button"
        onClick={ handleToLogout }
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </button>
    </nav>
  );
}
