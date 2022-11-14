import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import Navbar from '../Components/Navbar';
import SellerNavbar from '../Components/SellerNavbar';
import getSaleById from '../services/APIsellerOrderDetails';
import formatDate from '../helpers/formatDate';

import updateStatusOrder from '../services/APIupdateStatusOrder';

export default function SellerOrderDetails() {
  const [orderCard, setOrderCard] = useState([]);
  const [newStatus, setNewStatus] = useState('Pendente');
  const params = useParams();

  // test ID grande demais
  const statsTestID = 'seller_order_details__element-order-details-label-delivery-status';
  const orderDateTestID = 'seller_order_details__element-order-details-label-order-date';
  const orderIdTestID = 'seller_order_details__element-order-details-label-order-id';

  useEffect(() => {
    async function fetchOrderCard() {
      console.log('entre no USEEFFECT');
      const result = await getSaleById(params.id);
      setOrderCard(result);
    }
    fetchOrderCard();
  }, [params.id, newStatus]);

  // função para atualizar o status do pedido
  // __________________________________________

  const TRANSITO = 'Em Trânsito';
  const PREPARO = 'Preparando';
  const PENDENTE = 'Pendente';
  console.log('orderCard - pendente', orderCard);
  console.log('status novo', newStatus);

  async function updateStatusPrepare() {
    if (newStatus === PENDENTE) {
      await updateStatusOrder(params.id, PREPARO);
      setNewStatus(PREPARO);
    }
    if (newStatus === PREPARO) {
      await updateStatusOrder(params.id, TRANSITO);
      setNewStatus(TRANSITO);
    }
  }

  return (
    <div>

      <SellerNavbar />
      <h1>Detalhe do Pedido</h1>
      {orderCard.length !== 0 && (
        <table
          key={ orderCard.id }
        >
          <thead>
            <tr>
              <td
                data-testid={ orderIdTestID }
              >
                {`Pedido ${orderCard.id}`}

              </td>
              <td
                data-testid={ orderDateTestID }
              >
                {formatDate(orderCard.saleDate)}
              </td>
              <td>
                <span
                  data-testid={ statsTestID }
                >
                  {`${orderCard.status}`}
                </span>

              </td>
              <td>
                <button
                  disabled={ orderCard.status !== 'Pendente' }
                  type="button"
                  data-testid="seller_order_details__button-preparing-check"
                  onClick={ () => updateStatusPrepare() }
                >
                  PREPARAR PEDIDO
                </button>
                <button
                  disabled={ orderCard.status !== 'Preparando' }
                  type="button"
                  data-testid="seller_order_details__button-dispatch-check"
                  onClick={ () => updateStatusPrepare() }
                >
                  SAIU PARA ENTREGA
                </button>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Item</td>
              <td>Descrição</td>
              <td>Quantidade</td>
              <td>Valor Unitário</td>
              <td>Valor Sub-total</td>
            </tr>
          </tbody>
        </table>
      )}
      {/* {console.log('orderCard.sales ---->>>>', orderCard.sales[0].name)} */}
      {orderCard.sales && orderCard.sales.map((order, index) => (
        <table
          className="table"
          key={ order.id }
        >
          <tbody>
            <tr>
              {console.log('ENTREI NO MAP')}
              <td>
                <span
                  data-testid={ `seller_order_details__element-order-table-
                item-number-${index + 1}` }
                >
                  {`${index + 1}`}

                </span>
                <span
                  data-testid={ `seller_order_details__element-order-table-
                name-${index + 1}` }
                >
                  {order.name}

                </span>
              </td>
              <td
                data-testid={ `seller_order_details__element-order-table-
              quantity-${index + 1}` }
              >
                {order?.SaleProduct.quantity}

              </td>
              <td
                data-testid={ `seller_order_details__element-order-table-
              unit-price-${index + 1}` }
              >
                {order.price.replace('.', ',')}

              </td>
              <td
                data-testid={ `seller_order_details__element-order-table-
              sub-total-${index + 1}` }
              >
                {(order.price * order.SaleProduct.quantity).toFixed(2)
                //   .toString()
                  .replace('.', ',')}

              </td>
            </tr>
          </tbody>
        </table>
      ))}
      {orderCard.length !== 0 && (
        <h3 data-testid="seller_order_details__element-order-total-price">
          {`${orderCard.totalPrice.replace('.', ',')}`}
        </h3>)}
    </div>
  );
}
