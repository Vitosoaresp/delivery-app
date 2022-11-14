import { fireEvent } from '@testing-library/react';
import axios from 'axios';
import App from '../App';
import formatDate from '../helpers/formatDate';
import renderWithRouter from './helper/renderWithRouter';
import mockProducts from './mocks/productsMocks';
import { mockSalesOrders } from './mocks/sale';
import { sellers } from './mocks/sellers';

describe('Page Seller Order & seller order details', () => {
  const ROUTE_SELLER_ORDERS = '/seller/orders';
  const BASE_TEST_ID = 'seller_order_details__';
  const TESTID_ORDER_ID = `${BASE_TEST_ID}element-order-details-label-order-id`;
  const TESTID_ORDER_DT = `${BASE_TEST_ID}element-order-details-label-order-date`;
  const TESTID_ORDER_ST = `${BASE_TEST_ID}element-order-details-label-delivery-status`;
  const TESTID_BTN_PREPARE = `${BASE_TEST_ID}button-preparing-check`;
  const TESTID_BTN_DISPATCH = `${BASE_TEST_ID}button-dispatch-check`;

  beforeEach(() => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: mockProducts,
    }).mockResolvedValueOnce({
      data: sellers,
    }).mockResolvedValueOnce({
      data: mockSalesOrders,
    })
      .mockResolvedValue({
        data: mockSalesOrders[0],
      });
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({
      userId: 2,
      email: 'FakeSeller@gmail.com',
      name: 'Ronaldinho gaucho',
      role: 'seller',
      token: 'F@k#T0k3n_@ji12123mkdaad13',
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });

  it('Ao clicar em uma venda, deve ir para a tela de detalhes', async () => {
    const { history, findByTestId } = renderWithRouter(<App />);
    history.push(ROUTE_SELLER_ORDERS);
    const saleBtn = await findByTestId(`seller_orders__element-order-id-${1}`);
    fireEvent.click(saleBtn);
    expect(history.location.pathname).toBe(`${ROUTE_SELLER_ORDERS}/${1}`);
  });

  it('deve mostrar os detalhes da venda', async () => {
    const { history, getByRole, findByTestId } = renderWithRouter(<App />);
    history.push('/seller/orders/1');
    expect(getByRole('heading', { level: 1, name: 'Detalhe do Pedido' }))
      .toBeInTheDocument();
    const orderId = await findByTestId(TESTID_ORDER_ID);
    const orderDate = await findByTestId(TESTID_ORDER_DT);
    const orderStatus = await findByTestId(TESTID_ORDER_ST);
    const btnPrepare = await findByTestId(TESTID_BTN_PREPARE);
    const btnDispatch = await findByTestId(TESTID_BTN_DISPATCH);
    expect(orderId).toHaveTextContent('Pedido 1');
    const dateExpec = formatDate(mockSalesOrders[0].saleDate);
    expect(orderDate).toHaveTextContent(dateExpec);
    expect(orderStatus).toHaveTextContent('Pendente');
    expect(btnPrepare).toBeInTheDocument();
    expect(btnDispatch).toBeInTheDocument();
  });

  // it('deve ser possível alterar o status para SAIU PARA ENTREGA', async () => {
  //   const { history, getByRole, findByTestId } = renderWithRouter(<App />);
  //   history.push('/seller/orders/1');
  //   expect(getByRole('heading', { level: 1, name: 'Detalhe do Pedido' }))
  //     .toBeInTheDocument();
  //   const orderId = await findByTestId(TESTID_ORDER_ID);
  //   const orderDate = await findByTestId(TESTID_ORDER_DT);
  //   const orderStatus = await findByTestId(TESTID_ORDER_ST);
  //   const btnPrepare = await findByTestId(TESTID_BTN_PREPARE);
  //   const btnDispatch = await findByTestId(TESTID_BTN_DISPATCH);
  //   expect(orderId).toHaveTextContent('Pedido 1');
  //   const dateExpec = formatDate(mockSalesOrders[0].saleDate);
  //   expect(orderDate).toHaveTextContent(dateExpec);
  //   expect(orderStatus).toHaveTextContent('Pendente');
  //   expect(btnPrepare).toBeInTheDocument();
  //   expect(btnDispatch).toBeInTheDocument();
  // });
});
