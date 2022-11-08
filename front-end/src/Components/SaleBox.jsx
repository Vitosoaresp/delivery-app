import React from 'react';
import PropTypes from 'prop-types';

export default function SaleBox(
  {
    id,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
  },
) {
  return (
    <div>
      <div data-testid={ `seller_orders__element-order-id-${id}` }>
        <p>{`Pedido 00${id}`}</p>
      </div>
      <div data-testid={ `seller_orders__element-delivery-status-${id}` }>
        <p>{status}</p>
      </div>
      <div data-testid={ `seller_orders__element-order-date-${id}` }>
        <p>{saleDate}</p>
      </div>
      <div data-testid={ `seller_orders__element-card-price-${id}` }>
        <p>{totalPrice}</p>
      </div>
      <div data-testid={ `seller_orders__element-card-address-${id}` }>
        <p>{`${deliveryAddress}, ${deliveryNumber}`}</p>
      </div>
    </div>
  );
}

SaleBox.propTypes = {
  id: PropTypes.number,
  totalPrice: PropTypes.number,
  deliveryAddress: PropTypes.string,
  deliveryNumber: PropTypes.string,
  saleDate: PropTypes.string,
  status: PropTypes.string,
}.isRequired;
