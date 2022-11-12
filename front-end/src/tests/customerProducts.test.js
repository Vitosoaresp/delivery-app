import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';
import mockProducts from './mocks/productsMocks';
import { sellers } from './mocks/sellers';
import { userStorageMock } from './mocks/user';

describe('Page customer products test', () => {
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

  const ROUTE_CUSTOMER = '/customer/products';

  const DATA_TESTID_BTN_RM = 'customer_products__button-card-rm-item-';
  const DATA_TESTID_BTN_ADD = 'customer_products__button-card-add-item-';
  const DATA_TESTID_QNT = 'customer_products__input-card-quantity-';
  const DATA_TESTID_NAVBAR_LOGOUT = 'customer_products__element-navbar-link-logout';

  it('deve ser possivel renderizar a navBar e o botão do carrinho', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(ROUTE_CUSTOMER);
    expect(history.location.pathname).toBe(ROUTE_CUSTOMER);
    expect(screen.getByText(/Produtos/i)).toBeInTheDocument();
    expect(screen.getByText(/Meus pedidos/i)).toBeInTheDocument();
    expect(screen.getByText(userStorageMock.name)).toBeInTheDocument();
    expect(screen.getByTestId(DATA_TESTID_NAVBAR_LOGOUT)).toBeInTheDocument();
    const buttonCart = screen.getByRole('button', { name: 'Ver Carrinho R$ 0,00' });
    expect(buttonCart).toBeInTheDocument();
    expect(buttonCart).toHaveAttribute('disabled');
  });

  it('deve ser possivel renderizar os produtos', async () => {
    const { history, findAllByTestId } = renderWithRouter(<App />);
    history.push(ROUTE_CUSTOMER);
    const pTitle = await findAllByTestId(/customer_products__element-card-title-/i);
    const pPrice = await findAllByTestId(/customer_products__element-card-price-/i);
    const pImage = await findAllByTestId(/customer_products__img-card-bg-image-/i);
    const pBtnAdd = await findAllByTestId(/customer_products__button-card-add-item-/i);
    const pBtnRm = await findAllByTestId(/customer_products__button-card-rm-item-/i);
    const pQnt = await findAllByTestId(/customer_products__input-card-quantity-/i);
    expect(pTitle.length).toBe(mockProducts.length);
    mockProducts.forEach((product, index) => {
      expect(pTitle[index]).toHaveTextContent(product.name);
      expect(pPrice[index]).toHaveTextContent(product.price.replace('.', ','));
      expect(pImage[index]).toHaveAttribute('src', product.urlImage);
      expect(pBtnAdd[index]).toBeInTheDocument();
      expect(pBtnRm[index]).toBeInTheDocument();
      expect(pQnt[index]).toHaveValue(0);
    });
  });

  it('deve ser possivel alterar a quantidade do produto', async () => {
    const { history, findByTestId } = renderWithRouter(<App />);
    history.push(ROUTE_CUSTOMER);
    const pQnt = await findByTestId(`${DATA_TESTID_QNT}1`);
    expect(pQnt).toHaveValue(0);
    const btnAdd = await findByTestId(`${DATA_TESTID_BTN_ADD}1`);
    const btnRm = await findByTestId(`${DATA_TESTID_BTN_RM}1`);
    fireEvent.click(btnAdd);
    fireEvent.click(btnAdd);
    expect(pQnt).toHaveValue(2);
    fireEvent.click(btnRm);
    expect(pQnt).toHaveValue(1);
    fireEvent.change(pQnt, { target: { value: 2 } });
    expect(pQnt).toHaveValue(2);
  });

  it('deve ser possivel ver a soma do carrinho pela nav bar', async () => {
    const { history, findByTestId, getByRole } = renderWithRouter(<App />);
    history.push(ROUTE_CUSTOMER);
    const buttonCartBefore = getByRole('button', { name: 'Ver Carrinho R$ 0,00' });
    expect(buttonCartBefore).toBeInTheDocument();
    const btnAdd = await findByTestId(`${DATA_TESTID_BTN_ADD}1`);
    fireEvent.click(btnAdd);
    fireEvent.click(btnAdd);
    const buttonCart = screen.getByRole('button', { name: 'Ver Carrinho R$ 4,40' });
    expect(buttonCart).toBeInTheDocument();
  });

  it('deve ser redirecionado para a tela de checkout', async () => {
    const { history, findByTestId } = renderWithRouter(<App />);
    history.push(ROUTE_CUSTOMER);
    const btnAdd = await findByTestId(`${DATA_TESTID_BTN_ADD}1`);
    fireEvent.click(btnAdd);
    fireEvent.click(btnAdd);
    const buttonCart = screen.getByRole('button', { name: 'Ver Carrinho R$ 4,40' });
    expect(buttonCart).toBeInTheDocument();
    fireEvent.click(buttonCart);
    expect(history.location.pathname).toBe('/customer/checkout');
  });
});
