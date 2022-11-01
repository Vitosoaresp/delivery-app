import React from 'react';
import PropTypes from 'prop-types';

export default function OrderDetails({ name, cost }) {
  return (
    <div>
      {/* <div data-testid = {`customer_checkout__element-order-table-item-number`}>
            <div data-testid = {`customer_checkout__element-order-table-name`}></div>
            <div data-testid = {`customer_checkout__element-order-table-quantity`}></div>
            <div data-testid = {`customer_checkout__element-order-table-unit-price`}></div>
            <div data-testid = {`customer_checkout__element-order-table-sub-total`}></div>
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
          <td>1</td>
          <td data-testid= {`customer_checkout__element-order-table-name`}>{ name }</td>
          <td>3</td>
          <td>{cost}</td>
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

// 23: customer_checkout__element-order-table-name-<index>
// - 24: customer_checkout__element-order-table-quantity-<index>
// - 25: customer_checkout__element-order-table-unit-price-<index>
// - 26: customer_checkout__element-order-table-sub-total-<index>
// - 27: customer_checkout__element-order-table-remove-<index>
