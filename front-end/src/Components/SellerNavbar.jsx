import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

export default function Navbar({ title }) {
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
          { title }
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

Navbar.propTypes = {
  title: PropTypes.string,
}.isRequired;
