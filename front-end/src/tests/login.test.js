import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';
import mockProducts from './mocks/productsMocks';
import { sellers } from './mocks/sellers';
import {
  allUsers,
  emailFailMock, emailMock, passwordFailMock, passwordMock,
  userStorageMock,
} from './mocks/user';

describe('Page login test', () => {
  beforeEach(() => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: mockProducts,
    }).mockResolvedValueOnce({
      data: sellers,
    }).mockResolvedValueOnce({
      data: allUsers,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should be redirected to "/login" when entering "/"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    expect(history.location.pathname).toBe('/login');
  });

  it('should be possible to find the login fields', async () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByLabelText('Login');
    const passwordInput = screen.getByLabelText('Senha');
    const buttonSubmit = screen.getByRole('button', { name: 'Login' });
    const buttonRegister = screen.getByRole('button', { name: 'Ainda não tenho conta' });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();
    expect(buttonSubmit).toBeDisabled();
    expect(buttonRegister).toBeInTheDocument();
  });

  it('should be possible to interact with the inputs', async () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByLabelText('Login');
    const passwordInput = screen.getByLabelText('Senha');
    fireEvent.input(emailInput, { target: { value: emailMock } });
    fireEvent.input(passwordInput, { target: { value: passwordMock } });
    expect(emailInput.value).toBe(emailMock);
    expect(passwordInput.value).toBe(passwordMock);
  });

  it(
    'if the login button is disabled after filling in the fields with incorrect email',
    async () => {
      renderWithRouter(<App />);
      const emailInput = screen.getByLabelText('Login');
      const passwordInput = screen.getByLabelText('Senha');
      const buttonSubmit = screen.getByRole('button', { name: 'Login' });
      fireEvent.input(emailInput, { target: { value: emailFailMock } });
      fireEvent.input(passwordInput, { target: { value: passwordMock } });
      expect(buttonSubmit).toBeDisabled();
    },
  );

  it(
    'if the login button is disabled after filling in the fields with incorrect password',
    async () => {
      renderWithRouter(<App />);
      const emailInput = screen.getByLabelText('Login');
      const passwordInput = screen.getByLabelText('Senha');
      const buttonSubmit = screen.getByRole('button', { name: 'Login' });
      fireEvent.input(emailInput, { target: { value: emailMock } });
      fireEvent.input(passwordInput, { target: { value: passwordFailMock } });
      expect(buttonSubmit).toBeDisabled();
    },
  );

  it('deve redirecionar para a pág de cliente ao fazer login', async () => {
    jest.spyOn(axios, 'post').mockResolvedValueOnce({
      data: userStorageMock,
    });
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByLabelText('Login');
    const passwordInput = screen.getByLabelText('Senha');
    const buttonSubmit = screen.getByRole('button', { name: 'Login' });
    fireEvent.input(emailInput, { target: { value: emailMock } });
    fireEvent.input(passwordInput, { target: { value: passwordMock } });
    fireEvent.click(buttonSubmit);
    await waitFor(() => expect(history.location.pathname).toBe('/customer/products'));
    const userData = localStorage.getItem('user');
    expect(userData).toBe(JSON
      .stringify({
        id: userStorageMock.userId,
        email: userStorageMock.email,
        name: userStorageMock.name,
        role: userStorageMock.role,
        token: userStorageMock.token,
      }));
  });

  it('não deve redirecionar ao passar um login inválido', async () => {
    axios.post.mockRejectedValueOnce({ message: 'User already registered' });
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByLabelText('Login');
    const passwordInput = screen.getByLabelText('Senha');
    const buttonSubmit = screen.getByRole('button', { name: 'Login' });
    fireEvent.input(emailInput, { target: { value: emailMock } });
    fireEvent.input(passwordInput, { target: { value: 'passwordFail' } });
    fireEvent.click(buttonSubmit);
    const mensageInvalid = await screen
      .findByTestId('common_login__element-invalid-email');
    expect(history.location.pathname).toBe('/login');
    expect(mensageInvalid).toBeInTheDocument();
  });

  it(
    'if when clicking on I don\'t have an account yet and redirect /register',
    () => {
      const { history } = renderWithRouter(<App />);
      const buttonRegister = screen
        .getByRole('button', { name: 'Ainda não tenho conta' });
      fireEvent.click(buttonRegister);
      expect(history.location.pathname).toBe('/register');
    },
  );

  it(
    'if you have a user as admin in localStorage, should be redirected to /admin/manage',
    async () => {
      Storage.prototype.getItem = jest
        .fn(() => JSON.stringify({ role: 'administrator' }));
      const { history } = renderWithRouter(<App />);
      waitFor(() => expect(history.location.pathname).toBe('/admin/manage'));
    },
  );

  it(
    'should be redirected to /seller/orders case you have a user seller in localStorage',
    async () => {
      Storage.prototype.getItem = jest
        .fn(() => JSON.stringify({ role: 'seller', id: 2 }));
      const { history } = renderWithRouter(<App />);
      waitFor(() => expect(history.location.pathname).toBe('/seller/orders'));
    },
  );

  it(
    'if you have a user as client in Storage, should be redirected to /customer/orders',
    async () => {
      Storage.prototype.getItem = jest
        .fn(() => JSON.stringify({ role: 'customer' }));
      const { history } = renderWithRouter(<App />);
      waitFor(() => expect(history.location.pathname).toBe('/customer/orders'));
    },
  );
});
