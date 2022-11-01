import React from 'react';
import PropTypes from 'prop-types';

export default function CardProduct({ id, cost, name, thumb }) {
  return (
    <div key={ id }>
      <div>
        <div data-testid={ `customer_products__element-card-price-${id}` }>
          {`R$ ${cost}`}
        </div>
        <img
          alt="drink"
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ thumb }
        />
      </div>
      <div>
        <div>
          <h3 data-testid={ `customer_products__element-card-title-${id}` }>
            { name }
          </h3>
        </div>
      </div>
      <div>
        <button
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
        >
          {' '}
          -
        </button>
        <input data-testid={ `customer_products__input-card-quantity-${id}` } />
        <button
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
        >
          {' '}
          +
        </button>
      </div>

    </div>
  );
}

CardProduct.propTypes = {
  id: PropTypes.string,
  key: PropTypes.string,
  name: PropTypes.string,
  cost: PropTypes.string,
  thumb: PropTypes.string,
}.isRequired;
