import axios from 'axios';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';
import mockProducts from './mocks/productsMocks';
import { salesMock } from './mocks/sale';
import { sellers } from './mocks/sellers';
import { userStorageMock } from './mocks/user';

describe('Page customer order by id', () => {
  const TEST_ID_BASE = 'customer_order_details__element-order-details';
  const TEST_ID_ORDER_ID_PED = `${TEST_ID_BASE}-label-order-id`;
  const TEST_ID_ORDER_ID_VENDEDOR = `${TEST_ID_BASE}-label-seller-name`;
  const TEST_ID_ORDER_ID_DATA = `${TEST_ID_BASE}-label-order-date`;
  const TEST_ID_ORDER_ID_STATUS = `${TEST_ID_BASE}-label-delivery-status-1`;
  const TEST_ID_ORDER_ID_BTN_CHECK = 'customer_order_details__button-delivery-check';

  const TEST_ID_ORDER_ID_TB_NAME = 'customer_order_details__element-order-table-name';
  const TEST_ID_ORDER_ID_TB_QNT = 'customer_order_details__element-order-table-quantity';
  const TEST_ID_ORDER_TB_U_P = 'customer_order_details__element-order-table-unit-price';
  const TEST_ID_ORDER_TB_S_T = 'customer_order_details__element-order-table-sub-total';
  const TEST_ID_ORDER_ID_TOTAL = 'customer_order_details__element-order-total-price';

  beforeEach(() => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: mockProducts,
    }).mockResolvedValueOnce({
      data: sellers,
    }).mockResolvedValueOnce({
      data: salesMock[0],
    });
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(userStorageMock));
  });

  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });

  it('deve ser possivel vê os detalhes de um pedido', async () => {
    const { history, findByTestId, findAllByTestId } = renderWithRouter(<App />);
    history.push(`/customer/orders/${salesMock[0].id}`);
    const pedNumber = await findByTestId(TEST_ID_ORDER_ID_PED);
    const sellerName = await findByTestId(TEST_ID_ORDER_ID_VENDEDOR);
    const pedDate = await findByTestId(TEST_ID_ORDER_ID_DATA);
    const pedStatus = await findByTestId(TEST_ID_ORDER_ID_STATUS);
    const pedBtnCheck = await findByTestId(TEST_ID_ORDER_ID_BTN_CHECK);
    const productName = await findAllByTestId(`${TEST_ID_ORDER_ID_TB_NAME}-0`);
    const productQnt = await findAllByTestId(`${TEST_ID_ORDER_ID_TB_QNT}-0`);
    const productUnitPrice = await findAllByTestId(`${TEST_ID_ORDER_TB_U_P}-0`);
    const productSubTotal = await findAllByTestId(`${TEST_ID_ORDER_TB_S_T}-0`);
    const pedTotal = await findByTestId(TEST_ID_ORDER_ID_TOTAL);
    expect(pedNumber).toHaveTextContent('Pedido 001');
    expect(sellerName).toHaveTextContent(salesMock[0].sellers.name);
    expect(pedDate).toHaveTextContent(salesMock[0].saleDate.toLocaleDateString('pt-BR'));
    expect(pedStatus).toHaveTextContent(salesMock[0].status);
    expect(pedBtnCheck).toHaveTextContent('MARCAR COMO ENTREGUE');
    expect(pedBtnCheck).toBeDisabled();
    salesMock[0].sales.forEach((product, index) => {
      expect(productName[index]).toHaveTextContent(product.name);
      expect(productQnt[index]).toHaveTextContent(product.SaleProduct.quantity);
      expect(productUnitPrice[index])
        .toHaveTextContent(`${Number(product.price).toFixed(2).replace('.', ',')}`);
      expect(productSubTotal[index])
        .toHaveTextContent(`${(
          (product.price * product.SaleProduct.quantity)
            .toFixed(2).replace('.', ','))}`);
    });
    expect(pedTotal)
      .toHaveTextContent(`${Number(salesMock[0].totalPrice)
        .toFixed(2).replace('.', ',')}`);
  });
});
