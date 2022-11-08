import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  function handleToLogout() {
    localStorage.clear();
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
        <Link
          to="/"
          data-testid="customer_products__element-navbar-link-logout"
        >
          <button type="button" onClick={ handleToLogout }>
            Sair
          </button>
        </Link>
      </div>
    </nav>
  );
}
