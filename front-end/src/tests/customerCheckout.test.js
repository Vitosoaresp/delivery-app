import { fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';
import mockProducts from './mocks/productsMocks';
import { createSaleReturnMock } from './mocks/sale';
import { sellers } from './mocks/sellers';
import { userStorageMock } from './mocks/user';

describe('Page customer checkout', () => {
  const ROUTE_CUSTOMER_PRODUCTS = '/customer/products';
  const ROUTE_CUSTOMER_CHECKOUT = '/customer/checkout';

  const TEST_ID_PRODUCTS_BTN_ADD = 'customer_products__button-card-add-item-';

  const TEST_ID_CHECKOUT_P_INDEX = 'customer_checkout__element-order-table-item-number-';
  const TEST_ID_CHECKOUT_TITLE = 'customer_checkout__element-order-table-name-';
  const TEST_ID_CHECKOUT_PRICE = 'customer_checkout__element-order-table-unit-price-';
  const TEST_ID_CHECKOUT_QNT = 'customer_checkout__element-order-table-quantity-';
  const TEST_ID_CHECKOUT_SUBTOTAL = 'customer_checkout__element-order-table-sub-total-';
  const TEST_ID_CHECKOUT_TOTAL = 'customer_checkout__element-order-total-price';
  const TEST_ID_CHECKOUT_BTN_RM = 'customer_checkout__element-order-table-remove-';

  const TEST_ID_CHECKOUT_ADDRESS = 'customer_checkout__input-address';
  const TEST_ID_CHECKOUT_NUMBER = 'customer_checkout__input-address-number';
  const TEST_ID_CHECKOUT_BTN_SUBMIT = 'customer_checkout__button-submit-order';
  const TEST_ID_CHECKOUT_SELECT_SELLER = 'customer_checkout__select-seller';

  beforeEach(() => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: mockProducts,
    }).mockResolvedValueOnce({
      data: sellers,
    });
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(userStorageMock));
  });

  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });

  it('deve ser possivel renderizar a página', () => {
    const { history, getByRole, getByTestId } = renderWithRouter(<App />);
    history.push(ROUTE_CUSTOMER_CHECKOUT);
    const titlePage = getByRole('heading', { name: /Finalizar Pedido/i });
    const inputAddress = getByTestId(TEST_ID_CHECKOUT_ADDRESS);
    const inputNumber = getByTestId(TEST_ID_CHECKOUT_NUMBER);
    const btnSubmit = getByTestId(TEST_ID_CHECKOUT_BTN_SUBMIT);
    const selectSeller = getByTestId(TEST_ID_CHECKOUT_SELECT_SELLER);
    expect(titlePage).toBeInTheDocument();
    expect(inputAddress).toBeInTheDocument();
    expect(inputNumber).toBeInTheDocument();
    expect(btnSubmit).toBeInTheDocument();
    expect(selectSeller).toBeInTheDocument();
  });

  it('deve ser possivel adicionar um produto ao carrinho', async () => {
    const { history, findByTestId } = renderWithRouter(<App />);
    history.push(ROUTE_CUSTOMER_PRODUCTS);
    const btnAdd = await findByTestId(`${TEST_ID_PRODUCTS_BTN_ADD}1`);
    fireEvent.click(btnAdd);
    fireEvent.click(btnAdd);
    history.push(ROUTE_CUSTOMER_CHECKOUT);
    const pTitle = await findByTestId(`${TEST_ID_CHECKOUT_TITLE}0`);
    const pIndex = await findByTestId(`${TEST_ID_CHECKOUT_P_INDEX}0`);
    const pPrice = await findByTestId(`${TEST_ID_CHECKOUT_PRICE}0`);
    const pQnt = await findByTestId(`${TEST_ID_CHECKOUT_QNT}0`);
    const pSubtotal = await findByTestId(`${TEST_ID_CHECKOUT_SUBTOTAL}0`);
    const pTotal = await findByTestId(`${TEST_ID_CHECKOUT_TOTAL}`);
    const pRemove = await findByTestId(`${TEST_ID_CHECKOUT_BTN_RM}0`);
    expect(pTitle).toHaveTextContent(mockProducts[0].name);
    expect(pIndex).toHaveTextContent('1');
    expect(pPrice).toHaveTextContent(mockProducts[0].price.replace('.', ','));
    expect(pQnt).toHaveTextContent('2');
    expect(pSubtotal).toHaveTextContent('4,40');
    expect(pTotal).toHaveTextContent('4,40');
    expect(pRemove).toBeInTheDocument();
  });

  it('deve ser possivel remover um produto do carrinho', async () => {
    const { history, findByTestId, getByRole } = renderWithRouter(<App />);
    history.push(ROUTE_CUSTOMER_PRODUCTS);
    const btnAdd = await findByTestId(`${TEST_ID_PRODUCTS_BTN_ADD}1`);
    fireEvent.click(btnAdd);
    history.push(ROUTE_CUSTOMER_CHECKOUT);
    const btnRm = getByRole('button', { name: 'Remover' });
    expect(btnRm).toBeInTheDocument();
    const pTitle = await findByTestId(`${TEST_ID_CHECKOUT_TITLE}0`);
    expect(pTitle).toBeInTheDocument();
    fireEvent.click(btnRm);
    expect(pTitle).not.toBeInTheDocument();
  });

  it('Deve ser possivel finalizar o pedido', async () => {
    jest.spyOn(axios, 'post').mockResolvedValueOnce({
      data: createSaleReturnMock,
    });
    const { history, findByTestId, getByTestId } = renderWithRouter(<App />);
    history.push(ROUTE_CUSTOMER_PRODUCTS);
    const btnAdd = await findByTestId(`${TEST_ID_PRODUCTS_BTN_ADD}1`);
    fireEvent.click(btnAdd);
    history.push(ROUTE_CUSTOMER_CHECKOUT);

    const inputAddress = getByTestId(TEST_ID_CHECKOUT_ADDRESS);
    fireEvent.change(inputAddress, { target: { value: 'Rua do Teste' } });

    const inputNumber = getByTestId(TEST_ID_CHECKOUT_NUMBER);
    fireEvent.change(inputNumber, { target: { value: '123' } });

    const sellerSelect = getByTestId(TEST_ID_CHECKOUT_SELECT_SELLER);
    fireEvent.change(sellerSelect, { target: { value: '1' } });

    const btnSubmit = getByTestId(TEST_ID_CHECKOUT_BTN_SUBMIT);
    fireEvent.click(btnSubmit);
    await waitFor(() => expect(history.location.pathname)
      .toBe(`/customer/orders/${createSaleReturnMock.id}`));
  });
});
