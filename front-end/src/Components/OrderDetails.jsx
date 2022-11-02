import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DeliveryContext } from '../context/DeliveryContext';

export default function OrderDetails({ id, index, quantity, name, cost }) {
  const { cart, setCart } = useContext(DeliveryContext);

  const removeProduct = (_id) => {
    const products = cart.filter((product) => product.id !== _id);
    setCart(products);
    localStorage.setItem('carrinho', JSON.stringify(products));
  };

  return (
    <tr>
      <td data-testid={ `customer_checkout__element-order-table-item-number-${index}` }>
        {index + 1}
      </td>

      <td data-testid={ `customer_checkout__element-order-table-name-${index}` }>
        {name}

      </td>

      <td data-testid={ `customer_checkout__element-order-table-quantity-${index}` }>
        {quantity}
      </td>

      <td data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }>
        {cost.replace('.', ',')}
      </td>

      <td data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }>
        {Number(quantity * cost).toFixed(2).replace('.', ',')}
      </td>

      <td data-testid={ `customer_checkout__element-order-table-remove-${index}` }>
        <button onClick={ () => removeProduct(id) } type="button">Remover</button>
      </td>
    </tr>
  );
}

OrderDetails.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  cost: PropTypes.string,
  quantity: PropTypes.string,
  index: PropTypes.number,
}.isRequired;
