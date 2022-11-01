import React from 'react';
import PropTypes from 'prop-types';

export default function OrderDetails({ name, cost }) {
  return (
    <div>
      {/* <div data-testid = {`customer_checkout__element-order-table-item-number`}>
            <div data-testid = {`customer_checkout__element-order-table-name`}></div>
            <div </div>
            <div `}></div>
            <div `}></div>
            <div data-testid = {``}></div>
            </div> */}
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
            {3 * cost}
          </td>

          <td data-testid="customer_checkout__element-order-table-remove">
            <button type="button">Remover</button>
          </td>
        </tr>
      </table>
    </div>
  );
}

OrderDetails.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  cost: PropTypes.string,
}.isRequired;
