import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { DeliveryContext } from '../context/DeliveryContext';

export default function CardProduct({ id, cost, name, thumb }) {
  const [quantity, setQuantity] = useState(0);

  const { cart, setCart } = useContext(DeliveryContext);

  useEffect(() => {
    if (quantity > 0) {
      const product = { id, cost, name, thumb, quantity };
      const existProduct = cart.find((item) => item.id === Number(id));
      if (!existProduct) {
        const newCart = [...cart, product];
        setCart(newCart);
      } else {
        const newCart = cart.map((item) => {
          if (item.id === Number(id)) {
            return { ...item, quantity };
          }
          return item;
        });
        setCart(newCart);
      }
    } else {
      const cartArray = cart.filter((item) => {
        if (quantity === 0) {
          return item.id !== id;
        }
        return item;
      });
      setCart(cartArray);
    }
    localStorage.setItem('carrinho', JSON.stringify(cart));
  }, [quantity]);

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
          width="100px"
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
          onChange={ ({ target: { value } }) => setQuantity(Number(value)) }
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
