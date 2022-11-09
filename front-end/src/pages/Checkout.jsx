import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Navbar from '../Components/Navbar';
import OrderDetails from '../Components/OrderDetails';
import { DeliveryContext } from '../context/DeliveryContext';
import createSale from '../services/createSales';
// import createSaleProduct from '../services/CreateSalesProducts';

export default function Checkout() {
  const { cart, sellers } = useContext(DeliveryContext);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [seller, setSeller] = useState(2);
  const history = useHistory();

  const { token } = JSON.parse(localStorage.getItem('user'));

  const totalPrice = cart.reduce((acc, { cost, quantity }) => {
    const price = cost.replace(',', '.');
    return acc + (Number(price) * quantity);
  }, 0);

  const data = {
    deliveryAddress,
    deliveryNumber,
    sellerId: Number(seller),
    totalPrice,
    cart,
  };

  const finishSale = async () => {
    const sale = await createSale(data, token);
    const { data: { id } } = sale;
    history.push(`/customer/orders/${id}`);
  };

  const renderOption = () => {
    const optionSellers = sellers.map((currSellers) => {
      const { id, name } = currSellers;
      return <option key={ id } value={ id }>{ name }</option>;
    });
    return optionSellers;
  };

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
      <select
        data-testid="customer_checkout__select-seller"
        onChange={ ({ target }) => setSeller(target.value) }
        value={ seller }
      >
        { sellers.length > 0 && renderOption() }
      </select>
      <input
        type="text"
        data-testid="customer_checkout__input-address"
        onChange={ ({ target }) => setDeliveryAddress(target.value) }
        value={ deliveryAddress }
      />
      <input
        type="text"
        data-testid="customer_checkout__input-address-number"
        onChange={ ({ target }) => setDeliveryNumber(target.value) }
        value={ deliveryNumber }
      />
      <button
        type="submit"
        data-testid="customer_checkout__button-submit-order"
        onClick={ () => finishSale() }
      >
        Finalizar Pedido
      </button>
    </div>
  );
}
