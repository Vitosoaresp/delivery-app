import React, { useContext } from 'react';

import Navbar from '../Components/Navbar';
import OrderDetails from '../Components/OrderDetails';
import { DeliveryContext } from '../context/DeliveryContext';

export default function Checkout() {
  const { cart } = useContext(DeliveryContext);

  const totalPrice = cart.reduce((acc, { cost, quantity }) => {
    const price = cost.replace(',', '.');
    return acc + (Number(price) * quantity);
  }, 0);

  return (
    <div>
      <Navbar />
      <h1>Finalizar Pedido</h1>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitario</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product, index) => (
            <OrderDetails
              id={ product.id }
              key={ product.id }
              cost={ product.cost }
              name={ product.name }
              quantity={ product.quantity }
              index={ index }
            />
          ))}
        </tbody>
      </table>
      <p data-testid="customer_checkout__element-order-total-price">
        {totalPrice.toFixed(2).replace('.', ',')}
      </p>
      <select data-testid="customer_checkout__select-seller">
        <option value="ss">ss</option>
        <option value="adasd">adasd</option>
        <option value="sdads">sdads</option>
      </select>
      <input type="text" data-testid="customer_checkout__input-address" />
      <input type="text" data-testid="customer_checkout__input-address-number" />
      <button type="submit" data-testid="customer_checkout__button-submit-order">
        Finalizar Pedido
      </button>
    </div>
  );
}
