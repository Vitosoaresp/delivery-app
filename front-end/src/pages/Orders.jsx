import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Components/Navbar';
// import { DeliveryContext } from '../context/DeliveryContext';
import { fetchCustomerOrders } from '../services/fetchCustomerOrders';

export default function Orders() {
  const getTokenFromLocalStorage = localStorage.getItem('user');

  const [orders, setOrders] = useState([]);
  console.log('orders', orders);

  useEffect(() => {
    const { token } = JSON.parse(getTokenFromLocalStorage);
    console.log('entrei no useEffect');
    const getOrders = async () => {
      console.log('sem token');
      if (token) {
        const ordersData = await fetchCustomerOrders(token);
        console.log('COM token');
        setOrders(ordersData);
      }
    };
    getOrders();
  }, [getTokenFromLocalStorage]);

  const PAD_START = 3;

  return (
    <>
      <NavBar />
      <main>
        {orders.map((order) => (
          <Link key={ order.id } to={ `/customer/orders/${order.id}` }>
            <div
              data-testid={ `customer_orders__element-order-id-${order.id}` }
            >
              {`Pedido ${String(order.id).padStart(PAD_START, '0')}`}
            </div>
            <div data-testid={ `customer_orders__element-delivery-status-${order.id}` }>
              {order.status}
            </div>
            <div>
              <div data-testid={ `customer_orders__element-order-date-${order.id}` }>
                {moment(order.saleDate).locale('pt-br').format('DD/MM/YYYY')}
              </div>
              <div data-testid={ `customer_orders__element-card-price-${order.id}` }>
                {`R$ ${order.totalPrice.replace('.', ',')}`}
              </div>
            </div>
          </Link>
        ))}
      </main>
    </>
  );
}
