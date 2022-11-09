import { screen, waitFor } from '@testing-library/react';
// import axios from 'axios';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';
// import { sellers } from './mocks/sellers';
import { contextMock, userStorageMock } from './mocks/user';

describe('Page customer products test', () => {
  // beforeEach(async () => {
  //   jest.spyOn(axios, 'get')
  //     .mockImplementation((url) => {
  //       switch (url) {
  //       case 'http://localhost:3001/users/sellers':
  //         return Promise.resolve({ data: sellers });
  //       case 'http://localhost:3001/product':
  //         return Promise.resolve({ data: productsMocks });
  //       default:
  //         console.log(url);
  //         return Promise.resolve();
  //       }
  //     });
  // });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('deve ser possivel renderizar a navBar e o botão do carrinho', async () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(userStorageMock));
    const { history } = renderWithRouter(<App />, contextMock);
    history.push('/customer/products');
    expect(history.location.pathname).toBe('/customer/products');
    await waitFor(() => {
      expect(screen.getByText(/Produtos/i)).toBeInTheDocument();
      expect(screen.getByText(/Meus pedidos/i)).toBeInTheDocument();
      expect(screen.getByText(userStorageMock.name)).toBeInTheDocument();
      expect(
        screen.getByTestId('customer_products__element-navbar-link-logout'),
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      const buttonCart = screen.getByRole('button', { name: 'Ver Carrinho R$ 0,00' });
      expect(buttonCart).toBeInTheDocument();
      expect(buttonCart).toHaveAttribute('disabled');
    });
  });
});
