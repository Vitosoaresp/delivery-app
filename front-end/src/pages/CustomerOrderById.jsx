import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { DeliveryContext } from '../context/DeliveryContext';
import { fetchCustomerOrdersById } from '../services/fetchCustomerOrders';

export default function CustomerOrderById() {
  const { id } = useParams();
  const { token, sellers } = useContext(DeliveryContext);
  const [orderData, setOrderData] = useState(null);

  const PAD_START = 3;

  useEffect(() => {
    const getOrder = async () => {
      const order = await fetchCustomerOrdersById(id, token);
      console.log(order);
      const seller = sellers.find((sell) => sell.id === order.sellerId);
      setOrderData({ ...order, sellerName: seller.name });
    };
    getOrder();
  }, [token]);

  return (
    <>
      <Navbar />
      <h1>Detalhe do Pedido</h1>
      {orderData !== null && (
        <div>
          <p
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            {orderData && `Pedido ${String(orderData.id).padStart(PAD_START, '0')}`}
          </p>
          <span>
            P. vend:
          </span>
          <span
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            {orderData.sellerName}
          </span>
          <p
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            {new Date(orderData.saleDate).toLocaleDateString()}
          </p>
          <p
            data-testid="
            customer_order_details__element-order-details-label-delivery-status"
          >
            {orderData.status}
          </p>
          <p
            data-testid="customer_order_details__button-delivery-check"
          >
            MARCAR COMO ENTREGE
          </p>
        </div>
      )}
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
          {orderData !== null && orderData.sales.map((product, i) => (
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
                {product.price}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-sub-total-${i}`
                }
              >
                {product.price * product.SaleProduct.quantity}
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
          {orderData && orderData.totalPrice}
        </span>
      </p>
    </>
  );
}
