import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  function handleToLogout() {
    localStorage.clear();
  }

  const username = 'fi do biu';
  return (
    <nav>
      <div>
        <Link
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS
        </Link>
        <Link
          to="/customer/orders"
          data-testid="customer_products__element-navbar-link-orders"
        >
          MEUS PEDIDOS
        </Link>

      </div>
      <div data-testid="customer_products__element-navbar-user-full-name">
        <div>
          { username}
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
