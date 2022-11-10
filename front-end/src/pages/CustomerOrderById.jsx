import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { fetchCustomerOrdersById } from '../services/fetchCustomerOrders';
import updateStatusOrder from '../services/APIupdateStatusOrder';

export default function CustomerOrderById() {
  const { id } = useParams();
  const [orderData, setOrderData] = useState();
  const [newStatus, setNewStatus] = useState();

  const PAD_START = 3;
  const date = new Date(orderData?.saleDate).toLocaleDateString('pt-BR');

  const userData = localStorage.getItem('user');

  useEffect(() => {
    const userParse = JSON.parse(userData);
    const getOrder = async () => {
      if (userParse.token) {
        const order = await fetchCustomerOrdersById(id, userParse.token);
        setOrderData(order);
      }
    };
    getOrder();
  }, [userData, id, newStatus]);

  async function updateStatusDelivered() {
    const { status } = orderData;
    if (status === 'Em Trânsito') {
      await updateStatusOrder(id, 'Entregue');
      setNewStatus('Entregue');
    }
  }

  return (
    <>
      <Navbar />
      Detalhe do Pedido
      <div>
        <p
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          {`Pedido ${String(id).padStart(PAD_START, '0')}`}
        </p>
        <span>
          P. vend:
        </span>
        <span
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          {orderData && orderData.sellers.name}
        </span>
        <p
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          {orderData && date}
        </p>
        <p
          data-testid={
            `customer_order_details__element-order-details-label-delivery-status-${id}`
          }
        >
          {orderData && orderData.status}
        </p>
        <button
          type="button"
          disabled={ !!(orderData && orderData.status !== 'Em Trânsito') }
          data-testid="customer_order_details__button-delivery-check"
          onClick={ () => updateStatusDelivered() }
        >
          MARCAR COMO ENTREGE
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {orderData !== undefined && orderData.sales.map((product, i) => (
            <tr key={ product.id }>
              <td
                data-testid={
                  `customer_order_details__element-order-table-item-number-${i}`
                }
              >
                {i + 1}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-name-${i}`
                }
              >
                {product.name}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-quantity-${i}`
                }
              >
                {product.SaleProduct.quantity}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-unit-price-${i}`
                }
              >
                {Number(product.price).toFixed(2).replace('.', ',')}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-sub-total-${i}`
                }
              >
                {(product.price * product.SaleProduct.quantity)
                  .toFixed(2).replace('.', ',')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Total: R$
        <span
          data-testid="customer_order_details__element-order-total-price"
        >
          {orderData && Number(orderData.totalPrice).toFixed(2).replace('.', ',')}
        </span>
      </p>
    </>
  );
}
// coments
