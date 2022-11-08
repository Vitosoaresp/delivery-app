import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Components/Navbar';
import { DeliveryContext } from '../context/DeliveryContext';
import { fetchCustomerOrders } from '../services/fetchCustomerOrders';

export default function Orders() {
  const { token } = useContext(DeliveryContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const ordersData = await fetchCustomerOrders(token);
      setOrders(ordersData);
    };
    getOrders();
  }, []);

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
                {new Date(order.saleDate).toLocaleDateString()}
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
