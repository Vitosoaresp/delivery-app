import React from 'react';
import PropTypes from 'prop-types';

export default function OrderDetails({ name, cost }) {
  const number = 3;
  return (
    <div>
      <table>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitario</th>
          <th>Sub-total</th>
          <th>Remover Item</th>
        </tr>
        <tr>
          <td data-testid={ `customer_checkout__element-order-table-item-number${id}` }>
            1
          </td>

          <td data-testid={ `customer_checkout__element-order-table-name${id}` }>
            { name }

          </td>

          <td data-testid={ `customer_checkout__element-order-table-quantity${id}` }>
            3
          </td>

          <td data-testid={ `customer_checkout__element-order-table-unit-price${id}` }>
            {cost}
          </td>

          <td data-testid={ `customer_checkout__element-order-table-sub-total-${id}` }>
            {number * cost}
          </td>

          <td data-testid="customer_checkout__element-order-table-remove">
            <button type="button">Remover</button>
          </td>
        </tr>
      </table>
      <p data-testid="customer_checkout__element-order-total-price">
        { `Total: R$ ${subtotal.reduce((acc, curr) => acc + curr.subtotal, 0)} `}

      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  cost: PropTypes.string,
}.isRequired;
