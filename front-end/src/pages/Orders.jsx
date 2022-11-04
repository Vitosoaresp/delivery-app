import { useContext } from 'react';
import NavBar from '../Components/Navbar';
import { DeliveryContext } from '../context/DeliveryContext';

export default function Orders() {
  const { orders } = useContext(DeliveryContext);

  const PAD_START = 3;

  return (
    <>
      <NavBar />
      <main>
        {orders.map((order) => (
          <div key={ order.id }>
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
          </div>
        ))}
      </main>
    </>
  );
}
