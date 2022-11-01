import PropTypes from 'prop-types';
import React, { useState } from 'react';

export default function CardProduct({ id, cost, name, thumb }) {
  const [quantity, setQuantity] = useState(0);

  return (
    <div key={ id }>
      <div>
        <div data-testid={ `customer_products__element-card-price-${id}` }>
          {cost.replace('.', ',')}
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
          onClick={ () => setQuantity(quantity > 0 ? quantity - 1 : 0) }
        >
          -
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          type="number"
          min="0"
          value={ quantity }
        />
        <button
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          onClick={ () => setQuantity(quantity + 1) }
        >
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
